/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Scss/styles.scss":
/*!******************************!*\
  !*** ./src/Scss/styles.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://final/./src/Scss/styles.scss?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Scss_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Scss/styles.scss */ \"./src/Scss/styles.scss\");\n\r\n/* /\\/\\/\\/\\/\\ Setting Variables /\\/\\/\\/\\/\\ */\r\n\r\nconst inputToDo = document.getElementById('add-to-do-task')\r\nconst inputInProgress = document.getElementById('add-in-progress-task')\r\nconst inputDone = document.getElementById('add-done-task')\r\n\r\nconst ulToDo = document.getElementsByClassName('to-do-tasks')[0]\r\nconst ulInProgress = document.getElementsByClassName('in-progress-tasks')[0]\r\nconst ulDone = document.getElementsByClassName('done-tasks')[0]\r\n\r\nconst searchBar = document.getElementById('search')\r\nconst liElements = document.getElementsByTagName('li')\r\n\r\nconst loadBtn = document.getElementById('load-btn')\r\nconst saveBtn = document.getElementById('save-btn')\r\n\r\nlet elementFocus\r\nlet elementTextFocus\r\n\r\nlet getLocalStorageTasks = JSON.parse(localStorage.getItem('tasks')) // get tasks obj from local storage\r\ndocument.body.style.backgroundImage = localStorage.getItem('background') // save user style\r\nupdatedDom() // Updates the DOM according to what is in the local storage\r\n\r\n/* /\\/\\/\\/\\/\\ EVENT LISTENERS /\\/\\/\\/\\/\\ */\r\n\r\nsearchBar.addEventListener('keyup', (e) => {\r\n  // A search bar that updates the DOM\r\n  const searchString = e.target.value.toLowerCase()\r\n  for (const i of liElements) {\r\n    if (!i.textContent.toLowerCase().includes(searchString)) {\r\n      i.style.display = 'none'\r\n    } else {\r\n      i.style.display = ''\r\n    }\r\n  }\r\n})\r\n\r\ndocument\r\n  .getElementById('background')\r\n  .addEventListener('click', changeBackground) // The user selects the background he wants\r\n\r\ndocument\r\n  .getElementById('background-default')\r\n  .addEventListener('click', defaultBackground) // Returns to the default background\r\n\r\ndocument.getElementById('clear-tasks').addEventListener('click', (e) => {\r\n  // clear the tasks and the local storage\r\n  document.querySelectorAll('li').forEach(li => li.remove())\r\n  updateGetLocalStorageTasks()\r\n})\r\n\r\ndocument.addEventListener('mouseover', handleMouseEvents)\r\n\r\ndocument.querySelectorAll('.add-task').forEach(btn => btn.addEventListener('click', handleAddClickEvents))\r\n\r\ndocument.addEventListener('dblclick', listenForDoubleClick)\r\n\r\nloadBtn.addEventListener('click', loadFromApi)\r\n\r\nsaveBtn.addEventListener('click', saveToApi)\r\n\r\n/*       A function that \"views\" the site and returns an object of what it sees      */\r\n\r\nfunction watchTheDom () {\r\n// A function that supposedly views the site and returns as an object the way the lists are arranged\r\n  const todoArr = []\r\n  const inProgressArr = []\r\n  const doneArr = []\r\n  for (const ul of document.querySelectorAll('ul')) {\r\n    if (ul.classList.contains('to-do-tasks')) {\r\n      for (const child of ul.children) {\r\n        if (child.style.display !== 'none') todoArr.unshift(child.textContent)\r\n      }\r\n    } else if (ul.classList.contains('in-progress-tasks')) {\r\n      for (const child of ul.children) {\r\n        if (child.style.display !== 'none') { inProgressArr.unshift(child.textContent) }\r\n      }\r\n    } else if (ul.classList.contains('done-tasks')) {\r\n      for (const child of ul.children) {\r\n        if (child.style.display !== 'none') doneArr.unshift(child.textContent)\r\n      }\r\n    }\r\n  }\r\n  return { todo: todoArr, 'in-progress': inProgressArr, done: doneArr }\r\n}\r\n\r\n/* /\\/\\/\\/\\/\\ EVENT LISTENERS FUNCTIONS /\\/\\/\\/\\/\\ */\r\n\r\nfunction handleMouseEvents (event) {\r\n  // Activated when the mouse is on an element\r\n  if (event.target.classList.contains('task')) {\r\n    elementTextFocus = event.target.textContent\r\n    elementFocus = event.target\r\n    document.addEventListener('keydown', (e) => {\r\n      if (e.altKey) {\r\n        if (e.key === '1') {\r\n          mouseEventFocus(elementTextFocus, elementFocus, ulToDo)\r\n        }\r\n        if (e.key === '2') {\r\n          mouseEventFocus(elementTextFocus, elementFocus, ulInProgress)\r\n        }\r\n        if (e.key === '3') {\r\n          mouseEventFocus(elementTextFocus, elementFocus, ulDone)\r\n        }\r\n        if (e.key === '4') {\r\n          mouseEventRemove(elementTextFocus, elementFocus)\r\n        }\r\n      }\r\n    })\r\n  }\r\n}\r\n\r\nfunction mouseEventFocus (text, element, ul) {\r\n  if (text !== undefined) {\r\n    ul.insertBefore(element, ul.firstChild)\r\n    updateGetLocalStorageTasks()\r\n    text = undefined\r\n  }\r\n}\r\nfunction mouseEventRemove (text, element) {\r\n  if (text !== undefined) {\r\n    element.remove()\r\n    updateGetLocalStorageTasks()\r\n    text = undefined\r\n  }\r\n}\r\n\r\nfunction handleAddClickEvents (e) {\r\n  // A function that attaches the task that the user wrote and to the list relevant to it.\r\n  addTask(e.target.id)\r\n  updateGetLocalStorageTasks()\r\n}\r\n\r\nfunction addTask (submit) {\r\n  if (submit === 'submit-add-to-do') {\r\n    if (!inputToDo.value) {\r\n      alert(\"You can't enter an empty task!\")\r\n    } else {\r\n      addTaskToUL(inputToDo.value, ulToDo)\r\n      inputToDo.value = ''\r\n    }\r\n  }\r\n  if (submit === 'submit-add-in-progress') {\r\n    if (!inputInProgress.value) {\r\n      alert(\"You can't enter an empty task!\")\r\n    } else {\r\n      addTaskToUL(inputInProgress.value, ulInProgress)\r\n      inputInProgress.value = ''\r\n    }\r\n  }\r\n  if (submit === 'submit-add-done') {\r\n    if (!inputDone.value) {\r\n      alert(\"You can't enter an empty task!\")\r\n    } else {\r\n      addTaskToUL(inputDone.value, ulDone)\r\n      inputDone.value = ''\r\n    }\r\n  }\r\n}\r\n\r\nfunction listenForDoubleClick (element) {\r\n  // By double-clicking you can edit a list and save it in local storage on blur\r\n  if (element.target.classList.contains('task')) {\r\n    element.target.contentEditable = true\r\n    element.target.onblur = function () {\r\n      element.target.contentEditable = false\r\n      updateGetLocalStorageTasks()\r\n    }\r\n  }\r\n}\r\n\r\nfunction changeBackground () {\r\n  const url = document.getElementById('background-url')\r\n  document.body.style.backgroundImage = `url(${url.value})`\r\n  localStorage.setItem('background', `url(${url.value})`) // Updated in local storage as \"background\"\r\n}\r\n\r\nfunction defaultBackground () {\r\n  document.body.style.backgroundImage = `url(\"./images/background.jpg\")`\r\n  localStorage.setItem('background', `url(\"./images/background.jpg\")`) // Returns to the default background- Updated in local storage as \"background\"\r\n}\r\n\r\ndocument.getElementById('explain').addEventListener('mouseenter', (e) => {\r\n  document.getElementById('explainig').style.display = 'block'\r\n})\r\n\r\ndocument.getElementById('explain').addEventListener('mouseout', (e) => {\r\n  document.getElementById('explainig').style.display = 'none'\r\n})\r\n\r\n/* /\\/\\/\\/\\/\\ AUXILIARY FUNCTIONS FOR BUILDING THE DOM /\\/\\/\\/\\/\\ */\r\n\r\nfunction updatedDom () {\r\n  // Updates the DOM according to the local storage \"tasks\"\r\n  for (const key in getLocalStorageTasks) {\r\n    for (const ele of getLocalStorageTasks[key]) {\r\n      addTaskbyKey(key, ele)\r\n    }\r\n  }\r\n  getLocalStorageTasks = watchTheDom() // Saved as the DOM appears\r\n}\r\n\r\nfunction addTaskbyKey (key, ele) {\r\n  if (key === 'todo') {\r\n    addTaskToUL(ele, ulToDo)\r\n  }\r\n  if (key === 'in-progress') {\r\n    addTaskToUL(ele, ulInProgress)\r\n  }\r\n  if (key === 'done') {\r\n    addTaskToUL(ele, ulDone)\r\n  }\r\n}\r\n\r\nfunction addTaskToUL (task, ul) {\r\n  // Adds a new task element to the relevant UL\r\n  const newTask = document.createElement('li')\r\n  newTask.textContent = task\r\n  newTask.classList.add('task')\r\n  ul.insertBefore(newTask, ul.firstChild)\r\n}\r\nfunction updateGetLocalStorageTasks () {\r\n  localStorage.setItem('tasks', JSON.stringify(watchTheDom())) // Updates the local storage according to what you \"see\" on the page\r\n  getLocalStorageTasks = JSON.parse(localStorage.getItem('tasks'))\r\n}\r\n\r\n/* /\\/\\/\\/\\/\\ API FUNCTIONS /\\/\\/\\/\\/\\ */\r\nconst TASKS_API_URL =\r\n  'https://json-bins.herokuapp.com/bin/614aece24021ac0e6c080c6f'\r\n\r\nasync function getData () {\r\n  const loaded = await request('GET', null)\r\n  return loaded.tasks\r\n}\r\n\r\nasync function saveData () {\r\n  const ApiData = {\r\n    _id: '614aece24021ac0e6c080c6f',\r\n    name: 'AmitFikler',\r\n    tasks: watchTheDom(), // Saves an object according to what is \"seen\" on the page\r\n    createdAt: '2021-09-22T08:44:18.431Z',\r\n    updatedAt: new Date().toJSON().slice(0, 10).replace(/-/g, '/')\r\n  }\r\n  const saved = await request('PUT', ApiData)\r\n  return saved\r\n}\r\n\r\nfunction createLoader () {\r\n  const loader = document.createElement('span')\r\n  loader.innerHTML = `<div class='lds-ellipsis loader' id=\"spinner\"><div></div><div></div><div></div><div></div></div>`\r\n  document.body.append(loader)\r\n}\r\n\r\nfunction removeLoader () {\r\n  document.querySelector('.loader').remove()\r\n}\r\n\r\nasync function request (method = '', data = null) {\r\n  const options = {\r\n    method,\r\n    headers: {\r\n      Accept: 'application/json',\r\n      'Content-Type': 'application/json'\r\n    }\r\n  }\r\n  if (data) {\r\n    options.body = JSON.stringify(data)\r\n  }\r\n  const response = await fetch(TASKS_API_URL, options)\r\n  errorStatus(response.status)\r\n\r\n  return response.json()\r\n}\r\n\r\nasync function loadFromApi () {\r\n  createLoader()\r\n  localStorage.setItem('tasks', JSON.stringify(await getData())) // Create local storage \"tasks\" according to what is in the API\r\n  getLocalStorageTasks = JSON.parse(localStorage.getItem('tasks')) // Define getLocalStorageTasks for what is in local storage\r\n  removeLoader()\r\n  document.querySelectorAll('li').forEach(li => li.remove()) // Delete all li to avoid duplication\r\n  updatedDom()\r\n}\r\n\r\nasync function saveToApi () {\r\n  createLoader()\r\n  await console.log(watchTheDom())\r\n  await saveData()\r\n  removeLoader()\r\n}\r\n\r\nfunction errorStatus (status) {\r\n  if (status > 400) {\r\n    alert(`HTTP Error ${status}`)\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://final/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;