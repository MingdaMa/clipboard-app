import { useState } from 'react';
import { Stack, IconButton, Tooltip, Box } from '@mui/material';
import Chip from '@mui/material-next/Chip';
import AddIcon from '@mui/icons-material/Add';
import AddTagModal from './AddTagModal'
import { tagService } from '../api/index'

const Tags = ({ tags, setPosts, setIsDeleteTag, setIsTagAdded }) => { 
    const [open, setOpen] = useState(false)
    
    const handleDeleteChip = async (tagId) => {
        try {
            const res = await tagService.deleteTagById(tagId)
            if (res.status >= 200) {
                setIsDeleteTag(true)
            }
        } catch(e) {
            console.log(e)
        }
    }

    const filterPostsByTag = (tagId) => {
        const filteredRes = tags.filter(tag => tag.tagId === tagId)
        setPosts(filteredRes[0].posts)
    }

    const handleOpen = () => setOpen(true)

    const handleClose = () => setOpen(false)

    return (
        <>
            <Stack direction="row" spacing={1} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Tooltip title='Add a new tag'>
                    <IconButton aria-label="delete" color="secondary" onClick={handleOpen}>
                        <AddIcon/>
                    </IconButton>
                </Tooltip>
                {
                    tags.map(tag => {
                        const { tagId, name } = tag
                        return <Chip 
                            key={tagId} 
                            label={name} 
                            onClick={() => filterPostsByTag(tagId)} 
                            onDelete={() => handleDeleteChip(tagId)}
                        ></Chip>
                    })
                }
                {/* <Chip key={tags.length + 1} label='No tags' variant='outlined'></Chip> */}
            </Stack>
            <AddTagModal open={open} handleClose={handleClose} setIsTagAdded={setIsTagAdded}/>
        </>

    )
}

export default Tags