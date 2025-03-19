const d = document;
userInput = d.querySelector("#usuarioForm");
passInput =d.querySelector("#contraForm");
btnLogin =d.querySelector(".btnLogin");

btnLogin.addEventListener("click", ()=>{
    let dataForm = getData();
    if (dataForm) sendData(dataForm);  
 });

let getData = () =>{
    let user;
    if(userInput.value && passInput.value){
        user = {
            usuario: userInput.value,
            contrasena: passInput.value
        }
        userInput.value ="";
        passInput.value="";
    }else{
        alert("Tienes que diligenciar todos los datos")
    }
    console.log(user);
    return user;
};

let sendData = async (data) =>{
    let url = "http://localhost/backend-apiCrud/login";
    try {
        let respuesta = await fetch(url,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        });
        if (respuesta.status === 401){
            alert("El usuario o la contraseña es incorrecto")
        }else{
            let userLogin = await respuesta.json();
            alert(`Bienvenido: ${userLogin.nombre}`);
            localStorage.setItem("userLogin", JSON.stringify(userLogin));
            location.href ="../index.html";
        };
    } catch (error) {
        console.log(error);
    }
};