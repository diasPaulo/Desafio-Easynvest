function cadastrar(){
    let nome = document.getElementById("nome");
    let cpf = document.getElementById("cpf");
    let phone = document.getElementById("telefone");
    let email = document.getElementById("email");

    let loading = document.getElementById("loading");
    let txtCadastro = document.getElementById("txt-cadastrar");

    let cadastro = {};

    cadastro.name = nome.value;
    cadastro.cpf = cpf.value;
    cadastro.phone = phone.value;
    cadastro.email = email.value;

    localStorage.setItem(localStorage.length,JSON.stringify(cadastro)); 

    loading.style.display = "block";
    txtCadastro.style.display = "none";

    setTimeout(() => {      
        loading.style.display = "none";
        txtCadastro.style.display = "block"; }
        , 1000);

    e.preventDefault(); 
}

function mostrarCadastro(){
    if (localStorage.length > 0){
        document.getElementById("btn-excluir").disabled = false;
        
        document.getElementById("mostraCadastro").innerHTML += `
        <div class="row">
            <p></p>
            <p class="campoNome">Nome</p>
            <p class="campoEmail">E-mail</p>
            <p class="campoCpf">CPF</p>
            <p class="campoPhone">Telefone</p>
        </div>`;

        for(var i in localStorage){
            let cad = localStorage.getItem(i);
            cad = JSON.parse(cad);
            document.getElementById("mostraCadastro").innerHTML += `
            <div class="row">
                <p class="excluir" onclick="excluirCadastro(` + i + `);"><img src="./images/delete.png" title="Deletar"></p>
                <p class="campoNome">` + cad.name + `</p>
                <p class="campoEmail">` + cad.email + `</p>
                <p class="campoCpf">` + cad.cpf + `</p>
                <p class="campoPhone">` + cad.phone + `</p>
            </div>`;
        }
    }else{
        document.getElementById("mostraCadastro").innerHTML += `<p> Não há dados cadastrados</p>`;
        document.getElementById("btn-excluir").disabled = true;
    }
}

function excluirCadastro(item){
    localStorage.removeItem(item);
    location.reload();
}

function excluirTodoCadastro(){
    localStorage.clear();
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