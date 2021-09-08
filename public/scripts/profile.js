'use strict'

// Using IMPORT as REQUIRE needed NodeJS integration
import getFirstLetter from './helper.js';
import validateEmail from './helper.js';

const nameTxtbx = document.getElementById('name');
const phoneTxtbx = document.getElementById('phone');
const emailTxtbx = document.getElementById('email');
const cityTxtbx = document.getElementById('city');
const dobTxtbx = document.getElementById('bdate');
const followBtn = document.getElementById('follow');
const locateButton = document.getElementById('locate');

// Use of Class
class user {
    constructor(userData) {
        this.userData = userData;
    }

    getUserDetails() {
        return this.userData;
    }

    // Using Static Method
    static getBirthDate() {
        return '07/29/1998';
    }
}

// Inheritence
class profile extends user {
    constructor(userData) {
        super(userData);
    }

    displayProfile() {
        let userData = this.getUserDetails();
        nameTxtbx.value = userData.name;
        emailTxtbx.value = userData.email;
        phoneTxtbx.value = userData.phone;
        dobTxtbx.value = user.getBirthDate();
        cityTxtbx.value = userData.address.city;
    }
}

let sessionData;
function displayProfileName() {
    sessionData = sessionStorage.getItem('user-data');
    // using JSON.Parse to convert JSON string into JSON object
    sessionData = JSON.parse(sessionData);
    let [firstName, lastName] = sessionData.name.split(' ');
    let firstNameInit = getFirstLetter(firstName);
    let secondNameInit = getFirstLetter(lastName);
    document.getElementById('initialsText').innerHTML = firstNameInit + secondNameInit;
}

// Using Geolocation
const getMyLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let latitude = position.coords.latitude;
            latitude = latitude.toFixed(5);
            let longitude = position.coords.longitude;
            longitude = longitude.toFixed(5);
            document.getElementById('location').value = latitude + ',' + longitude;
        });
    }
    else {
        document.getElementById('location').value = 'No permission to fetch location';
    }
}

// Using CLOSURES
const reqCounter = (function () {
    let requests = 0;
    return function () {
        requests += 1;
        localStorage.setItem('follow-requests', requests);
        return requests;
    }
})()

function displayRequestCount() {
    document.getElementById('reqcount').innerHTML = `Follow Requests Sent: ${reqCounter()}`;
}

// Using REST operator
const requestInfo = (...rest) => {
    document.getElementById('followText').innerHTML = `You sent request to: ${rest}`;
}

function followUser() {
    const folName = document.getElementById('fName');
    const folEmail = document.getElementById('fEmail');
    console.log(folEmail.value);
    // Using CALL and APPLY
    if (folName.value === "" && folEmail.value !== "") {
        // Using CALL
        if (validateEmail(folEmail.value)) {
            requestInfo.call("", folEmail.value);
            folEmail.value = "";
            displayRequestCount();
        } else alert('Invalid Email!');
    } else if (folName.value !== "" && folEmail.value === "") {
        requestInfo.call("", folName.value);
        folName.value = "";
        displayRequestCount();
    } else if (folName.value !== "" && folEmail.value !== "") {
        // Using APPLY
        if (validateEmail(folEmail.value)) {
            requestInfo.apply("", [folName.value, folEmail.value]);
            folName.value = "";
            folEmail.value = "";
            displayRequestCount();
        } else alert('Invalid Email!');
    } else alert('Enter either follower Name or Email!');
}

displayProfileName();

let userProfile = new profile(sessionData);
userProfile.displayProfile();

locateButton.addEventListener('click', getMyLocation);
followBtn.addEventListener('click', followUser);
