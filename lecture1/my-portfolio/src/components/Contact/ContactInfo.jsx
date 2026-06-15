import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import InstagramIcon from '@mui/icons-material/Instagram'

const ContactInfo = () => (
  <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap' }}>

    {/* 이메일 */}
    <Box
      component="a"
      href="mailto:harube29@naver.com"
      sx={{
        flex: '1 1 220px',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        bgcolor: '#FFFFFF',
        border: '1.5px solid #FFD9B3',
        borderRadius: '16px',
        px: 3,
        py: 2.5,
        color: '#111827',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 8px 24px rgba(255,122,0,0.12)',
          borderColor: '#FF7A00',
        },
      }}
    >
      <Box
        sx={{
          width: 44, height: 44, borderRadius: '12px',
          bgcolor: '#FFF4EB',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}
      >
        <EmailRoundedIcon sx={{ fontSize: 22, color: '#FF7A00' }} />
      </Box>
      <Box>
        <Typography sx={{ fontSize: '0.68rem', color: '#9CA3AF', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, mb: 0.3 }}>
          이메일
        </Typography>
        <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#111827' }}>
          harube29@naver.com
        </Typography>
      </Box>
    </Box>

    {/* 인스타그램 */}
    <Box
      component="a"
      href="https://www.instagram.com/"
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        flex: '0 1 auto',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        bgcolor: '#FFFFFF',
        border: '1.5px solid #E5E7EB',
        borderRadius: '16px',
        px: 3,
        py: 2.5,
        color: '#111827',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          borderColor: '#DD2A7B',
        },
      }}
    >
      <Box
        sx={{
          width: 44, height: 44, borderRadius: '12px',
          bgcolor: '#FDF2F8',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <InstagramIcon sx={{ fontSize: 22, color: '#DD2A7B' }} />
      </Box>
      <Box>
        <Typography sx={{ fontSize: '0.68rem', color: '#9CA3AF', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, mb: 0.3 }}>
          SNS
        </Typography>
        <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#111827' }}>
          Instagram
        </Typography>
      </Box>
    </Box>

  </Box>
)

export default ContactInfo
