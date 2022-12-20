let maze = document.querySelector(".maze");
let ctx = maze.getContext("2d");

let current;

export default class Maze{
    constructor(size,row,column){
        this.size       = size;
        this.row        = row;
        this.column     = column;
        this.grid       = [];
        this.stack      = [];
    }
    setup(){
        for(let r=0;r<this.row;r++){
            let row = [];
            for(let c=0;c<this.column;c++){
                let cell = new Cell(r,c,this.grid,this.size);
                row.push(cell);
            }
            this.grid.push(row);
        }
        current = this.grid[0][0];
    }

    draw(){
        maze.width=this.size;
        maze.height=this.size;
        maze.style.background="black";
        current.visited=true;

        for(let r=0;r<this.row;r++){
            for(let c=0;c<this.column;c++){
                let grid = this.grid;
                grid[r][c].show(this.size,this.row,this.column);
            }
        }
    }
}

class Cell{
    constructor(rowNumber,colNumber,parentGrid,parentSize){
        this.rowNumber  = rowNumber;
        this.colNumber  = colNumber;
        this.parentGrid = parentGrid;
        this.parentSize = parentSize;
        this.visited    = false;
        this.walls      = {
            topWall     : true,
            rightWall   : true,
            bottomWall  : true,
            leftWall    : true,
        };
    }
    drawTopWall(x,y,size,column,row){
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(x+size/column,y);
        ctx.stroke();
    }
    drawRightWall(x,y,size,column,row){
        ctx.beginPath();
        ctx.moveTo(x+size/column,y);
        ctx.lineTo(x+size/column,y+size/row);
        ctx.stroke();
    }
    drawBottomWall(x,y,size,column,row){
        ctx.beginPath();
        ctx.moveTo(x,y+size/row);
        ctx.lineTo(x+size/column,y+size/row);
        ctx.stroke();
    }
    drawLeftWall(x,y,size,column,row){
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(x,y+size/row);
        ctx.stroke();
    }
    show(size,row,column){
        let x = (this.colNumber*size)/column;
        let y = (this.rowNumber*size)/row;

        ctx.strokeStyle = "white";
        ctx.fillStyle = "blue";
        ctx.lineWidth = 2;

        if(this.walls.topWall) this.drawTopWall(x,y,size,column,row);
        if(this.walls.rightWall) this.drawRightWall(x,y,size,column,row);
        if(this.walls.bottomWall) this.drawBottomWall(x,y,size,column,row);
        if(this.walls.leftWall) this.drawLeftWall(x,y,size,column,row);
        if(this.visited){
            ctx.fillRect(x+1,y+1,size/column-2,size/row-2);
        }
    }
}