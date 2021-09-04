'use strict'

// Using CONST to declare constant variable which will not be updated later
const emailTxtbx = document.getElementById('email');
const nameTxtbx = document.getElementById('name');
const passwordTxtbx = document.getElementById('password');
const loginBtn = document.getElementById('login');
const registerBtn = document.getElementById('register');

// Using VAR to declare global variables
var firstName;
var lastName;

// Use of SPLIT func to split full name.
// Use of ARROW FUNCTION
var splitName = (name) => {
    // Use of LET to create block scope variable 
    let fullName = name.split(' ');
    fullName = [fullName[0], fullName[fullName.length - 1]]
    return fullName;
}

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

// Object
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

function storeUserDetails(email) {
    if (email === 'sid@gmail.com') {
        // Use JSON.stringify to convert JSON object into string
        let userData = JSON.stringify(userDeets);
        sessionStorage.setItem('user-data', userData);
    } else {
        axios.get(`https://jsonplaceholder.typicode.com/users?email=${email}`).then(response => {
            // let user_data = JSON.stringify(response.data[0]);            
            let userResponse = response.data[0];
            console.log(userResponse.name);
            // Using OBJECT.ASSIGN
            Object.assign(userDeets, {
                'id': userResponse.id,
                'name': userResponse.name,
                'email': `${email}`,
                'address': {
                    'city': `${userResponse.address.city}`,
                    'zipcode': `${userResponse.address.zipcode}`,
                    'geo': {
                        'lat': `${userResponse.address.geo.lat}`,
                        'lng': `${userResponse.address.geo.lng}`
                    }
                },
                'phone': `${userResponse.phone}`
            })
            let userData = JSON.stringify(userDeets);
            // console.log(user_data);
            sessionStorage.setItem('user-data', userData);
        }
        ).catch(error => {
            console.log(error);
            alert(error);
        });
    }
}

function registerUser() {
    if (document.title === 'LOGIN') location.href = '../modules/register.html';
    else {
        let userData = JSON.stringify(userDeets);
        // console.log(user_data);
        sessionStorage.setItem('user-data', userData);
        alert('User Registered');
        location.href = '../modules/todo.html';
    }
}

loginBtn.addEventListener('click', authenticateUser);
registerBtn.addEventListener('click', registerUser);