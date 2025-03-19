const d = document;
let tablePro = d.querySelector("#table-pro > tbody");
let searchInput = d.querySelector("#search-input");
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

searchInput.addEventListener("keyup", ()=>{
    console.log(searchInput.value);
});

document.addEventListener("DOMContentLoaded", ()=>{
   getTableData(); 
   getUser();
});

let getTableData = async ()=>{
    let url = "http://localhost/backend-apiCrud/productos";
    try {
        let respuesta = await fetch(url,{
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            },
        });
        if (respuesta.status === 204){
            console.log("No hay datos en la base de datos");
        }else{
            let tableData = await respuesta.json();
            console.log(tableData);

            localStorage.setItem("datosTabla", JSON.stringify(tableData));

            tableData.forEach((dato, i)  => {
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td> ${i} </td>
                    <td> ${dato.nombre} </td>
                    <td> ${dato.descripcion} </td>
                    <td> ${dato.precio} </td>
                    <td> ${dato.stock} </td>
                    <td> <img src="${dato.imagen}" width="80"> </td>
                    <td>
                        <button id="btn-edit" onclick="editDataTable(${i})" type="button" class="btn btn-warning">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                            </svg>
                        </button> - 
                        ${ userName.textContent == "vendedor" ? "": 
                        `<button id="btn-delete" onclick="deleteDataTable(${i})" type="button" class="btn btn-danger">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                            </svg>
                        </button>`};
                    </td>
                `;
                tablePro.appendChild(row);
            });
        };
    } catch (error) {
        console.log(error);
    }
};

let editDataTable = ( pos ) =>{
    let products = [];
    let productsSave = JSON.parse(localStorage.getItem("datosTabla"));
    if (productsSave != null){
        products = productsSave;
    }
    let singleProduct = products[pos];
    localStorage.setItem("productEdit", JSON.stringify(singleProduct));
    localStorage.removeItem("datosTabla");
    location.href = "../crear-pro.html"
};

let deleteDataTable = (pos) =>{
    let products = [];
    let productsSave = JSON.parse(localStorage.getItem("datosTabla"));
    if (productsSave != null){
        products = productsSave;
    }
    let singleProduct = products[pos];
    let idProduct ={
        id : singleProduct.id
    }
    let confirmar = confirm(`¿Deseas eliminar ${singleProduct.nombre}?`);
    if (confirmar){
        sendDeleteProduct( idProduct );
    }
};

let sendDeleteProduct = async (id)=>{
    let url = "http://localhost/backend-apiCrud/productos";
    try {
        let respuesta = await fetch(url,{
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(id)
        });
        if (respuesta.status === 406){
            alert("El id enviado no fue admitido")
        }else{
            let mensaje = await respuesta.json();
            alert(mensaje.message);
            location.reload();
        };
    } catch (error) {
        console.log(error);
    }
};