import { Box, ThemeProvider } from '@mui/system';
import { Button } from '@mui/material';

const Login = () => {
    return <Box
        sx={{
        width: 100,
        height: 100,
        borderRadius: 1,
        bgcolor: 'primary.main',
        '&:hover': {
            bgcolor: 'primary.dark',
        },
        }}
    >
        <Button href="https://clipboard-app-backend-16c2583d149e.herokuapp.com//oauth2/authorization/google">Login with Google</Button>
    </Box>
}

export default Login