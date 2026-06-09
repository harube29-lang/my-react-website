import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: { main: '#7C9A6D' },
    secondary: { main: '#A67C52' },
    background: { default: '#FAF7F2', paper: '#ffffff' },
    text: { primary: '#333333' },
  },
  typography: {
    fontFamily: '"Noto Sans KR", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.125rem', fontWeight: 500 },
    h2: { fontSize: '1.5rem', fontWeight: 500 },
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 20, textTransform: 'none', fontWeight: 600 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' },
      },
    },
  },
})

export default theme
