const sandSize = 3;
const width = 700;
const height = 700;
let isDrawing = false;
let lastTime = 0;
const interval = 50;


function createCanvas(width , height){
    const canvas = document.createElement('canvas');
    canvas.id = 'myCanvas';
    canvas.width  = width;
    canvas.height = height;
    return canvas;
}



function create2dArray(cols  , rows){
    const grid = [];
    for (let i = 0; i < rows ; i++){
        grid[i] = [];
        for (let j = 0; j < cols; j++){
            grid[i][j] = 0;
        }
    }
    return grid;
}


function fillCanvas(canvas , grid){
    var ctx = canvas.getContext('2d');
    for(let i = 0; i < grid.length; i++){
        for (let j = 0; j < grid[0].length; j++){
            if (grid[i][j] == 0){
                ctx.fillRect(i*sandSize , j*sandSize , sandSize , sandSize);
            }
        }
    }
}


function draw(event , grid){
    if (isDrawing){
        let x = event.offsetX;
        let y = event.offsetY;
        let gridX = Math.floor(x / sandSize);
        let gridY = Math.floor(y / sandSize);
        grid[gridY][gridX] = 1;
    }
}



function drawWithArrayOnes(grid , canvas){
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    for(let i = 0; i < grid.length; i++){
        for (let j = 0; j < grid[0].length; j++){
            if (grid[i][j] == 1){

                ctx.fillStyle = 'brown';
                ctx.fillRect(j*sandSize , i*sandSize , sandSize , sandSize);
            } 
        }
    }
}


function simulateGravity(grid) {
    for (let i = grid.length - 2; i >= 0; i--) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 1) {
                if (grid[i + 1][j] === 0) {
                    grid[i][j] = 0;
                    grid[i + 1][j] = 1;
                }
                else if (j > 0 && grid[i + 1][j - 1] === 0) {
                    grid[i][j] = 0;
                    grid[i + 1][j - 1] = 1;
                }
                else if (j < grid[0].length - 1 && grid[i + 1][j + 1] === 0) {
                    grid[i][j] = 0;
                    grid[i + 1][j + 1] = 1;
                }
            }
        }
    }
}


function startSimulation(grid, canvas, time = 0) {
    if (time - lastTime >= interval) {
        simulateGravity(grid);
        lastTime = time;
    }
    drawWithArrayOnes(grid, canvas);
    requestAnimationFrame((t) => startSimulation(grid, canvas, t));
}



function main(){
    const canvas = createCanvas(width , height);
    document.body.appendChild(canvas);
    const grid = create2dArray((width/sandSize) , (height/sandSize));
    fillCanvas(canvas , grid);
    
    canvas.addEventListener("mousemove", (event) => draw(event, grid));

    canvas.addEventListener("mousedown" , (e) => {
        isDrawing = true;
    })

    canvas.addEventListener("mouseup" , (e) => {
        isDrawing = false;
    })

    startSimulation(grid , canvas);
}

main();