'use strict'

class user {
    constructor(userData) {
        this.userData = userData
        // this.userData = Object.assign(userData, {})
    }

    getUserDetails() {
        return this.userData;
    }
}

class profile extends user {
    constructor(userData) {
        super(userData);
    }
    displayProfile() {
        console.log(this.getUserDetails());
    }
}

let userProfile = new profile(sessionStorage.getItem('user-data'));
userProfile.displayProfile();