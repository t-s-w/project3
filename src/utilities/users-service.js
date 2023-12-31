import * as usersAPI from './users-api';

export async function signUp(userData) {
    // Delegate the network request code to the users-api.js API module
    // which will ultimately return a JSON Web Token (JWT)
    try {
        const token = await usersAPI.signUp(userData);
        localStorage.setItem('token', token);
        return getUser();
    } catch (err) {
        throw new Error(err.message);
    }
}

export function getToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));

    if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem('token');
        return null;
    }
    return token;
}

export function getUser() {
    const token = getToken();
    // If there's a token, return the user in the payload, otherwise return null
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export async function login(credentials) {
    try {
        const token = await usersAPI.login(credentials);
        localStorage.setItem('token', token);
        return getUser();
    } catch (err) {
        throw new Error(err.message);
    }
}

export function logout() {
    localStorage.removeItem('token');
}

export function checkToken(){
    try {
        return usersAPI.checkToken()
    }
    catch (err) {
        throw new Error(err.message);
    }
}
