import axios from "axios";


const secureAxios = axios.create({
    baseURL: 'http://localhost:5000',
})

const useAxiosSecure = () => {
    secureAxios.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`
        return config;
      }, function (error) {
        
        return Promise.reject(error);
      });
      //    response object
      axios.interceptors.response.use(function (response) {
        return response;
      }, function (error) {
        console.log('status code error: ' + error);
        return Promise.reject(error);
      });

    return secureAxios 
};

export default useAxiosSecure;