import axios from "axios";

const publicAxios = axios.create({
    baseURL: 'https://bistro-boss-server-side-five.vercel.app',
})

const usePublicAxios = () => {
    return publicAxios
};

export default usePublicAxios;