const url = 'http://localhost:8080/api/posts'
import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: url,
    withCredentials: false
})

const addNewPost = async (newPost) => {
    const res = await axiosInstance.post('', newPost)
    return res
}

const getAllPosts = async () => {
    const res = await axiosInstance.get('')
    return res.data
}

const deletePostById = async (postId) => {
    const res = await axiosInstance.delete(`/${postId}`)
    return res
}

const addTagsToPost = async (postId, tagsId) => {
    const res = await axiosInstance.post(`/addTags/${postId}`, tagsId)
    return res
}

const getPostsByTagId = async (tagId) => {
    const res = await axiosInstance.get(`/tags/${tagId}`)
    return res
}

export default {
    addNewPost,
    getAllPosts,
    deletePostById,
    addTagsToPost,
    getPostsByTagId
}