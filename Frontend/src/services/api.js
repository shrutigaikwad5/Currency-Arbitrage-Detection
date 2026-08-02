import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});


// ===============================
// AUTHENTICATION
// ===============================

export async function login(credentials) {

    try {

        const response = await api.post("/auth/login", credentials);

        return response.data;

    } catch (error) {

        throw new Error(
            error.response?.data?.message ||
            error.response?.data?.error ||
            "Login failed"
        );
    }
}


export async function register(user) {

    try {

        const response = await api.post("/auth/register", user);

        return response.data;

    } catch (error) {

        throw new Error(
            error.response?.data?.message ||
            error.response?.data?.error ||
            "Registration failed"
        );
    }
}


// ===============================
// LOGOUT
// ===============================

export async function logout() {

    try {

        await api.post("/auth/logout");

    } catch (error) {

        console.error("Logout error:", error);

    }
}


// ===============================
// CURRENCY
// ===============================

export async function getCurrencies() {

    const response = await api.get("/currency");

    return response.data;
}


export async function getCurrencyById(id) {

    const response = await api.get(`/currency/${id}`);

    return response.data;
}


export async function createCurrency(currency) {

    const response = await api.post("/currency", currency);

    return response.data;
}


export async function updateCurrency(id, currency) {

    const response = await api.put(
        `/currency/${id}`,
        currency
    );

    return response.data;
}


export async function deleteCurrency(id) {

    const response = await api.delete(
        `/currency/${id}`
    );

    return response.data;
}


export async function fetchCurrencies() {

    const response = await api.post("/currency/fetch");

    return response.data;
}


export default api;