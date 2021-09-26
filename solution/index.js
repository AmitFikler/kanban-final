/*/\/\/\/\/\ Setting Variables /\/\/\/\/\*/

const submitToDo = document.getElementById("submit-add-to-do");
const submitInProgress = document.getElementById("submit-add-in-progress");
const submitDone = document.getElementById("submit-add-done");

const inputToDo = document.getElementById("add-to-do-task");
const inputInProgress = document.getElementById("add-in-progress-task");
const inputDone = document.getElementById("add-done-task");

const ulToDo  = document.getElementsByClassName("to-do-tasks")[0];
const ulInProgress  = document.getElementsByClassName("in-progress-tasks")[0];
const ulDone  = document.getElementsByClassName("done-tasks")[0];

const buttonEl = document.getElementsByTagName("button");
const searchBar = document.getElementById("search")

const liElements = document.getElementsByTagName("li");

const loadBtn = document.getElementById("load-btn");
const saveBtn = document.getElementById("save-btn");

let elementFocus = undefined;
let elementTextFocus = undefined;

let getLocalStorageTasks = JSON.parse(localStorage.getItem("tasks")); // get tasks obj from local storage
document.body.style.backgroundImage = localStorage.getItem("background"); // save user style
updatedDom() // Updates the DOM according to what is in the local storage


/*/\/\/\/\/\ EVENT LISTENERS /\/\/\/\/\*/

searchBar.addEventListener('keyup', (e) => { // A search bar that updates the DOM
    const searchString = e.target.value.toLowerCase()
    for (let i of liElements) {
        if (!i.textContent.toLowerCase().includes(searchString)) {
            i.style.display = "none";
            localStorage.setItem("tasks",JSON.stringify(watchTheDom()));
        }
        else {
            i.style.display = "";
            localStorage.setItem("tasks",JSON.stringify(watchTheDom()));
        }
    }
});

document.getElementById("background").addEventListener("click", changeBackground); // The user selects the background he wants

document.getElementById("background-default").addEventListener("click",defaultBackground);// Returns to the default background

document.getElementById("clear-tasks").addEventListener("click", (e)=> { // clear the tasks and the local storage
    document.querySelectorAll("li").forEach((li) => li.remove())
    localStorage.setItem("tasks",JSON.stringify(watchTheDom()))
})

document.addEventListener('mouseover', handleMouseEvents);

document.querySelectorAll(".add-task").forEach((btn) => btn.addEventListener("click",  handleAddClickEvents)); 

document.addEventListener("dblclick", listenForDoubleClick);

loadBtn.addEventListener("click", getData);

saveBtn.addEventListener("click", saveData);




/*       A function that "views" the site and returns an object of what it sees      */

function watchTheDom() {   // A function that supposedly views the site and returns as an object the way the lists are arranged
    const todoArr = []
    const inProgressArr = []
    const doneArr = []
    for(let ul of document.querySelectorAll("ul")){ 
        if (ul.classList.contains("to-do-tasks")) {
            for (let child of ul.children) {
                if(child.style.display !== "none") todoArr.unshift(child.textContent)
            }
        }
        else if (ul.classList.contains("in-progress-tasks")) {
            for (let child of ul.children) {
                if(child.style.display !== "none") inProgressArr.unshift(child.textContent)
            }
        }
        else if (ul.classList.contains("done-tasks")) {
            for (let child of ul.children) {
                if(child.style.display !== "none") doneArr.unshift(child.textContent)
            }
        }
    }
    return {"todo":todoArr, "in-progress":inProgressArr, "done":doneArr}
}


/*/\/\/\/\/\ EVENT LISTENERS FUNCTIONS /\/\/\/\/\*/

function handleMouseEvents(event) { // Activated when the mouse is on an element
    if (event.target.classList.contains("task")){
        elementFocus = event.target;
        elementTextFocus = event.target.textContent;
        document.addEventListener("keydown", (e) => {
            if(e.altKey && e.key === "1") {
                if (elementTextFocus !== undefined) {
                    ulToDo.insertBefore(elementFocus,ulToDo.firstChild); // Moves the element with the focus to the TODO ul by pressing ALT + 1
                    localStorage.setItem("tasks",JSON.stringify(watchTheDom()));
                    getLocalStorageTasks = JSON.parse(localStorage.getItem("tasks"));
                    elementTextFocus = undefined; 
                }
            }
            if (e.altKey && e.key === "2") {
                if (elementTextFocus !== undefined) {
                    ulInProgress.insertBefore(elementFocus,ulInProgress.firstChild); // Moves the element with the focus to the In-Progress ul by pressing ALT + 2
                    localStorage.setItem("tasks",JSON.stringify(watchTheDom()));
                    getLocalStorageTasks = JSON.parse(localStorage.getItem("tasks"));
                    elementTextFocus = undefined;
                }
            }
            if (e.altKey && e.key === "3") {
                if (elementTextFocus !== undefined) {
                    ulDone.insertBefore(elementFocus,ulDone.firstChild); // Moves the element with the focus to the Done ul by pressing ALT + 3
                    localStorage.setItem("tasks",JSON.stringify(watchTheDom()));
                    getLocalStorageTasks = JSON.parse(localStorage.getItem("tasks"));
                    elementTextFocus = undefined;
                }
            }
            if (e.altKey && e.key === "4") {
                if (elementTextFocus !== undefined) {
                    elementFocus.remove() // Moves the element with the focus to the Done ul by pressing ALT + 3
                    localStorage.setItem("tasks",JSON.stringify(watchTheDom()));
                    getLocalStorageTasks = JSON.parse(localStorage.getItem("tasks"));
                    elementTextFocus = undefined;
                }
            }
        });
    }
}

