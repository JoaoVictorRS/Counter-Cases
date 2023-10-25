import axios from "axios";
import {STEAM_API_KEY} from '@env'

const SteamAPI = axios.create({
    baseURL: 'https://api.steampowered.com',
    params: {
        key: `${STEAM_API_KEY}`,
    }
    
})

export default SteamAPI