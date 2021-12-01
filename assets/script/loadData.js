export function loadInitialData(){
    let SN = confirm("Deseja carregar os dados iniciais?")
    if (!SN){
        return
    } 

    // Load initial data
    let method = "GET"
    let url = "https://private-21e8de-rafaellucio.apiary-mock.com/users"
    let xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    xhr.send();

    let dadosClientes = null
    xhr.onload = function() {
        if (xhr.status != 200) { // If not 200, not OK, alert an error mensage.
            alert ("Erro ao carregar informações");
        } else { // If 200, ok, load initial data.
            dadosClientes = JSON.parse(this.responseText);
        }
        dadosClientes.forEach(item => pushDataLocalstorage(item));
    }; 
}

export function pushDataLocalstorage(item){
    let key = localStorage.length
    localStorage.setItem(key, JSON.stringify(item))
    preventDefault()
}