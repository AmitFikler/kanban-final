const submitToDo = document.getElementById("submit-add-to-do")
const submitInProgress = document.getElementById("submit-add-in-progress")
const submitDone = document.getElementById("submit-add-done")

const inputToDo = document.getElementById("add-to-do-task")
const inputInProgress = document.getElementById("add-in-progress-task")
const inputDone = document.getElementById("add-done-task")

const ulToDo  = document.getElementsByClassName("to-do-tasks")[0]
const ulInProgress  = document.getElementsByClassName("in-progress-tasks")[0]
const ulDone  = document.getElementsByClassName("done-tasks")[0]


document.body.addEventListener("click",chack)
function chack(e) {
    if (e.target.id === "submit-add-to-do"){
        if (inputToDo.value === "") {
            alert("you can not enter empty task")
        } else {
            const list = document.createElement("li")
            list.textContent = inputToDo.value
            list.classList.add("task")
            ulToDo.appendChild(list)
        }
    }
    if (e.target.id === "submit-add-in-progress"){
        if (inputInProgress.value === "") {
            alert("you can not enter empty task")
        } else {
            const list = document.createElement("li")
            list.textContent = inputInProgress.value
            list.classList.add("task")
            ulInProgress.appendChild(list)
        }
    }
    if (e.target.id === "submit-add-done"){
        if (inputDone.value === "") {
            alert("you can not enter empty task")
        } else {
            const list = document.createElement("li")
            list.textContent = inputDone.value
            list.classList.add("task")
            ulDone.appendChild(list)
        }
    }

}


const myLocalStorage = {
    "todo": [],
    "in-progress": [],
    "done": []
}
