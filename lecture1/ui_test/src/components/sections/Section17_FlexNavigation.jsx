import { Box, Typography, Divider } from '@mui/material'

const menuItems = ['홈', '소개', '상품', '연락처', '설정']

const Section17_FlexNavigation = () => {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h3" sx={{ mb: 1 }}>
        17. Flex Navigation
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Flexbox — 로고(왼쪽) + 메뉴(오른쪽) 양 끝 정렬, 호버 시 흰색 전환
      </Typography>

      {/* 네비게이션 박스 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: '60px',
          bgcolor: '#2d3748',
          px: 3,
          borderRadius: 1,
          boxSizing: 'border-box',
        }}
      >
        {/* 로고 박스 */}
        <Box>
          <Typography
            sx={{
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '20px',
              letterSpacing: '0.02em',
            }}
          >
            MyWebsite
          </Typography>
        </Box>

        {/* 메뉴 박스 */}
        <Box sx={{ display: 'flex', gap: '15px' }}>
          {menuItems.map((item) => (
            <Typography
              key={item}
              sx={{
                color: '#a0aec0',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'color 0.2s',
                '&:hover': {
                  color: '#ffffff',
                },
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>
      </Box>

      <Divider sx={{ mt: 4 }} />
    </Box>
  )
}

export default Section17_FlexNavigation
