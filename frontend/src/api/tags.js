const url = 'http://localhost:8080/api/tags'
import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: url,
    withCredentials: false
})

const addNewTag = async (newTag) => {
    const res = await axiosInstance.post('', { name: newTag })
    return res
}

const getAllTags = async () => {
    const res = await axiosInstance.get('')
    return res.data
}

const deleteTagById = async (tagId) => {
    const res = await axiosInstance.delete(`/${tagId}`)
    return res
}

export default {
    addNewTag,
    getAllTags,
    deleteTagById
}