function myFunction(){
    let user = document.getElementById("uname").value;
    let password = document.getElementById("psw").value;

    if(user == "David"&&password=="xqq")
    {
        alert("Login Successfully");
        setTimeout(() =>{window. location.replace ("../Users/David.html");});
    }
    else {
        alert("Invalid information");
        return ;
    }
}
