//import * as fs from 'fs';
function addCourse(){
    let rowLength = document.getElementById("CTable").rows.length;
    let targetRow = document.getElementById("CTable").insertRow(rowLength);
    let ID = document.getElementById("ID").value;
    let Name = document.getElementById("Name").value;
    if(ID==""||Name==""){
        return;
    }else{
        /*
        let courseData ={};
        courseData.table=[];
        let courseInfo={
            ID : ID,
            Name : Name
        };
        courseData.table.push(courseInfo);
        const fs = require('fs');
        fs.appendFile('./CourseList.json', JSON.stringify(courseData), function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
        */
        targetRow.insertCell(0).innerHTML = ID;
        targetRow.insertCell(1).innerHTML = Name;
    }
}
const btn = document.getElementById("Add");
btn.addEventListener('click', addCourse);