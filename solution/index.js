const submitToDo = document.getElementById("submit-add-to-do")
const submitInProgress = document.getElementById("submit-add-in-progress")
const submitDone = document.getElementById("submit-add-done")

const inputToDo = document.getElementById("add-to-do-task")
const inputInProgress = document.getElementById("add-in-progress-task")
const inputDone = document.getElementById("add-done-task")

const ulToDo  = document.getElementsByClassName("to-do-tasks")[0]
const ulInProgress  = document.getElementsByClassName("in-progress-tasks")[0]
const ulDone  = document.getElementsByClassName("done-tasks")[0]
const liElements = document.querySelectorAll(".task")

const tasks = {
    "todo": [],
    "in-progress": [],
    "done": []
}

const getLocalStorageTasks = JSON.parse(localStorage.getItem("tasks"))

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

function addStorageToDom(z,ul,key) {
    tasks[key].push(z)
    const list = document.createElement("li")
    list.textContent = z
    list.classList.add("task")
    ul.insertBefore(list,ul.firstChild)
}



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
}


