function addCourse(){
    let rowLength = document.getElementById("CTable").rows.length;
    let targetRow = document.getElementById("CTable").insertRow(rowLength);
    let ID = document.getElementById("ID").value;
    let Name = document.getElementById("Name").value;
    if(ID==""||Name==""){
        return;
    }else{
        targetRow.insertCell(0).innerHTML = ID;
        targetRow.insertCell(1).innerHTML = Name;
    }
}