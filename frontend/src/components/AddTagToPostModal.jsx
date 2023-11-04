import { useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles';
import { Modal, Box, Chip, Stack, Select, Button, OutlinedInput, MenuItem } from '@mui/material' 
import { postService } from '../api/index'
import { difference } from 'lodash'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

function getStyles(name, tagLabel, theme) {
    return {
      fontWeight:
        tagLabel.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

const AddTagToPostModal = ({ open, tags, tagsForPost, postId, handleClose}) => {
    const theme = useTheme()
    const [tagsArr, setTagsArr] = useState([])
    const [newTags, setNewTags] = useState([])

    const transformTagsArr = (tagsToBeTransformed) => {
        const newTagsArr =  tagsToBeTransformed.map(t => {
            return {id: t.id, name: t.name}
        })
        setTagsArr(newTagsArr)
    }

    const handleSaveTagToPost = async () => {
        try {
            const tagsId = newTags.reduce((tagArr, curr) => [...tagArr, curr.id], [])
            const res = await postService.addTagsToPost(postId, tagsId)
            if (res.status >= 200) {
                handleClose()
            }
        } catch(e) {
            console.log(e)
        }
    }

    const handleTagSelectionChange = (e) => {
        setNewTags(difference(e.target.value, tagsArr))
        setTagsArr(e.target.value)
    }

    useEffect(() => {
        transformTagsArr(tagsForPost)
    }, [tagsForPost])
    
    return (
        <Modal 
            open={open} 
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
            <Stack direction="column">
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={tagsArr}
                    onChange={handleTagSelectionChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selectedTags) => {
                        return <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selectedTags.map((t) => (
                            <Chip key={t.id} label={t.name} onDelete={(tagToDelete) => console.log(tagToDelete)}/>
                        ))}
                    </Box>
                    }}
                    MenuProps={MenuProps}
                >
                        {tags.map(tag => {
                            const { id, name } = tag
                            return <MenuItem
                                key={id}
                                value={{id, name}}
                                style={getStyles(id, name, theme)}
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