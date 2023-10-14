import axios from "axios";

const CsAPI = axios.create({
    baseURL: 'bymykel.github.io/CSGO-API/api/pt-BR'
})

export default CsAPI