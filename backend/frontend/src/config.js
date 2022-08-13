import axios from "axios";

export const axiosInstance  = axios.create({
    baseURL : "https://location-react-js.herokuapp.com/"

})