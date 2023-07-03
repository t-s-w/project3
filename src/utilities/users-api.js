
import sendRequest from './send-request.js'


export function signUp(userData) {
    // Fetch uses an options object as a second arg to make requests
    // other than basic GET requests, include data, headers, etc. 
    return sendRequest('/api/users', 'POST', userData)
}

export function login(credentials) {
    return sendRequest('/api/users/login','POST',credentials)
}

export function checkToken() {
    return sendRequest(`api/users/check-token`);
  }