import "./loadData.js"

function loadInitialData(){
    let YN = confirm("Deseja carregar os dados iniciais?")
    if (!YN){
        return
    } 

    // Load initial data
    let method = "GET"
    let url = "https://private-21e8de-rafaellucio.apiary-mock.com/users"
    let xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    xhr.send();

    let dataClients = null
    xhr.onload = function() {
        if (xhr.status != 200) { // If not 200, not OK, alert an error mensage.
            alert ("Erro ao carregar informações");
        } else { // If 200, ok, load initial data.
            dataClients = JSON.parse(this.responseText);
        }
        dataClients.forEach(item => pushDataLocalstorage(item));
        location.reload()
    }; 
}

function pushDataLocalstorage(item){
    let key = localStorage.length
    localStorage.setItem(key, JSON.stringify(item))
}

function pullDataLocalstorage(key){
    localStorage.removeItem(key)
    location.reload()
}

function cleanAllLocalstorage(){
    localStorage.clear()
    location.reload()
}

function showData(){
    let showReg = document.getElementById("showReg")
    let len = localStorage.length

    if (len > 0){
        btnClean.disabled = false

        let paragraph = document.createElement("p")
        let nameField = document.createElement("p")
        let emailField = document.createElement("p")
        let cpfField = document.createElement("p")
        let phoneField = document.createElement("p")

        nameField.setAttribute("class", "nameField")
        emailField.setAttribute("class", "emailField")
        cpfField.setAttribute("class", "cpfField")
        phoneField.setAttribute("class", "phoneField")

        paragraph.innerHTML = ""
        nameField.innerHTML = "Nome"
        emailField.innerHTML = "E-mail"
        cpfField.innerHTML = "CPF"
        phoneField.innerHTML = "Telefone"

        let row = document.createElement("div")
        row.setAttribute("class", "row")

        row.appendChild(paragraph)
        row.appendChild(nameField)
        row.appendChild(emailField)
        row.appendChild(cpfField)
        row.appendChild(phoneField)

        showReg.appendChild(row)
    }else{
        btnClean.disabled = true
        let paragraph = document.createElement("p")
        paragraph.innerHTML = "Não há dados cadastrados"
        showReg.appendChild(paragraph)
    }

    for (let i = 0; i < len; i++){
        let key = localStorage.key(i)
        let reg = JSON.parse(localStorage.getItem(key))

        let del = document.createElement("p")
        let nameField = document.createElement("p")
        let emailField = document.createElement("p")
        let cpfField = document.createElement("p")
        let phoneField = document.createElement("p")

        let imgDel = document.createElement("img")

        let row = document.createElement("div")

        del.setAttribute("class", "del")
        nameField.setAttribute("class", "nameField")
        emailField.setAttribute("class", "emailField")
        cpfField.setAttribute("class", "cpfField")
        phoneField.setAttribute("class", "phoneField")

        imgDel.setAttribute("title", "Deletar")
        imgDel.setAttribute("src", "./images/delete.png")

        del.appendChild(imgDel)
        nameField.innerHTML = reg.name
        emailField.innerHTML = reg.email
        cpfField.innerHTML = reg.cpf
        phoneField.innerHTML = reg.phone

        row.setAttribute("class", "row")

        row.appendChild(del)
        row.appendChild(nameField)
        row.appendChild(emailField)
        row.appendChild(cpfField)
        row.appendChild(phoneField)

        showReg.appendChild(row)

        del.addEventListener("click", () => pullDataLocalstorage(key))
    }
}

var btnClean = document.getElementById("btn-clean")
var btnInitialData = document.getElementById("btn-initialData")

btnClean.addEventListener("click", cleanAllLocalstorage)
btnInitialData.addEventListener("click", loadInitialData)

showData()