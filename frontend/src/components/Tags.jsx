import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

const Tags = ({ tags }) => {
    const handleClickOnChip = (tagId) => {
        console.log(`${tagId} is clicked`)
    }
    
    const handleDeleteChip = (tagId) => {
        console.log(`${tagId} deleted`)
    }

    return <Stack direction="row" spacing={1}>
        {
          tags.map(tag => {
            const { tagId, name } = tag
            return <Chip 
              key={tagId} 
              label={name} 
              onClick={(tagId) => handleClickOnChip(tagId)} 
              onDelete={(tagId) => handleDeleteChip(tagId)}></Chip>
          })
        }
        <Chip key={tags.length + 1} label='No tags' variant='outlined'></Chip>
    </Stack>
}

export default Tags