import { Box, Container, Typography } from '@mui/material'
import ButtonSection from './components/sections/ButtonSection'

const App = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
          UI Components Test
        </Typography>

        {/* Section 1: Button */}
        <ButtonSection />

      </Container>
    </Box>
  )
}

export default App
