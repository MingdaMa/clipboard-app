import { useState, useEffect } from 'react'
import './App.css'
import { tagService, postService } from './api/index'
import Tags from './components/Tags'
import Posts from './components/Posts'


const App = () => {
  const [tags, setTags] = useState([])
  const [posts, setPosts] = useState([])

  const getAllTags = async () => {
    const tagList = await tagService.getAllTags()
    setTags(tagList)
  }

  const getAllPosts = async () => {
    const postList = await postService.getAllPosts()
    console.log(postList)
    setPosts(postList)
  }

  useEffect(() => {
    getAllTags()
    getAllPosts()
  }, [])

  return (
    <>
      <Tags tags={tags} />
      <Posts posts={posts} />
    </>
  )
}

export default App
