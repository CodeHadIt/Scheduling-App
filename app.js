//selecting each element
const clear = document.querySelector(".clear-btn");
const timeElement = document.getElementById("time")
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//creating classes to be aded to our text.
const CHECK = "fa-circle-check";
const UNCHECKED = "fa-circle";
const LINE_THROUGH = "lineThrough";

let LIST, id;
// local storage

let data = localStorage.getItem("TODO");

if(data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST)
}
else {
    LIST = [];
    id = 0;
}

//loading list to user interface
function loadList(array){
    array.forEach( (item) =>{
        addToDo(item.name, item.id, item.done, item.trash)
    });
}

//event listener for clear btn
clear.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
})

//setting date
const today = new Date();
const options = {weekday: "long", month:"short", day:"numeric", year:"2-digit"};

dateElement.innerHTML = today.toLocaleDateString("en-US", options);
timeElement.innerHTML = `${today.getHours()}:${today.getMinutes()}`;

if(today.getHours() > 17) {
    body = document.body;
    body.style.backgroundColor = "#121629";
}

//to do function
function addToDo(toDo, id, done, trash) {

    if(trash) {
        return}
    const DONE = done ? CHECK : UNCHECKED;
    const LINE = done ? LINE_THROUGH : "";
    const item = `<li class="item">
                    <i class="fa-regular ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa-solid fa-trash de" job="trash" id="${id}"></i>
                </li>
                `;

    const position = "afterbegin";
    list.insertAdjacentHTML(position, item)
}


document.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        const toDo = input.value;
        if(toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id : id,
                done: false,
                trash: false
            })
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
            
        }
        input.value = ""   
    }
}) 

function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECKED);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// removing a to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true
}


list.addEventListener("click", (event) =>{

    const element = event.target;
    const elementJOB = element.attributes.job.value;

    if(elementJOB == "complete") {
        completeToDo(element)
    }
    else if (elementJOB == "trash"){
        removeToDo(element)
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
});


