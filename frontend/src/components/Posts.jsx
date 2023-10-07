import SinglePost from './SinglePost'
import './Posts.css'

const Posts = ({ posts, deletePost }) => {
    return (
        <div className='posts'>
            {
                posts.map(post => {
                    return <SinglePost deletePost={deletePost} className='post' sx={{ maxHeight: 100, marginBottom: 10 }} key={post.postId} post={post}/>
                })
            }
        </div>
    )
}

export default Posts