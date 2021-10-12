import './Scss/styles.scss'
/* /\/\/\/\/\ Setting Variables /\/\/\/\/\ */

const inputToDo = document.getElementById('add-to-do-task')
const inputInProgress = document.getElementById('add-in-progress-task')
const inputDone = document.getElementById('add-done-task')

const ulToDo = document.getElementsByClassName('to-do-tasks')[0]
const ulInProgress = document.getElementsByClassName('in-progress-tasks')[0]
const ulDone = document.getElementsByClassName('done-tasks')[0]

const searchBar = document.getElementById('search')
const liElements = document.getElementsByTagName('li')

const loadBtn = document.getElementById('load-btn')
const saveBtn = document.getElementById('save-btn')

let elementFocus
let elementTextFocus

let getLocalStorageTasks = JSON.parse(localStorage.getItem('tasks')) // get tasks obj from local storage
document.body.style.backgroundImage = localStorage.getItem('background') // save user style
updatedDom() // Updates the DOM according to what is in the local storage

/* /\/\/\/\/\ EVENT LISTENERS /\/\/\/\/\ */

searchBar.addEventListener('keyup', (e) => {
  // A search bar that updates the DOM
  const searchString = e.target.value.toLowerCase()
  for (const i of liElements) {
    if (!i.textContent.toLowerCase().includes(searchString)) {
      i.style.display = 'none'
    } else {
      i.style.display = ''
    }
  }
})

document
  .getElementById('background')
  .addEventListener('click', changeBackground) // The user selects the background he wants

document
  .getElementById('background-default')
  .addEventListener('click', defaultBackground) // Returns to the default background

document.getElementById('clear-tasks').addEventListener('click', (e) => {
  // clear the tasks and the local storage
  document.querySelectorAll('li').forEach(li => li.remove())
  updateGetLocalStorageTasks()
})

document.addEventListener('mouseover', handleMouseEvents)

document.querySelectorAll('.add-task').forEach(btn => btn.addEventListener('click', handleAddClickEvents))

document.addEventListener('dblclick', listenForDoubleClick)

loadBtn.addEventListener('click', loadFromApi)

saveBtn.addEventListener('click', saveToApi)

/*       A function that "views" the site and returns an object of what it sees      */

function watchTheDom () {
// A function that supposedly views the site and returns as an object the way the lists are arranged
  const todoArr = []
  const inProgressArr = []
  const doneArr = []
  for (const ul of document.querySelectorAll('ul')) {
    if (ul.classList.contains('to-do-tasks')) {
      for (const child of ul.children) {
        if (child.style.display !== 'none') todoArr.unshift(child.textContent)
      }
    } else if (ul.classList.contains('in-progress-tasks')) {
      for (const child of ul.children) {
        if (child.style.display !== 'none') { inProgressArr.unshift(child.textContent) }
      }
    } else if (ul.classList.contains('done-tasks')) {
      for (const child of ul.children) {
        if (child.style.display !== 'none') doneArr.unshift(child.textContent)
      }
    }
  }
  return { todo: todoArr, 'in-progress': inProgressArr, done: doneArr }
}

/* /\/\/\/\/\ EVENT LISTENERS FUNCTIONS /\/\/\/\/\ */

function handleMouseEvents (event) {
  // Activated when the mouse is on an element
  if (event.target.classList.contains('task')) {
    elementTextFocus = event.target.textContent
    elementFocus = event.target
    document.addEventListener('keydown', (e) => {
      if (e.altKey) {
        if (e.key === '1') {
          mouseEventFocus(elementTextFocus, elementFocus, ulToDo)
        }
        if (e.key === '2') {
          mouseEventFocus(elementTextFocus, elementFocus, ulInProgress)
        }
        if (e.key === '3') {
          mouseEventFocus(elementTextFocus, elementFocus, ulDone)
        }
        if (e.key === '4') {
          mouseEventRemove(elementTextFocus, elementFocus)
        }
      }
    })
  }
}

function mouseEventFocus (text, element, ul) {
  if (text !== undefined) {
    ul.insertBefore(element, ul.firstChild)
    updateGetLocalStorageTasks()
    text = undefined
  }
}
function mouseEventRemove (text, element) {
  if (text !== undefined) {
    element.remove()
    updateGetLocalStorageTasks()
    text = undefined
  }
}

function handleAddClickEvents (e) {
  // A function that attaches the task that the user wrote and to the list relevant to it.
  addTask(e.target.id)
  updateGetLocalStorageTasks()
}

