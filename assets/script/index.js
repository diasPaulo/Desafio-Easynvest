import {loadInitialData, pushDataLocalstorage} from "./loadData.js"

function registration(){
    let time = 3000
    let loading = document.getElementById("loading");
    let txtCadastro = document.getElementById("txt-cadastrar");

    loading.style.display = "block";
    txtCadastro.style.display = "none";

    setTimeout(() => {      
            loading.style.display = "none";
            txtCadastro.style.display = "block"; 
            alert("aqui")
            location.reload()
        }
        , time);

    let cadastro = {};
    cadastro.name = nome.value;
    cadastro.cpf = cpf.value;
    cadastro.phone = phone.value;
    cadastro.email = email.value;

    pushDataLocalstorage(cadastro)
    event.preventDefault()
}

var checkData = () => btnCadastrar.disabled = ((!nome.validity.valid) || (!cpf.validity.valid) || (!phone.validity.valid) || (!email.validity.valid)) ? true : false

var nome = document.getElementById("nome");
var cpf = document.getElementById("cpf");
var phone = document.getElementById("telefone");
var email = document.getElementById("email");
var btnCadastrar = document.getElementById("btn-cadastrar")
var btnInitialData = document.getElementById("btn-initialData")

nome.addEventListener("change", checkData)
cpf.addEventListener("change", checkData)
phone.addEventListener("change", checkData)
email.addEventListener("change", checkData)
btnCadastrar.addEventListener("click", registration)
btnInitialData.addEventListener("click", loadInitialData)