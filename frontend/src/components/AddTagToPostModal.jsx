import { useState } from 'react'
import { Modal, Box, Stack, Select, Button, OutlinedInput, MenuItem } from '@mui/material' 
import { postService } from '../api/index'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const AddTagToPostModal = ({ open, tags, postId, handleClose}) => {
    const [selectedTagId, setSelectedTagId] = useState()

    const handleSaveTagToPost = async () => {
        console.log(selectedTagId)
        try {
            const res = await postService.addTagToPost(selectedTagId, postId)
            if (res.status >= 200) {
                handleClose()
            }
        } catch(e) {
            console.log(e)
        }
    }
    
    return (
        <Modal 
            open={open} 
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}
            >
            <Stack direction="column">
                <Select
                    value={selectedTagId}
                    onChange={(e) => setSelectedTagId(e.target.value)}
                >
                    {tags.map(tag => {
                        const { tagId, name } = tag
                        return <MenuItem
                            key={tagId}
                            value={tagId}
                        >
                            {name}
                        </MenuItem>
                    })}
                </Select>
                <Button onClick={handleSaveTagToPost} color="secondary">Save</Button>
            </Stack>
            </Box>
        </Modal>
    )
}

export default AddTagToPostModal