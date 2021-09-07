// Using EXPORT
export default function getFirstLetter(n) {
    return n.slice(0, 1);
};

export function validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
    }
    return false;
}



        // axios.get(`https://jsonplaceholder.typicode.com/users?email=${email}`).then(response => {          
        //     let userResponse = response.data[0];
        //     console.log(userResponse.name);
        //     // Using OBJECT.ASSIGN
        //     Object.assign(userDeets, {
        //         'id': userResponse.id,
        //         'name': userResponse.name,
        //         'email': `${email}`,
        //         'address': {
        //             'city': `${userResponse.address.city}`,
        //             'zipcode': `${userResponse.address.zipcode}`,
        //             'geo': {
        //                 'lat': `${userResponse.address.geo.lat}`,
        //                 'lng': `${userResponse.address.geo.lng}`
        //             }
        //         },
        //         'phone': `${userResponse.phone}`
        //     })
        //     let userData = JSON.stringify(userDeets);
        //     // console.log(user_data);
        //     sessionStorage.setItem('user-data', userData);
        // }
        // ).catch(error => {
        //     console.log(error);
        //     alert(error);
        // });