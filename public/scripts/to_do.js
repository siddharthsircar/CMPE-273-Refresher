'use strict'

const input = document.getElementById('todo-title');
const addButton = document.getElementById('new-todo');
const taskList = document.querySelector('#tasks');

function inputLength() {
    return input.value.length
}

var userId;
var sessionData;

// Use of SLICE to get first letter of name
const getFirstLetter = (n) => {
    return n.slice(0, 1);
};

function profileName() {
    sessionData = sessionStorage.getItem('user-data');
    // using JSON.Parse to convert JSON string into JSON object
    sessionData = JSON.parse(sessionData);
    let [firstName, lastName] = sessionData.name.split(' ');
    let firstNameInit = getFirstLetter(firstName);
    let secondNameInit = getFirstLetter(lastName);
    document.getElementById('initialsText').innerHTML = firstNameInit + secondNameInit;
}

// Object
let fullName = {
    firstName: 'Siddharth',
    lastName: 'Sircar'
}

const greetUser = () => {
    // Using TYPEOF to check datatype of sessionData.name
    if (typeof sessionData.name !== 'undefined' && sessionData.name !== null) {
        // Destructuring ARRAY
        let [fName, lName] = sessionData.name.split(' ');
        // Using OBJECT.ASSIGN
        Object.assign(fullName, { firstName: fName, lastName: lName });
    }

    // Destructuring OBJECT
    const { firstName, lastName } = fullName;
    alert(`Hi ${firstName} ${lastName}`);
}

let tasksTitle = []

function displayUserTasks() {
    userId = sessionData.id;
    axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/todos`).then(response => {
        for (const task of response.data) {
            if (task.completed === false) {
                tasksTitle.push(task.title);
                addListItem(task.title);
            }
        }
        // Using CALLBACK: passing a function as an argument to another function
        taskCount(tasksTitle, displayCount);
    }).catch(error => {
        console.log(error);
        alert('Could not connect to database. ', error);
    });
}

// Callback
const taskCount = (tasks, myCallback) => {
    let count = tasks.length;
    myCallback(count);
};

function displayCount(count) {
    let countEl = document.getElementById('task-count');
    countEl.innerHTML = `No. of tasks: ${count}`;
}

// Using DEFAULT ARGUMENTS in function in case function call doesnot send any params
function addListItem(title = null) {
    let li = document.createElement('li');

    let delButton = document.createElement('button')
    delButton.appendChild(document.createTextNode('Delete'));
    delButton.setAttribute('class', 'delete');
    if (title === null) {
        title = input.value;
        // Using LOCALSTORAGE (storage does not expire)
        localStorage.setItem('taks', title);
        tasksTitle.push(title);
        taskCount(tasksTitle, displayCount);
    }
    li.appendChild(document.createTextNode(title));
    li.appendChild(delButton)
    taskList.appendChild(li)
    input.value = '';

    delButton.addEventListener('click', function () {
        delButton.parentNode.parentNode.removeChild(li);
    });

    li.addEventListener('click', function () {
        li.classList.toggle('done');
    });
}

function addTodoOnclick() {
    if (inputLength() > 0) {
        addListItem();
    }
}

function addTodoOnEnter(event) {
    if (inputLength() > 0 && event.keyCode == 13) {
        addListItem();
    }
}

profileName();
displayUserTasks();

addButton.addEventListener('click', addTodoOnclick);
input.addEventListener('keypress', addTodoOnEnter);