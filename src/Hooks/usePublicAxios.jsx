import axios from "axios";

const publicAxios = axios.create({
    baseURL:'https://inventory-shop-management.vercel.app',
    // baseURL: 'http://localhost:5000'
})

const usePublicAxios = () => {
    return publicAxios
};

export default usePublicAxios;