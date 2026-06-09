import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Box, Card, CardContent, Typography, TextField,
  Button, Alert, Stack, Divider, Chip, IconButton
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import LocalCafeIcon from '@mui/icons-material/LocalCafe'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { supabase } from '../utils/supabase'

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const signedUp = location.state?.signedUp

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) { setError('이메일과 비밀번호를 입력해주세요.'); return }
    setLoading(true)
    setError('')
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (err) setError('이메일 또는 비밀번호가 올바르지 않습니다.')
    else navigate('/')
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex' }}>
      {/* 왼쪽 브랜딩 */}
      <Box sx={{
        display: { xs: 'none', md: 'flex' },
        flex: 1,
        background: 'linear-gradient(160deg, #7C9A6D 0%, #5a7a52 40%, #A67C52 100%)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 6,
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Box sx={{ position: 'absolute', inset: 0, opacity: 0.08, backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }} />
        <Box sx={{ position: 'relative', textAlign: 'center' }}>
          <Typography sx={{ fontSize: '4rem', mb: 1 }}>🍵</Typography>
          <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: -1, mb: 0.5 }}>ULSAN</Typography>
          <Typography variant="h4" fontWeight={700} sx={{ color: '#E9C46A', mb: 3 }}>TastePick</Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mb: 4, lineHeight: 1.8 }}>
            울산 맛집 & 카페<br />정보 공유 커뮤니티
          </Typography>
          <Stack spacing={1.5} alignItems="flex-start">
            {[
              { icon: <RestaurantIcon sx={{ fontSize: 18 }} />, text: '울산 숨은 맛집 발견' },
              { icon: <LocalCafeIcon sx={{ fontSize: 18 }} />, text: '감성 카페 정보 공유' },
              { icon: <LocationOnIcon sx={{ fontSize: 18 }} />, text: '동구 · 중구 · 남구 · 울주군 · 북구' },
            ].map((item, i) => (
              <Stack key={i} direction="row" alignItems="center" spacing={1} sx={{ opacity: 0.9 }}>
                {item.icon}
                <Typography variant="body2">{item.text}</Typography>
              </Stack>
            ))}
          </Stack>
          <Stack direction="row" spacing={1} mt={4} flexWrap="wrap" justifyContent="center">
            {['동구', '중구', '남구', '울주군', '북구'].map(d => (
              <Chip key={d} label={d} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff', fontWeight: 600 }} />
            ))}
          </Stack>
        </Box>
      </Box>

      {/* 오른쪽 폼 */}
      <Box sx={{
        flex: { xs: 1, md: '0 0 440px' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: { xs: 3, md: 5 },
        bgcolor: '#FAF7F2',
      }}>
        <Box sx={{ width: '100%', maxWidth: 360 }}>
          {/* 뒤로가기 */}
          <Stack direction="row" alignItems="center" mb={3}>
            <IconButton size="small" onClick={() => navigate('/')} sx={{ mr: 1 }}>
              <ArrowBackIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2" color="text.secondary">게시판으로 돌아가기</Typography>
          </Stack>

          {/* 모바일 로고 */}
          <Box sx={{ display: { xs: 'block', md: 'none' }, textAlign: 'center', mb: 3 }}>
            <Typography variant="h5" fontWeight={900} color="primary">🍵 ULSAN TastePick</Typography>
          </Box>

          <Typography variant="h5" fontWeight={800} mb={0.5}>로그인</Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            로그인하고 맛집 정보를 공유해요
          </Typography>

          {signedUp && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>가입 완료! 이제 로그인하세요 🎉</Alert>}
          {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

          <Stack spacing={2}>
            <TextField label="아이디 (이메일)" type="email" fullWidth value={email}
              onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
            <TextField label="비밀번호" type="password" fullWidth value={password}
              onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
            <Button variant="contained" fullWidth size="large" onClick={handleLogin} disabled={loading}
              sx={{ py: 1.5, borderRadius: 3, fontWeight: 700, fontSize: '1rem' }}>
              {loading ? '로그인 중...' : '로그인'}
            </Button>
            <Divider sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>또는</Divider>
            <Button variant="outlined" fullWidth size="large" onClick={() => navigate('/signup')}
              sx={{ py: 1.5, borderRadius: 3, fontWeight: 600 }}>
              회원가입하러 가기
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

export default LoginPage
