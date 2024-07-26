import { Avatar, Box, Container, Typography } from "@mui/material"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export const AuthLayout = ({ children, title = '' }) => {
  return (
    <Container component="main" maxWidth="xs" >
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        {children}
      </Box>
    </Container>
  )
}