function addTask (submit) {
  if (submit === 'submit-add-to-do') {
    if (!inputToDo.value) {
      alert("You can't enter an empty task!")
    } else {
      addTaskToUL(inputToDo.value, ulToDo)
      inputToDo.value = ''
    }
  }
  if (submit === 'submit-add-in-progress') {
    if (!inputInProgress.value) {
      alert("You can't enter an empty task!")
    } else {
      addTaskToUL(inputInProgress.value, ulInProgress)
      inputInProgress.value = ''
    }
  }
  if (submit === 'submit-add-done') {
    if (!inputDone.value) {
      alert("You can't enter an empty task!")
    } else {
      addTaskToUL(inputDone.value, ulDone)
      inputDone.value = ''
    }
  }
}

function listenForDoubleClick (element) {
  // By double-clicking you can edit a list and save it in local storage on blur
  if (element.target.classList.contains('task')) {
    element.target.contentEditable = true
    element.target.onblur = function () {
      element.target.contentEditable = false
      updateGetLocalStorageTasks()
    }
  }
}

function changeBackground () {
  const url = document.getElementById('background-url')
  document.body.style.backgroundImage = `url(${url.value})`
  localStorage.setItem('background', `url(${url.value})`) // Updated in local storage as "background"
}

function defaultBackground () {
  document.body.style.backgroundImage = `url("./images/background.jpg")`
  localStorage.setItem('background', `url("./images/background.jpg")`) // Returns to the default background- Updated in local storage as "background"
}

document.getElementById('explain').addEventListener('mouseenter', (e) => {
  document.getElementById('explainig').style.display = 'block'
})

document.getElementById('explain').addEventListener('mouseout', (e) => {
  document.getElementById('explainig').style.display = 'none'
})

/* /\/\/\/\/\ AUXILIARY FUNCTIONS FOR BUILDING THE DOM /\/\/\/\/\ */

function updatedDom () {
  // Updates the DOM according to the local storage "tasks"
  for (const key in getLocalStorageTasks) {
    for (const ele of getLocalStorageTasks[key]) {
      addTaskbyKey(key, ele)
    }
  }
  getLocalStorageTasks = watchTheDom() // Saved as the DOM appears
}

function addTaskbyKey (key, ele) {
  if (key === 'todo') {
    addTaskToUL(ele, ulToDo)
  }
  if (key === 'in-progress') {
    addTaskToUL(ele, ulInProgress)
  }
  if (key === 'done') {
    addTaskToUL(ele, ulDone)
  }
}

function addTaskToUL (task, ul) {
  // Adds a new task element to the relevant UL
  const newTask = document.createElement('li')
  newTask.textContent = task
  newTask.classList.add('task')
  ul.insertBefore(newTask, ul.firstChild)
}
function updateGetLocalStorageTasks () {
  localStorage.setItem('tasks', JSON.stringify(watchTheDom())) // Updates the local storage according to what you "see" on the page
  getLocalStorageTasks = JSON.parse(localStorage.getItem('tasks'))
}

/* /\/\/\/\/\ API FUNCTIONS /\/\/\/\/\ */
const TASKS_API_URL =
  'https://json-bins.herokuapp.com/bin/614aece24021ac0e6c080c6f'

async function getData () {
  const loaded = await request('GET', null)
  return loaded.tasks
}

async function saveData () {
  const ApiData = {
    _id: '614aece24021ac0e6c080c6f',
    name: 'AmitFikler',
    tasks: watchTheDom(), // Saves an object according to what is "seen" on the page
    createdAt: '2021-09-22T08:44:18.431Z',
    updatedAt: new Date().toJSON().slice(0, 10).replace(/-/g, '/')
  }
  const saved = await request('PUT', ApiData)
  return saved
}

function createLoader () {
  const loader = document.createElement('span')
  loader.innerHTML = `<div class='lds-ellipsis loader' id="spinner"><div></div><div></div><div></div><div></div></div>`
  document.body.append(loader)
}

function removeLoader () {
  document.querySelector('.loader').remove()
}

async function request (method = '', data = null) {
  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }
  if (data) {
    options.body = JSON.stringify(data)
  }
  const response = await fetch(TASKS_API_URL, options)
  errorStatus(response.status)

  return response.json()
}

async function loadFromApi () {
  createLoader()
  localStorage.setItem('tasks', JSON.stringify(await getData())) // Create local storage "tasks" according to what is in the API
  getLocalStorageTasks = JSON.parse(localStorage.getItem('tasks')) // Define getLocalStorageTasks for what is in local storage
  removeLoader()
  document.querySelectorAll('li').forEach(li => li.remove()) // Delete all li to avoid duplication
  updatedDom()
}

async function saveToApi () {
  createLoader()
  await console.log(watchTheDom())
  await saveData()
  removeLoader()
}

function errorStatus (status) {
  if (status > 400) {
    alert(`HTTP Error ${status}`)
  }
}
