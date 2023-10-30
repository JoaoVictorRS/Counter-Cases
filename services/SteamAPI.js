import axios from "axios";

const SteamAPI = axios.create({
    baseURL: 'http://localhost:3000',
    params: {
        idUser: ''//Aqui a gente precisa puxar o id da pessoa que ela colocou no login
    }
})

export default SteamAPI