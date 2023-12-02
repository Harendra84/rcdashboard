import axiosInstance from "@/utils/axiosInstance"
import { HOST_API_KEY, PUBLICATIONS_URL } from "@/utils/globalConfig"

export const publicationsLists = async () => {
    return axiosInstance.post(`${HOST_API_KEY}${PUBLICATIONS_URL}/lists`)
}

export const addPublications = async (publications) => {
    return axiosInstance.post(`${HOST_API_KEY}${PUBLICATIONS_URL}/add`, publications);
}

export const updatePublications = async (publications) => {
    return axiosInstance.post(`${HOST_API_KEY}${PUBLICATIONS_URL}/update`, publications);
}

export const deletePublications = async (publicationsId) => {
    return axiosInstance.post(`${HOST_API_KEY}${PUBLICATIONS_URL}/delete/${publicationsId}`);
}
export const getByPublicationsId = async (publicationsId) => {
    return axiosInstance.post(`${HOST_API_KEY}${PUBLICATIONS_URL}/getById/${publicationsId}`);
}