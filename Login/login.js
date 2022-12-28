function myFunction(){
    let user = document.getElementById("uname").value;
    let password = document.getElementById("psw").value;
    //alert(user);

    if(user == "David"&&password=="xqq")
    {
        alert("Login Successfully");
        setTimeout(() =>{window. location.replace ("../Users/David.html");});
    }
    else if(user!=""&&password!=""){
        alert("Incorrect username or password");
    }else{
        return;
    }
}
