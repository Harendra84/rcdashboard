import axiosInstance from "@/utils/axiosInstance"
import { HOST_API_KEY, RC_CENTER_URL } from "@/utils/globalConfig"

export const rcCenterLists = async () => {
    return axiosInstance.post(`${HOST_API_KEY}${RC_CENTER_URL}/lists`)
}

export const addRcCenter = async (rcCenter) => {
    return axiosInstance.post(`${HOST_API_KEY}${RC_CENTER_URL}/add`, rcCenter)
}

export const updateRcCenter = async (rcCenter) => {
    return axiosInstance.post(`${HOST_API_KEY}${RC_CENTER_URL}/update`, rcCenter)
}

export const deleteRcCenter = async (rcCenterId) => {
    return axiosInstance.post(`${HOST_API_KEY}${RC_CENTER_URL}/delete/${rcCenterId}`)
}

export const getByRcCenterId = async (rcCenterId) => {
    return axiosInstance.post(`${HOST_API_KEY}${RC_CENTER_URL}/getById/${rcCenterId}`)
}