import { API_CONFIG } from './Constants.js';

export const BASE_URL = API_CONFIG.baseUrl;

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => {
            return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
        });
};
export const register = (email, password, name) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),

    })
        .then((res) => {
            return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
        });
};