import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions, IconButton, Box, Typography,Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { postService, tagService } from '../api/index'
import AddTagToPostModal from './AddTagToPostModal'

const Post = ({ tags, post, deletePost}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [tagsForPost, setTagsForPost] = useState([])

    const handleClose = () => setIsModalOpen(false)

    const getTagForPost = async () => {
        try {
            const res = await tagService.getTagsByPostId(post.id)
            console.log(res.data)
            setTagsForPost(res.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getTagForPost()
    }, [])

    return (
        <>
            <Card sx={{ maxWidth: 230, maxHeight: 200 }}>
                <CardActionArea>
                {/* <CardMedia
                    component="img"
                    height="140"
                    image="/static/images/cards/contemplative-reptile.jpg"
                    alt="green iguana"
                /> */}
                <CardContent>
                    <Typography gutterBottom variant="body1" component="div">
                        {post.title}
                    </Typography>
                    {
                        tagsForPost.length > 0 && tagsForPost.map(t => {
                            const { id, name } = t
                            return <Chip key={id} label={name}></Chip>
                        })
                    }
                </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button href={post.link} target="_blank" size="small" color="secondary">
                        Open
                    </Button>
                    <Button size="small" color="secondary" onClick={() => setIsModalOpen(true)}>
                        Add Tag
                    </Button>
                    <IconButton onClick={() => deletePost(post.postId)}>
                        <DeleteIcon/>
                    </IconButton>
                </CardActions>
            </Card>
            <AddTagToPostModal tags={tags} tagsForPost={tagsForPost} open={isModalOpen} handleClose={handleClose} postId={post.id}/>
        </>
    )
}

export default Post