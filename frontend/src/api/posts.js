import getAxiosInstance from './axiosInstance'

const axiosInstance = getAxiosInstance()

const addNewPost = async (newPost) => {
    const res = await axiosInstance.post('/posts', newPost)
    return res
}

const getAllPosts = async () => {
    const res = await axiosInstance.get('/posts')
    return res.data
}

const deletePostById = async (postId) => {
    const res = await axiosInstance.delete(`/posts/${postId}`)
    return res
}

const addTagsToPost = async (postId, tagsId) => {
    const res = await axiosInstance.post(`/posts/addTags/${postId}`, tagsId)
    return res
}

const getPostsByTagId = async (tagId) => {
    const res = await axiosInstance.get(`/posts/tags/${tagId}`)
    return res
}

export default {
    addNewPost,
    getAllPosts,
    deletePostById,
    addTagsToPost,
    getPostsByTagId
}