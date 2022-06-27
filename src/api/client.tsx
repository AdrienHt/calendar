import axios from "axios";

export const httpClient = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 1000,
    headers: {
        "Content-type": "application/json"
    },
});
