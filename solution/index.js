const submitToDo = document.getElementById("submit-add-to-do")
const submitInProgress = document.getElementById("submit-add-in-progress")
const submitDone = document.getElementById("submit-add-done")

const inputToDo = document.getElementById("add-to-do-task")
const inputInProgress = document.getElementById("add-in-progress-task")
const inputDone = document.getElementById("add-done-task")

const ulToDo  = document.getElementsByClassName("to-do-tasks")[0]
const ulInProgress  = document.getElementsByClassName("in-progress-tasks")[0]
const ulDone  = document.getElementsByClassName("done-tasks")[0]

const buttonEl = document.getElementsByTagName("button")


const searchBar = document.getElementById("search")
searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value
    for (let i of liElements) {
        if (!i.textContent.includes(searchString)) {
            i.style.display = "none"
        }
        else {
            i.style.display = ""
        }
    }
});

const tasks = {
    "todo": [],
    "in-progress": [],
    "done": []
}

const getLocalStorageTasks = JSON.parse(localStorage.getItem("tasks"))

const liElements = document.getElementsByTagName("li")

function handleClickEvents() {
    for (li of liElements) {
    li.addEventListener("dblclick", listenForDoubleClick)
    }
}

function handleMouseEvents() {
    for (li of liElements) {
        li.addEventListener("mouseover", altPress)
    }
}



for (let key in getLocalStorageTasks) {
    for(let ele of getLocalStorageTasks[key]) {
        if (key === "todo") {
            addStorageToDom(ele,ulToDo,"todo")
        }
        if (key === "in-progress") {
            addStorageToDom(ele,ulInProgress,"in-progress")
        }
        if (key === "done"){
            addStorageToDom(ele, ulDone, "done")
        }
    }
}

function addStorageToDom(task,ul,key) {
    tasks[key].push(task)
    const list = document.createElement("li")
    list.textContent = task
    list.classList.add("task")
    ul.insertBefore(list,ul.firstChild)
}

handleClickEvents()
handleMouseEvents()



document.body.addEventListener("click",chack)
function chack(e) {
    if (e.target.id === "submit-add-to-do"){
        if (!inputToDo.value) {
            alert("you can not enter empty task")
        } else {
            addStorageToDom(inputToDo.value, ulToDo, "todo")
            localStorage.setItem("tasks",JSON.stringify(tasks))
        }
    }
    if (e.target.id === "submit-add-in-progress"){
        if (!inputInProgress.value) {
            alert("you can not enter empty task")
        } else {
            addStorageToDom(inputInProgress.value, ulInProgress, "in-progress")
            localStorage.setItem("tasks",JSON.stringify(tasks))
        }
    }
    if (e.target.id === "submit-add-done"){
        if (!inputDone.value) {
            alert("you can not enter empty task")
        } else {
            addStorageToDom(inputDone.value, ulDone, "done")
            localStorage.setItem("tasks",JSON.stringify(tasks))
        }
    }
    handleMouseEvents()
    handleClickEvents()
}

function altPress(event) {
    console.log(event)

    if (event.altKey===true) {
       console.log(event.target)
    }
}

function listenForDoubleClick(element) {
    element.target.contentEditable = true;
    element.target.onblur = function(){
        updateUl(element.target)
        localStorage.setItem("tasks", JSON.stringify(tasks))
        element.target.contentEditable = false;
    }
}


function updateUl(target) {
    if (target.parentElement.classList[0] === "done-tasks") {
        const x = ulDone.querySelectorAll("li")
        const listOfUlDone = []
        for(let li of x) {
            listOfUlDone.unshift(li.textContent)
        }
        tasks.done = listOfUlDone
    }
    else if ((target.parentElement.classList[0] === "in-progress-tasks")) {
        const x = ulInProgress.querySelectorAll("li")
        const listOfInProgress = []
        for(let li of x) {
            listOfInProgress.unshift(li.textContent)
        }
        tasks["in-progress"] = listOfInProgress
    }
    else if ((target.parentElement.classList[0] === "to-do-tasks")) {
        const x = ulToDo.querySelectorAll("li")
        const listOfToDo = []
        for(let li of x) {
            listOfToDo.unshift(li.textContent)
        }
        tasks["todo"] = listOfToDo
    }
}



