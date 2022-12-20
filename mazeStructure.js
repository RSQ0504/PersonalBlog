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
        let next = current.checkNeighbour();
        if(next){
            next.visited = true;
            this.stack.push(current);
            current.highlight(this.column);
            current.removeWall(current,next);
            current=next;
        }else if(this.stack.length>0){
            let cell = this.stack.pop();
            current = cell;
            current.highlight(this.column);
        }
        if(this.stack.length==0){
            return;
        }
        window.requestAnimationFrame(()=>{
            this.draw();
        })
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
    checkNeighbour(){
        let grid = this.parentGrid;
        let row = this.rowNumber;
        let col = this. colNumber;
        let neighbour = [];

        let top = row !== 0 ? grid[row-1][col]:undefined;
        let right = col !== grid.length-1 ? grid[row][col+1]:undefined;
        let bottom = row !== grid.length-1 ? grid[row+1][col]:undefined;
        let left = col !== 0 ? grid[row][col-1]:undefined;

        if(top&& !top.visited) neighbour.push(top);
        if(right&& !right.visited) neighbour.push(right);
        if(left&& !left.visited) neighbour.push(left);
        if(bottom&& !bottom.visited) neighbour.push(bottom);

        if(neighbour.length !=0){
            let random =Math.floor(Math.random()*neighbour.length);
            return neighbour[random];
        }else{
            return undefined;
        }
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
    highlight(column){
        let x = (this.colNumber*this.parentSize)/column+1;
        let y = (this.rowNumber*this.parentGrid)/column+1;
        ctx.fillStyle="purple";
        ctx.fillRect(x,y,this.parentSize/column-3,this.parentSize/column-3);
    }
    removeWall(cell1,cell2){
        let x = cell1.colNumber-cell2.colNumber;
        if (x==1){
            cell1.walls.leftWall=false;
            cell2.walls.rightWall=false;
        }else if(x==-1){
            cell1.walls.rightWall=false;
            cell2.walls.leftWall=false;
        }
        let y = cell1.rowNumber-cell2.rowNumber;
        if (y==1){
            cell1.walls.topWall=false;
            cell2.walls.bottomWall=false;
        }else if(y==-1){
            cell1.walls.bottomWall=false;
            cell2.walls.topWall=false;
        }
    }
    show(size,row,column){
        let x = (this.colNumber*size)/column;
        let y = (this.rowNumber*size)/row;

        ctx.strokeStyle = "white";
        ctx.fillStyle = "black";
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