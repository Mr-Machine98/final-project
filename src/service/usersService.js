import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/final-app/users`;

const config = () => {
    return {
        headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem('token')
        }
    }
}

export async function findAll() {
    try {
        const response = await axios.get(`${BASE_URL}/all`);
        return response.data;
    } catch (error) {
        console.error(error.response.data);
        throw error;
    }
}

export async function findAllPages(page = 0) {
    try {
        const response = await axios.get(`${BASE_URL}/page/${page}`);
        return response.data;
    } catch (error) {
        console.error(error.response.data);
        throw error;
    }
}

export async function save(user){
    try {
        return await axios.post(`${BASE_URL}`, user, config());  
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function update({username, email, isAdmin}, id) {
    try {
        return await axios.put(`${BASE_URL}/${id}`, {username, email, isAdmin}, config() );
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function remove(id) {
    try {
        await axios.delete(`${BASE_URL}/${id}`, config() );
    } catch (error) {
        console.error(error.response.data);
        throw error;
    }
}