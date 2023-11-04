import getAxiosInstance from './axiosInstance'

const axiosInstance = getAxiosInstance()

const addNewTag = async (newTag) => {
    const res = await axiosInstance.post('/tags', { name: newTag })
    return res
}

const getAllTags = async () => {
    const res = await axiosInstance.get('/tags')
    return res.data
}

const deleteTagById = async (tagId) => {
    const res = await axiosInstance.delete(`/tags/${tagId}`)
    return res
}

const getTagsByPostId = async (postId) => {
    const res = await axiosInstance.get(`/tags/posts/${postId}`)
    return res
}

export default {
    addNewTag,
    getAllTags,
    deleteTagById,
    getTagsByPostId
}