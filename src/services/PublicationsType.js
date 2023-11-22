import axiosInstance from "@/utils/axiosInstance"
import {HOST_API_KEY, PUBLICATIONS_TYPE_URL} from "@/utils/globalConfig"

export const publicationsTypeLists = async () => {
    return axiosInstance.post(`${HOST_API_KEY}${PUBLICATIONS_TYPE_URL}/lists`)
}

export const addPublicationsType = async (PublicationsType) => {
    return axiosInstance.post(`${HOST_API_KEY}${PUBLICATIONS_TYPE_URL}/add`, PublicationsType)
}

export const updatePublicationsType = async (PublicationsType) => {
    return axiosInstance.post(`${HOST_API_KEY}${PUBLICATIONS_TYPE_URL}/update`, PublicationsType)
}

export const deletePublicationsType = async (publicationsTypeId) => {
    return axiosInstance.post(`${HOST_API_KEY}${PUBLICATIONS_TYPE_URL}/delete/${publicationsTypeId}`)
}

export const getByPublicationsTypeId = async (publicationsTypeId) => {
    return axiosInstance.post(`${HOST_API_KEY}${PUBLICATIONS_TYPE_URL}/getById/${publicationsTypeId}`)
}