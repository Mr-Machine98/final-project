import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/final-app`;

const config = () => {
    return {
        headers: {
            "Content-Type": "application/json"
        }
    }
}

export async function getItems() {
    try {
        const response = await axios.get(`${BASE_URL}/all`);
        return response.data;
    } catch (error) {
        console.error(error.response.data);
        throw error;
    }
}

export async function addSales(sales) {
    try {
        return axios.post(`${BASE_URL}/addsales`, sales, config());
    } catch (error) {
        throw error;
    }
}