import axiosInstance from "../utils/axiosInstance";
import { CHANGE_PASSWORD_URL, HOST_API_KEY, LOGIN_URL } from '../utils/globalConfig'

export const login = async (username, password) => {
    return axiosInstance.post(`${HOST_API_KEY}${LOGIN_URL}?username=${username}&password=${password}`);
}
export const changePassword = async (username, oldPassword, newPassword) =>{
    return axiosInstance.post(`${HOST_API_KEY}${CHANGE_PASSWORD_URL}?username=${username}&oldPassword=${oldPassword}&newPassword=${newPassword}`)
}