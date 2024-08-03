import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

export async function loginUser({ username, password }) {
    try {
        const response = await axios.post(`${BASE_URL}/login`, { username, password });
        return response.data;
    } catch (error) {
        console.error(error.response.data);
        throw error;
    }
}