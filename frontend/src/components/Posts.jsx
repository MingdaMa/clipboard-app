import SinglePost from './SinglePost'

const Posts = ({ posts }) => {
    return (
        <>
            {
                posts.map(post => {
                    return <SinglePost key={post.postId} post={post}/>
                })
            }
        </>
    )
}

export default Posts