'use strict'

const login = async function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const result = await axios.post(SERVER_URL + '/login', {'username': username, 'password': password});
        if (result.status == 200) {
            // Set cookie then send back to main page
            window.location.href = SERVER_URL + '/';
            return;
        }

    } catch (error) {
        if (error.response.status == 401) {
            document.getElementById('login-error').innerText = "Incorrect Login Information";
            return;
        }

        else {
            document.getElementById('login-error').innerText = "Server Error: Please Try Again Later";
            return;
        }
    }
};