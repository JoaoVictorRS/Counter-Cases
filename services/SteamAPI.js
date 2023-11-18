import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const SteamAPI = axios.create({
    baseURL: 'http://localhost:3000'
})

export default SteamAPI