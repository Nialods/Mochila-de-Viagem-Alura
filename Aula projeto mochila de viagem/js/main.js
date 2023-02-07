const formulario = document.querySelector("[data-formulario]");
const lista = document.querySelector("[data-lista = lista]");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach(element => {
    criaElemento(element)
});

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];
    const existe = itens.find(elemento => elemento.nome === nome.value)
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    };
    verificaExiste(existe, itemAtual)
    localStorage.setItem("itens", JSON.stringify(itens));
    nome.value = "";
    quantidade.value = "";
})

function verificaExiste(existe, itemAtual){
    if (existe){
        itemAtual.id = existe.id
        atualizaElemento(itemAtual);
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    }else{
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id + 1 : 0
        criaElemento(itemAtual);
        itens.push(itemAtual);
    }
}

function criaElemento(item){
    const numeroItem = document.createElement('strong');
    const novoItem = document.createElement('li');
    
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id

    novoItem.classList.add("item");
    novoItem.dataset.lista = "item";
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;
    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem);
}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id){
    const botao = document.createElement("button");
    botao.innerText = "X"

    botao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id);
    })
    return botao;
}

function deletaElemento(tag, id){
    tag.remove();
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);
    localStorage.setItem("itens", JSON.stringify(itens));
}
