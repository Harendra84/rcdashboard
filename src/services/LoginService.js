import axiosInstance from "../utils/axiosInstance";
import { HOST_API_KEY, LOGIN_URL } from '../utils/globalConfig'

export const login = async (username, password) => {
    return axiosInstance.post(`${HOST_API_KEY}${LOGIN_URL}?username=${username}&password=${password}`);
}