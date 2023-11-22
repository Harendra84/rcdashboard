import axiosInstance from "../utils/axiosInstance";
import { HOST_API_KEY, USER_URL } from '../utils/globalConfig'

export const userLists = async () => {
    return axiosInstance.post(`${HOST_API_KEY}${USER_URL}/lists`);
}

export const addUser = async (user) => {
    return axiosInstance.post(`${HOST_API_KEY}${USER_URL}/add`, user);
}

export const updateUser = async (user) => {
    return axiosInstance.post(`${HOST_API_KEY}${USER_URL}/update`, user);
}

export const deleteUser = async (userId) => {
    return axiosInstance.post(`${HOST_API_KEY}${USER_URL}/delete/${userId}`);
}
export const getUserById = async (userId) => {
    return axiosInstance.post(`${HOST_API_KEY}${USER_URL}/getById/${userId}`);
}