function handleAddClickEvents(e) { // A function that attaches the task that the user wrote and to the list relevant to it.

    if (e.target.id === "submit-add-to-do"){
        if (!inputToDo.value) {
            alert("You can't enter an empty task!");
        } else {
            addTaskToUL(inputToDo.value, ulToDo);
            localStorage.setItem("tasks",JSON.stringify(watchTheDom())); // Updates the local storage according to what you "see" on the page
            getLocalStorageTasks = JSON.parse(localStorage.getItem("tasks"));
            inputToDo.value = "";
        }
    }
    if (e.target.id === "submit-add-in-progress"){
        if (!inputInProgress.value) {
            alert("You can't enter an empty task!");
        } else {
            addTaskToUL(inputInProgress.value, ulInProgress);
            localStorage.setItem("tasks",JSON.stringify(watchTheDom())); // Updates the local storage according to what you "see" on the page
            getLocalStorageTasks = JSON.parse(localStorage.getItem("tasks"));
            inputInProgress.value = "";
        }
    }
    if (e.target.id === "submit-add-done"){
        if (!inputDone.value) {
            alert("You can't enter an empty task!");
        } else {
            addTaskToUL(inputDone.value, ulDone)
            localStorage.setItem("tasks",JSON.stringify(watchTheDom())); // Updates the local storage according to what you "see" on the page
            getLocalStorageTasks = JSON.parse(localStorage.getItem("tasks"));
            inputDone.value = "";

        }
    }
}

function listenForDoubleClick(element) { //By double-clicking you can edit a list and save it in local storage on blur
    if (element.target.classList.contains("task")){
        element.target.contentEditable = true;
        element.target.onblur = function(){
            localStorage.setItem("tasks", JSON.stringify(watchTheDom()));
            element.target.contentEditable = false;
            getLocalStorageTasks = JSON.parse(localStorage.getItem("tasks"));

        }
    }
}

function changeBackground() {
    const url = document.getElementById("background-url");
    document.body.style.backgroundImage = `url(${url.value})`;
    localStorage.setItem("background", `url(${url.value})`); // Updated in local storage as "background"
}

function defaultBackground() {
    document.body.style.backgroundImage = `url("markus-winkler-3Rn2EjoAC1g-unsplash.jpg")`;
    localStorage.setItem("background", `url("markus-winkler-3Rn2EjoAC1g-unsplash.jpg")`); // Returns to the default background- Updated in local storage as "background"
    
}

document.getElementById("explain").addEventListener("mouseenter", (e) => {
    document.getElementById("explainig").style.display = "block"
})

document.getElementById("explain").addEventListener("mouseout", (e) => {
    document.getElementById("explainig").style.display = "none"
})


/*/\/\/\/\/\ AUXILIARY FUNCTIONS FOR BUILDING THE DOM /\/\/\/\/\*/

function updatedDom(){  // Updates the DOM according to the local storage "tasks"
    for (let key in getLocalStorageTasks) {
        for(let ele of getLocalStorageTasks[key]) {
            if (key === "todo") {
                addTaskToUL(ele,ulToDo);
            }
            if (key === "in-progress") {
                addTaskToUL(ele,ulInProgress);
            }
            if (key === "done"){
                addTaskToUL(ele, ulDone);
            }
        }
    }
    getLocalStorageTasks = watchTheDom(); // Saved as the DOM appears
}

function addTaskToUL(task,ul) { //Adds a new task element to the relevant UL
    const newTask = document.createElement("li");
    newTask.textContent = task;
    newTask.classList.add("task");
    ul.insertBefore(newTask,ul.firstChild);
}


/*/\/\/\/\/\ API FUNCTIONS /\/\/\/\/\*/

async function getData() {
    // create "loading" indicator
    const loader = document.createElement("span");
    loader.innerHTML = `<div class='lds-ellipsis loader' id="spinner"><div></div><div></div><div></div><div></div></div>`;
    document.body.append(loader);
    
    const response = await fetch("https://json-bins.herokuapp.com/bin/614aece24021ac0e6c080c6f",{
        method: "GET"
    });
    if (!response.ok) {  //If the request is invalid
        alert(`error ${response.status}`);
    }
    loader.remove(); // remove loader from dom
    const data = await response.json();
    document.querySelectorAll("li").forEach((li) => li.remove()); // Delete all li to avoid duplication
    localStorage.setItem("tasks",JSON.stringify(data.tasks)); // Create local storage "tasks" according to what is in the API
    getLocalStorageTasks = JSON.parse(localStorage.getItem("tasks")); // Define getLocalStorageTasks for what is in local storage
    updatedDom(); 
}

async function saveData() {
    // create "loading" indicator
    const loader = document.createElement("span");
    loader.innerHTML = `<div class='lds-ellipsis loader' id="spinner"><div></div><div></div><div></div><div></div></div>`;
    document.body.append(loader);
    //api response
    const ApiData = {
        "_id": "614aece24021ac0e6c080c6f",
        "name": "AmitFikler",
        "tasks": watchTheDom(), // Saves an object according to what is "seen" on the page
        "createdAt": "2021-09-22T08:44:18.431Z",
        "updatedAt": new Date().toJSON().slice(0,10).replace(/-/g,'/'),
    };
    const response = await fetch("https://json-bins.herokuapp.com/bin/614aece24021ac0e6c080c6f", {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ApiData)
});
    if(!response.ok) {
        alert("error");
    }
    loader.remove();
}











