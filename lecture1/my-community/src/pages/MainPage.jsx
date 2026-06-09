import { useNavigate } from 'react-router-dom'
import {
  Box, Typography, Button, Stack, Grid, Card, CardContent, Chip, Container
} from '@mui/material'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import LocalCafeIcon from '@mui/icons-material/LocalCafe'
import FavoriteIcon from '@mui/icons-material/Favorite'
import GroupIcon from '@mui/icons-material/Group'
import StarIcon from '@mui/icons-material/Star'
import LocationOnIcon from '@mui/icons-material/LocationOn'

const features = [
  { icon: <RestaurantIcon sx={{ fontSize: 36, color: '#7C9A6D' }} />, title: '맛집 공유', desc: '울산 곳곳의 숨은 맛집을 발견하고 공유하세요' },
  { icon: <LocalCafeIcon sx={{ fontSize: 36, color: '#A67C52' }} />, title: '카페 탐방', desc: '감성 카페부터 로컬 브런치까지 모든 정보가 한 곳에' },
  { icon: <FavoriteIcon sx={{ fontSize: 36, color: '#e57373' }} />, title: '좋아요 & 팔로우', desc: '마음에 드는 게시물에 하트를, 취향 맞는 유저를 팔로우' },
  { icon: <LocationOnIcon sx={{ fontSize: 36, color: '#E9C46A' }} />, title: '지역별 탐색', desc: '동구, 중구, 남구, 울주군, 북구 지역별로 한눈에 확인' },
]

const DISTRICTS = ['동구', '중구', '남구', '울주군', '북구']

const MainPage = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>

      {/* 헤더 */}
      <Box sx={{ px: 3, py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', bgcolor: '#fff' }}>
        <Typography variant="h6" fontWeight={800} color="primary" sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          🍵 ULSAN TastePick
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" color="primary" onClick={() => navigate('/login')}>로그인</Button>
          <Button variant="contained" color="primary" onClick={() => navigate('/signup')}>회원가입</Button>
        </Stack>
      </Box>

      {/* 히어로 섹션 */}
      <Box sx={{
        background: 'linear-gradient(135deg, #7C9A6D 0%, #5a7a52 50%, #A67C52 100%)',
        color: '#fff',
        py: { xs: 8, md: 12 },
        px: 3,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.07, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <Container maxWidth="md" sx={{ position: 'relative' }}>
          <Chip label="🌿 울산 No.1 맛집 커뮤니티" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff', mb: 3, fontWeight: 600 }} />
          <Typography variant="h2" fontWeight={900} sx={{ fontSize: { xs: '2.2rem', md: '3.5rem' }, lineHeight: 1.2, mb: 2 }}>
            울산의 맛을<br />함께 발견해요
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 4, fontWeight: 400, maxWidth: 500, mx: 'auto' }}>
            동구, 중구, 남구, 울주군, 북구<br />울산 전역의 맛집과 카페 정보를 공유하는 공간
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/signup')}
              sx={{ bgcolor: '#fff', color: '#7C9A6D', fontWeight: 700, px: 4, py: 1.5, '&:hover': { bgcolor: '#f5f5f5' }, borderRadius: 3 }}
            >
              무료로 시작하기 →
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/login')}
              sx={{ borderColor: '#fff', color: '#fff', fontWeight: 600, px: 4, py: 1.5, '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)' }, borderRadius: 3 }}
            >
              로그인
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* 지역 배지 */}
      <Box sx={{ bgcolor: '#fff', py: 3, borderBottom: '1px solid #eee' }}>
        <Container maxWidth="md">
          <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
            {DISTRICTS.map((d) => (
              <Chip key={d} label={`📍 ${d}`} variant="outlined" color="primary" sx={{ m: 0.5, fontWeight: 600 }} />
            ))}
          </Stack>
        </Container>
      </Box>

      {/* 기능 소개 */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h4" fontWeight={800} textAlign="center" mb={1}>
          왜 ULSAN TastePick인가요?
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center" mb={6}>
          울산 사람들이 만든, 울산을 위한 맛집 커뮤니티
        </Typography>
        <Grid container spacing={3}>
          {features.map((f, i) => (
            <Grid item xs={12} sm={6} key={i}>
              <Card sx={{ height: '100%', p: 1, border: '1px solid #f0ece6', '&:hover': { boxShadow: '0 8px 24px rgba(124,154,109,0.15)', transform: 'translateY(-2px)', transition: 'all 0.2s' } }}>
                <CardContent>
                  <Box mb={1.5}>{f.icon}</Box>
                  <Typography variant="h6" fontWeight={700} mb={0.5}>{f.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{f.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 통계 섹션 */}
      <Box sx={{ bgcolor: '#FAF7F2', py: 6, borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
        <Container maxWidth="md">
          <Grid container spacing={4} justifyContent="center" textAlign="center">
            {[
              { icon: <GroupIcon sx={{ color: '#7C9A6D', fontSize: 32 }} />, value: '지금 바로', label: '가입하고' },
              { icon: <RestaurantIcon sx={{ color: '#A67C52', fontSize: 32 }} />, value: '울산 맛집', label: '정보 공유' },
              { icon: <StarIcon sx={{ color: '#E9C46A', fontSize: 32 }} />, value: '5개 구역', label: '지역 커버' },
            ].map((s, i) => (
              <Grid item xs={4} key={i}>
                <Box mb={1}>{s.icon}</Box>
                <Typography variant="h5" fontWeight={800} color="primary">{s.value}</Typography>
                <Typography variant="body2" color="text.secondary">{s.label}</Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA 섹션 */}
      <Box sx={{ py: 10, textAlign: 'center', bgcolor: '#fff' }}>
        <Container maxWidth="sm">
          <Typography variant="h4" fontWeight={800} mb={2}>지금 바로 시작해보세요</Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            울산의 맛있는 이야기를 함께 나눠요 🍽️
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/signup')}
            sx={{ px: 6, py: 1.8, fontSize: '1.1rem', borderRadius: 3 }}
          >
            무료 회원가입
          </Button>
        </Container>
      </Box>

      {/* 푸터 */}
      <Box sx={{ bgcolor: '#333', color: '#aaa', py: 3, textAlign: 'center' }}>
        <Typography variant="body2">© 2025 ULSAN TastePick · 울산 맛집 & 카페 커뮤니티</Typography>
      </Box>
    </Box>
  )
}

export default MainPage
