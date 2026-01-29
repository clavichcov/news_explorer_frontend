import { THIRDPARTYAPI_CONFIG, THIRDPARTYAPI_ENDPOINTS, DEFAULT_HEADERS, ERROR_MESSAGES } from './Constants.js';

export class NewsApi {
    constructor(config) {
        this._baseUrl = config.BASE_URL;
        this._apiKey = config.API_KEY;
        this._source = config.NEWS_SOURCE;
        this._headers = DEFAULT_HEADERS
    }

    _buildUrl(endpoint, params = {}) {
    console.log('window.location.origin:', window.location.origin);
    console.log('BASE_URL:', this._baseUrl);
    
    const url = new URL(`${this._baseUrl}${endpoint}`, window.location.origin);
    console.log('URL completa:', url.toString());
    
    // Agregar otros parámetros
    Object.keys(params).forEach(key => {
        url.searchParams.append(key, params[key]);
        
    });
    url.searchParams.set('apiKey', this._apiKey);
    return url.toString();
  }
    _makeRequest(endpoint, params = {}, method, body = null) {
        const url = this._buildUrl(endpoint, params);
        const options = {
            method,
            headers: this._headers,
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        return fetch(url, options)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error: ${res.status}`);
            });
    }
    searchNews(keyword) {
        const today = new Date();
        const weekAgo = new Date();
        weekAgo.setDate(today.getDate() - 7);
        const formatDate = (date) => date.toISOString().split('T')[0];
        const params = {
            q: keyword,
            from: formatDate(weekAgo),
            to: formatDate(today),
            pageSize: 100,
            language: 'en'
        };
        
        return this._makeRequest('/everything', params, 'GET');
    }

}

export const newsApi = new NewsApi(THIRDPARTYAPI_CONFIG);