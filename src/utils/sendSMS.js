import axios from 'axios'


const backendUrl = process.env.SMS_URL
const config = axios.create({
    baseURL:backendUrl 
})
config.defaults.headers.common["Content-type"] = "application/json";

export default config;