//Selecionar os elementos
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Selecionar as classes
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Variaveis
let LIST,id;

// obter item do armazenamento local(localstorage) 
let data = localStorage.getItem("TODO");

//verifique se os dados(data) não estão vazios
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; //set the id to the last
    loadList(LIST); //load the list to the user interface
}else{
    //se os dados não estiverem vazios
    LIST= [];
    id = 0;
}

//carregar itens para a interface do usuário
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name,item.id, item.done, item.trash);
    })
}

// limpar o localStorage local
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})


//Para mostrar a Data de hoje
const options = {weekday: "long", month: "short", day: "numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("pt-PT", options);

//Colocar uma função do que fazer
function addToDo(toDo, id, done, trash){

    if(trash){ return;}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : ""

    const item = `<li class="item">
                    
    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
    <p class="text ${LINE}">${toDo}</p>
    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>

  </li>`;
    const position = "beforeend";             

    list.insertAdjacentHTML(position, item);
}

//Colocar um item a lista qdo o usuario clicar no enter
document.addEventListener("keyup",function(event){
   if(event.keyCode === "Enter"){
        const toDo = input.value;

        //Se o input não estiver vazio
        if(toDo){
            addToDo(toDo);

            LIST.push({
                name: toDo,
                id : id,
                done : false,
                trash : false
            });

            //adicionar item ao armazenamento local (este código deve ser adicionado onde a matriz da lista é atualizada)
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;

        }
        input.value = "";
    }
})

//Função completar to do para quando o usuario clicar o botão de fechamento ou feito a ação
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;   
}

//Função remover o to do para quando o usuario clicar o botão de fechamento ou feito a ação
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//Direcionar os itens criados dinamicamente

list.addEventListener("click", function(event){
    const element = event.target; //retorna o elemento cliclado dentro da lista
    const elementJob = element.attributes.Job.value; // Completa ou deleta

    if(elementJob === "complete"){
        completeToDo(element);
    }else if(elementJob === "delete"){
        removeToDo(element);
    }

    //adicionar item ao armazenamento local (este código deve ser adicionado onde a matriz da lista é atualizada)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});
