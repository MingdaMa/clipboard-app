import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions, IconButton, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { postService } from '../api/index'

const Post = ({ post, deletePost }) => {

    return (
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
                {/* <Typography variant="body2" color="text.secondary">
                    {post.summary}
                </Typography> */}
            </CardContent>
            </CardActionArea>
            <CardActions>
                <Button href={post.link} target="_blank" size="small" color="secondary">
                    Open
                </Button>
                <IconButton onClick={() => deletePost(post.postId)}>
                    <DeleteIcon/>
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Post