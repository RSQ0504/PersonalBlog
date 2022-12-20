let maze = document.querySelector(".maze");
let ctx = maze.getContext("2d");

let current;

export class Maze{
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
}

class Cell{
    constructor(rowNumber,colNumber,parentGrid,parentSize){
        this.rowNumber  =rowNumber;
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
}