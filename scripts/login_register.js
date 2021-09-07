'use strict'

// Using CONST to declare constant variable which can not be updated later
const emailTxtbx = document.getElementById('email');
const nameTxtbx = document.getElementById('name');
const passwordTxtbx = document.getElementById('password');
const loginBtn = document.getElementById('login');
const registerBtn = document.getElementById('register');

// Using VAR
var firstName;
var lastName;

// Using SPLIT func to split full name.
// Using ARROW FUNCTION
const splitName = (name) => {
    // Use of LET to create block scope variable (Can not be accessed outside this block)
    let fullName = name.split(' ');
    fullName = [fullName[0], fullName[fullName.length - 1]]
    return fullName;
}

// console.log(fullName); will throw an ERROR

// Using AXIOS API call to validate user
function authenticateUser() {
    if (document.title === 'REGISTER') location.href = '../modules/login.html';
    else {
        axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
            let userEmails = ['sid@gmail.com'];
            for (let i = 0; i < response.data.length; i++) {
                userEmails.push(response.data[i].email);
            }
            // Using LET to declare function variables
            let email = emailTxtbx.value;
            let password = passwordTxtbx.value;

            if (email.length <= 0) alert('Please enter email');
            else if (password.length <= 0) alert('Please enter password');
            else {
                if (validateEmail(email)) {
                    // Using INCLUDES to verify if the entered email exists in the registered email list.
                    if (userEmails.includes(email)) {
                        if (password === '1234') {
                            storeUserDetails(email);
                            location.href = '../modules/todo.html';
                        }
                        else alert('Incorrect Password!');
                    }
                    else alert('Email not registered')
                }
                else alert('Enter Valid Email.')
            }
        }).catch(error => {
            console.log(error);
            alert('Could not connect to database. ', error);
        });
    }
}

// Used Regular Expression to validate email format.
function validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
    }
    return false;
}

// OBJECT
let userDeets = {
    'id': 1,
    'name': 'Siddharth Sircar',
    'email': 'sid@gmail.com',
    'address': {
        'city': 'San Jose',
        'zipcode': '95112',
        'geo': {
            'lat': '',
            'lng': ''
        }
    },
    'phone': '1-408-207-7389'
}

// Using ASYNC / AWAIT
async function getUserData(email) {
    let response = await fetch(`https://jsonplaceholder.typicode.com/users?email=${email}`);
    let data = await response.json();
    return data;
}

function storeUserDetails(email) {
    if (email === 'sid@gmail.com') {
        // Use JSON.stringify to convert JSON object into string
        let userData = JSON.stringify(userDeets);
        sessionStorage.setItem('user-data', userData);
    } else {
        // Using ASYNC/AWAIT
        getUserData(email).then((data) => {
            let apiResponse = data[0];
            // Using OBJECT.ASSIGN
            Object.assign(userDeets, {
                'id': apiResponse.id,
                'name': apiResponse.name,
                'email': `${email}`,
                'address': {
                    'city': `${apiResponse.address.city}`,
                    'zipcode': `${apiResponse.address.zipcode}`,
                    'geo': {
                        'lat': `${apiResponse.address.geo.lat}`,
                        'lng': `${apiResponse.address.geo.lng}`
                    }
                },
                'phone': `${apiResponse.phone}`
            })
            let userData = JSON.stringify(userDeets);
            sessionStorage.setItem('user-data', userData);
        })
    }
}

function registerUser() {
    if (document.title === 'LOGIN') {
        location.href = '../modules/register.html';
        return false;
    }
    else {
        // Using Promise
        registerPromise().then((message) => {
            let userData = JSON.stringify(userDeets);
            sessionStorage.setItem('user-data', userData);
            location.href = '../modules/todo.html';
            console.log(message);
        }).catch((error) => {
            alert(error);
        })
        return false;
    }
}

// Using PROMISE
function registerPromise() {
    return new Promise((resolve, reject) => {
        let emailTxtbx = document.getElementById('email');
        let email = emailTxtbx.value;
        if (validateEmail(email)) {
            resolve('Registration Successful!');
        } else reject('Invalid Email!');
    })
}

loginBtn.addEventListener('click', authenticateUser);
// registerBtn.addEventListener('click', registerUser);