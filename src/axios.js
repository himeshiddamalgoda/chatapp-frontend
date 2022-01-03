import axios from 'axios'

const instance = axios.create({
    baseURL:"https://whatsapp-backend-w.herokuapp.com",
});

export default instance
