import { createTheme } from '@mui/material/styles'

// 커스텀 컬러 팔레트
// color1: #ecb55d (골드 앰버)
// color2: #eae150 (옐로우)
// color3: #2e0e07 (다크 브라운)
// color4: #877770 (웜 그레이/토프)
// color5: #f3eae8 (크림/라이트 핑크)

const theme = createTheme({
  palette: {
    primary: {
      main: '#2e0e07',
      light: '#5a2e1a',
      dark: '#1a0804',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ecb55d',
      light: '#f2c97e',
      dark: '#c9883a',
      contrastText: '#2e0e07',
    },
    warning: {
      main: '#eae150',
      contrastText: '#2e0e07',
    },
    error:   { main: '#c0392b' },
    success: { main: '#2d6a4f' },
    background: {
      default: '#f3eae8',
      paper: '#ffffff',
    },
    text: {
      primary: '#2e0e07',
      secondary: '#877770',
      disabled: '#c4b8b5',
    },
    divider: '#e8dbd8',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '3rem',    fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1 },
    h2: { fontSize: '2.25rem', fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontSize: '1.125rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' },
    h4: { fontSize: '1.5rem',  fontWeight: 700 },
    h5: { fontSize: '1.25rem', fontWeight: 600 },
    h6: { fontSize: '1rem',    fontWeight: 600 },
    body1: { fontSize: '1rem',    fontWeight: 400, lineHeight: 1.7 },
    body2: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.6 },
    caption: { fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.06em' },
    button: { fontWeight: 600, letterSpacing: '0.05em' },
  },
  shape: { borderRadius: 2 },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          textTransform: 'uppercase',
          fontWeight: 600,
          letterSpacing: '0.08em',
          padding: '10px 28px',
        },
        containedPrimary: {
          backgroundColor: '#2e0e07',
          '&:hover': { backgroundColor: '#5a2e1a' },
        },
        containedSecondary: {
          backgroundColor: '#ecb55d',
          color: '#2e0e07',
          '&:hover': { backgroundColor: '#c9883a' },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: '#e8dbd8' },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 2 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 2, fontWeight: 600, letterSpacing: '0.04em' },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: { backgroundColor: '#2e0e07' },
      },
    },
  },
})

export default theme
