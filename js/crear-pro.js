const d = document;
let nameInput = d.querySelector("#productos-select");
let priceInput =d.querySelector("#precio-pro");
let stockInput =d.querySelector("#stock-pro");
let descriptionInput = d.querySelector("#des-pro");
let imagen = d.querySelector("#imagen-pro");
let btnCreate = d.querySelector(".btn-create");
let productUpdate;
let userName = d.querySelector("#nombre-usuario");
let btnLogout = d.querySelector("#btnLogout");


let getUser = () =>{
    let user = JSON.parse(localStorage.getItem("userLogin"));
    userName.textContent = user.nombre;
};

btnLogout.addEventListener("click", ()=> {
    localStorage.removeItem("userLogin");
    location.href = "../login.html";
});


btnCreate.addEventListener("click", () =>{
    let dataProduct = getDataProduct();
    sendDataProduct (dataProduct);

});

d.addEventListener("DOMContentLoaded", ()=>{
    getUser();
    productUpdate = JSON.parse(localStorage.getItem("productEdit"));
    if (productUpdate != null){
        updateDataProduct();
    }
});

let getDataProduct = () =>{
    let product;
    if(nameInput.value && priceInput.value && stockInput.value && descriptionInput.value && imagen.src){
        product = {
            nombre: nameInput.value,
            descripcion: descriptionInput.value,
            precio: priceInput.value,
            stock: stockInput.value,
            imagen: imagen.src
        }
        precioInput.value ="";
        descriptionInput.value="";
        stockInput.value="";
        imagen.src ="https://m.media-amazon.com/images/I/61XV8PihCwL._SY250_.jpg";
        console.log(product);
    }else{
        alert("Tienes que diligenciar todos los datos")
    }
    return product;
};

let sendDataProduct = async (data) =>{
    let url = "http://localhost/backend-apiCrud/productos";
    try {
        let respuesta = await fetch(url,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        });
        if (respuesta.status === 406){
            alert("Los datos enviados no son admitidos")
        }else{
            let mensaje = await respuesta.json();
            alert(mensaje.message);
        };
    } catch (error) {
        console.log(error);
    }
};

let updateDataProduct = ()=>{
    nameInput.value = productUpdate.nombre;
    precioInput.value = productUpdate.precio;
    stockInput.value = productUpdate.stock;
    descriptionInput.value = productUpdate.descripcion;
    imagen.src = productUpdate.imagen;
    let product;

    let btnEdit = d.querySelector(".btn-update");
    btnCreate.classList.toggle("d-none");
    btnEdit.classList.toggle("d-none");

    btnEdit.addEventListener("click", ()=>{
        product = {
            id: productUpdate.id,
            nombre: nameInput.value,
            descripcion: descriptionInput.value,
            precio: priceInput.value,
            stock: stockInput.value,
            imagen: imagen.src
        }
        localStorage.removeItem("productEdit");
        sendUpdateProduct(product);

    });
};

let sendUpdateProduct = async ( pro ) =>{
    let url = "http://localhost/backend-apiCrud/productos";
    try {
        let respuesta = await fetch(url,{
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(pro)
        });
        if (respuesta.status === 406){
            alert("Los datos enviados no son admitidos")
        }else{
            let mensaje = await respuesta.json();
            alert(mensaje.message);
            location.href = "../listado-pro.html"
        };
    } catch (error) {
        console.log(error);
    }
};