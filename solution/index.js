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
const title = document.getElementById("page-title")

const liElements = document.getElementsByTagName("li")


const searchBar = document.getElementById("search")
searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase()
    for (let i of liElements) {
        if (!i.textContent.toLowerCase().includes(searchString)) {
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
document.body.style.backgroundImage = localStorage.getItem("background")

const getLocalStorageTasks = JSON.parse(localStorage.getItem("tasks"))

let element = undefined
let focos = undefined
function handleMouseEvents(event) {
    if (event.target.classList.contains("task")){
        const ele = event.target
        const eleText = event.target.textContent
        element = ele
        focos = eleText
        document.addEventListener("keydown", (e) => {
            if(e.altKey && e.key === "1") {
                if (focos !== undefined) {
                    tasks["todo"].push(focos)
                    tasks[findparents(element)].splice(findparents(element).indexOf(focos),1)
                    ulToDo.insertBefore(element,ulToDo.firstChild)
                    localStorage.setItem("tasks",JSON.stringify(tasks))
                    focos = undefined
                }
            }
            if (e.altKey && e.key === "2") {
                if (focos !== undefined) {
                    tasks["in-progress"].push(focos)
                    tasks[findparents(element)].splice(findparents(element).indexOf(focos),1)
                    ulInProgress.insertBefore(element,ulInProgress.firstChild)
                    localStorage.setItem("tasks",JSON.stringify(tasks))
                    focos = undefined
                }
            }
            if (e.altKey && e.key === "3") {
                if (focos !== undefined) {
                    tasks["done"].push(focos)
                    tasks[findparents(element)].splice(findparents(element).indexOf(focos),1)
                    ulDone.insertBefore(element,ulDone.firstChild)
                    localStorage.setItem("tasks",JSON.stringify(tasks))
                    focos = undefined
                }
            }
        })
    }
}


const body = document.getElementById("body")
document.addEventListener('mouseover', handleMouseEvents)
document.querySelectorAll(".add-task").forEach((btn) => btn.addEventListener("click", chack))
document.addEventListener("dblclick", listenForDoubleClick)


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


function listenForDoubleClick(element) {
    if (element.target.classList.contains("task")){
        element.target.contentEditable = true;
        element.target.onblur = function(){
            updateUl(element.target)
            localStorage.setItem("tasks", JSON.stringify(tasks))
            element.target.contentEditable = false;
        }
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


function findparents(ele) {
    const parent =  ele.parentElement.classList[0]
    if (parent === "done-task") {
        return "done"
    }
    else if (parent === "in-progress-tasks"){
        return "in-progress"
    }
    else if (parent === "to-do-tasks") {
        return "todo"
    }
}

document.getElementById("background").addEventListener("click", changeBackground)
function changeBackground() {
    const url = document.getElementById("background-url")
    document.body.style.backgroundImage = `url(${url.value})`
    localStorage.setItem("background", `url(${url.value})`)
}
document.getElementById("background-default").addEventListener("click",defaultBackground)
function defaultBackground() {
    document.body.style.backgroundImage = `url("markus-winkler-3Rn2EjoAC1g-unsplash.jpg")`
    localStorage.setItem("background", `url("markus-winkler-3Rn2EjoAC1g-unsplash.jpg")`)
}

document.getElementById("clear-tasks").addEventListener("click", (e)=> {
    for (let type in tasks) {
        tasks[type] = []
    }
    document.querySelectorAll("li").forEach((li) => li.remove())
    localStorage.clear()
})


// async function getData() {
//     const response = await fetch("https://json-bins.herokuapp.com/bin/614aece24021ac0e6c080c6f",{
//         method: "GET"
//     });
//     if (!response.ok) {
//         alert("error")
//     }
//     const data = await response.json()
//     const tasksData = data.tasks   
// }

// async function savaData() {
//     const response = await fetch("https://json-bins.herokuapp.com/bin/614aece24021ac0e6c080c6f", {
//         method: "PUT",

//     })
// }


// const b = document.createElement("button")
// b.textContent = "press"
// document.body.append(b)
// b.addEventListener("click", getData)


