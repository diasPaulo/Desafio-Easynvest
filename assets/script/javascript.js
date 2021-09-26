function handler() {
    if(this.status == 200) {
        let dadosClientes = JSON.parse(this.responseText);
        let listaClientes = [];
        let listaLocalstorage = localStorage.getItem(0);

        if (listaLocalstorage != []){
            listaLocalstorage = JSON.parse(listaLocalstorage);
            listaClientes = listaClientes.concat(listaLocalstorage);
        }
        for (const i in dadosClientes){
            listaClientes.push(dadosClientes[i]);
        }
        localStorage.setItem(0,JSON.stringify(listaClientes));

        alert("Os dados iniciais foram carregados com sucesso!");

        location.reload();        
    } else {
        alert ("Erro ao carregar informações");
    }
}

/* Carrega dados iniciais de clientes */
function loadDataClient(){
    let SN = confirm("Deseja carregar os dados iniciais?");
    if (SN){
        let client = new XMLHttpRequest();
        client.onload = handler;
        client.open("GET", "https://private-21e8de-rafaellucio.apiary-mock.com/users");
        client.send();
    }    
}

function cadastrar(){
    let loading = document.getElementById("loading");
    let txtCadastro = document.getElementById("txt-cadastrar");

    loading.style.display = "block";
    txtCadastro.style.display = "none";

    setTimeout(() => {      
        loading.style.display = "none";
        txtCadastro.style.display = "block"; }
        , 1000);

    let nome = document.getElementById("nome");
    let cpf = document.getElementById("cpf");
    let phone = document.getElementById("telefone");
    let email = document.getElementById("email");

    let cadastro = {};

    cadastro.name = nome.value;
    cadastro.cpf = cpf.value;
    cadastro.phone = phone.value;
    cadastro.email = email.value;

    let listaClientes = localStorage.getItem(0);

    if (listaClientes != []){
        listaClientes = JSON.parse(listaClientes);
    }else{
        listaClientes = [];
    }
    listaClientes.push(cadastro);

    localStorage.setItem(0,JSON.stringify(listaClientes)); 
}

function mostrarCadastro(){
    let listaClientes = localStorage.getItem(0);

    if (listaClientes != []){
        listaClientes = JSON.parse(listaClientes);
    }

    if (listaClientes.length > 0){
        document.getElementById("btn-excluir").disabled = false;
        
        document.getElementById("mostraCadastro").innerHTML += `
        <div class="row">
            <p></p>
            <p class="campoNome">Nome</p>
            <p class="campoEmail">E-mail</p>
            <p class="campoCpf">CPF</p>
            <p class="campoPhone">Telefone</p>
        </div>`;

        for (let i = 0; i < listaClientes.length; i++){
            let cadastro = listaClientes[i];
            document.getElementById("mostraCadastro").innerHTML += `
            <div class="row">
                <p class="excluir" onclick="excluirCadastro(` + i + `);"><img src="./images/delete.png" title="Deletar"></p>
                <p class="campoNome">` + cadastro.name + `</p>
                <p class="campoEmail">` + cadastro.email + `</p>
                <p class="campoCpf">` + cadastro.cpf + `</p>
                <p class="campoPhone">` + cadastro.phone + `</p>
            </div>`;
        }
    }else{
        document.getElementById("mostraCadastro").innerHTML += `<p> Não há dados cadastrados</p>`;
        document.getElementById("btn-excluir").disabled = true;
    }
}

function excluirCadastro(item){
    let listaClientes = localStorage.getItem(0);
    listaClientes = JSON.parse(listaClientes);

    listaClientes.splice(item, 1);
    localStorage.setItem(0,JSON.stringify(listaClientes));

    location.reload();
}

function excluirTodoCadastro(){
    localStorage.setItem(0,[]);
    location.reload();
}

function checarDados(){
    let nome = document.getElementById("nome");
    let cpf = document.getElementById("cpf");
    let phone = document.getElementById("telefone");
    let email = document.getElementById("email");

    if ((!nome.validity.valid) || (!cpf.validity.valid) || (!phone.validity.valid) || (!email.validity.valid)){
        document.getElementById("btn-cadastrar").disabled = true;
    }else{
        document.getElementById("btn-cadastrar").disabled = false;
    }
}