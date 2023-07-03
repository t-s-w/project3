import * as usersSvc from './users-service.js'

async function sendRequest(url, method = 'GET', payload = null) {
    // Fetch accepts an options object as the 2nd argument
    // used to include a data payload, set headers, etc. 
    const options = { method };
    if (payload) {
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify(payload);
    }
    const token = usersSvc.getToken();
    if(token) {
        options.headers = options.headers || {};
        options.headers.Authorization = `Bearer ${token}`
    }

    const res = await fetch(url, options);
    // res.ok will be false if the status code set to 4xx in the controller action
    if (res.ok) {
        return res.json();
    } else {
        const error = await res.json()
        throw new Error(error.message);
    }
    
  }


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