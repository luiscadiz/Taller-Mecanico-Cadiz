import { Box, CircularProgress, Container } from "@mui/material"


export const CheckingAuth = () => {
    return (

        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <CircularProgress color="warning"/>
            </Box>
        </Container>
    )
}
