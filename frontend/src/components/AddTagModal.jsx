import { useState } from 'react'
import { Modal, Box, Stack, TextField, Button } from '@mui/material' 
import { tagService } from '../api/index'

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

const AddTagModal = ({ open, handleClose, setIsTagAdded }) => {
    const [tagName, setTagName] = useState('')

    const handleSaveTag = async () => {
        try {
            const res = await tagService.addNewTag(tagName)
            if (res.status >= 200) {
                handleClose()
                setIsTagAdded(true)
            }
        } catch(e) {
            console.log(e)
        }
        setTagName('')
    }
    
    return (
        <Modal 
            open={open} 
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}
            >
            <Stack direction="row">
                <TextField value={tagName} onChange={(e) => setTagName(e.target.value)} id="outlined-basic" label="Add a new tag" variant="outlined" />
                <Button onClick={handleSaveTag}>Save</Button>
            </Stack>
            </Box>
        </Modal>
    )
}

export default AddTagModal