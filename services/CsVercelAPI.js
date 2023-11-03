import axios from "axios";

//Essa api vai facilitar na hora de buscar os itens das caixas e em espcificar as coisas em geral
const CsVercelAPI = axios.create({
    baseURL: 'https://cs2-api.vercel.app/api/'
})

export default CsVercelAPI