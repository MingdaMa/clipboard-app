import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const Post = ({ post }) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
            {/* <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
            /> */}
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {post.summary}
                </Typography>
            </CardContent>
            </CardActionArea>
            <CardActions>
            <Button size="small" color="primary">
                Open
            </Button>
            </CardActions>
        </Card>
    )
}

export default Post