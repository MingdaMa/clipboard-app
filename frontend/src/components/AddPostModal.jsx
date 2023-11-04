import { useState } from 'react'
import { Modal, Box, Stack, TextField, Button } from '@mui/material' 
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

const AddPostModal = ({ isAddPostModalOpen, handleClosePostModal, setIsPostAdded }) => {
    const [link, setLink] = useState('')
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')

    const handleSavePost = async () => {
        try {
            const res = await postService.addNewPost({ title: title, link: link, summary: summary })
            if (res.status >= 200) {
                handleClosePostModal()
                setIsPostAdded(true)
            }
        } catch(e) {
            console.log(e)
        }
        setLink('')
        setTitle('')
        setSummary('')
    }
    
    return (
        <Modal 
            open={isAddPostModalOpen} 
            onClose={handleClosePostModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}
            >
            <Stack direction="column">
                <TextField value={title} onChange={(e) => setTitle(e.target.value)} id="outlined-basic" label="Add title" variant="outlined" />
                <TextField value={link} onChange={(e) => setLink(e.target.value)} id="outlined-basic" label="Add link" variant="outlined"/>
                <TextField value={summary} onChange={(e) => setSummary(e.target.value)} multiline id="outlined-basic" label="Add summary" variant="outlined"/>
                <Button onClick={handleSavePost} color='secondary'>Save</Button>
            </Stack>
            </Box>
        </Modal>
    )
}

export default AddPostModal