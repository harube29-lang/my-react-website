import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import ContactInfo from './ContactInfo'

const ContactSection = () => {
  return (
    <Box
      id="contact"
      component="section"
      sx={{
        bgcolor: '#F9FAFB',
        py: { xs: 10, sm: 14, md: 18 },
        px: { xs: 3, sm: 5, md: 8 },
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>

        {/* 헤더 */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="caption"
            sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', fontSize: '0.72rem', display: 'block', mb: 1.5 }}
          >
            Contact
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontWeight: 700, color: '#111827', fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' }, lineHeight: 1.2, mb: 2, wordBreak: 'keep-all' }}
          >
            연락하기
          </Typography>
          <Box sx={{ width: 40, height: 3, background: 'linear-gradient(90deg, #FF7A00, #F04438)', borderRadius: 1 }} />
        </Box>

        {/* 연락처 */}
        <Paper
          elevation={0}
          sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, bgcolor: 'transparent' }}
        >
          <ContactInfo />
        </Paper>

      </Box>
    </Box>
  )
}

export default ContactSection
