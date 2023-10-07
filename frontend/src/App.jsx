import { useState, useEffect } from 'react'
import './App.css'
import { tagService, postService } from './api/index'
import Tags from './components/Tags'
import Posts from './components/Posts'
import AddPostModal from './components/AddPostModal'
import { IconButton, Tooltip, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';


const App = () => {
  const [tags, setTags] = useState([])
  const [posts, setPosts] = useState([])
  const [postsWithTag, setPostsWithTag] = useState([])
  const [isDeleteTag, setIsDeleteTag] = useState(false)
  const [isTagAdded, setIsTagAdded] = useState(false)
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false)
  const [isPostAdded, setIsPostAdded] = useState(false)
  const [isPostDeleted, setIsPostDeleted] = useState(false)

  const getAllTags = async () => {
    const tagList = await tagService.getAllTags()
    console.log(tagList)
    setTags(tagList)
  }

  const getAllPosts = async () => {
    const postList = await postService.getAllPosts()
    setPosts(postList)
  }

  const deletePost = async (postId) => {
    try {
        const res = await postService.deletePostById(postId)
        if (res.status >= 200) {
            setIsPostDeleted(true)
        }
    } catch(e) {
        console.log(e)
    }
}

  const handleClosePostModal = () => setIsAddPostModalOpen(false)

  const handleOpenPostModal = () => setIsAddPostModalOpen(true)

  useEffect(() => {
    getAllTags()
    getAllPosts()
  }, [isDeleteTag, isTagAdded, isPostAdded, isPostDeleted])

  return (
    <>
      <Tags tags={tags} setIsDeleteTag={setIsDeleteTag} setIsTagAdded={setIsTagAdded}/>
      <Tooltip title='Add a new post'>
        <Fab aria-label="delete" color="secondary" onClick={handleOpenPostModal}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Posts posts={posts} tags={tags} deletePost={deletePost}/>
      <AddPostModal isAddPostModalOpen={isAddPostModalOpen} handleClosePostModal={handleClosePostModal} setIsPostAdded={setIsPostAdded}/>
    </>
  )
}

export default App
