import { API_CONFIG } from './Constants.js';

export const BASE_URL = API_CONFIG.baseUrl;

export const authorize = (email, password) => {
    console.log('Intentando login con:', { email, password });
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
    .then(async (res) => {
      const data = await res.json().catch(() => ({}));
      
      if (!res.ok) {
        const error = new Error(data.message || `Error: ${res.status}`);
        error.status = res.status;
        error.data = data;
        throw error;
      }
      return data;
    });
};

export const saveArticle = (urlToImage, title, description, source, publishedAt, keyword) => {
    return fetch(`${BASE_URL}/articles`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ urlToImage, title, description, source, publishedAt, keyword }),

    })
        .then((res) => {
            return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
        });
};