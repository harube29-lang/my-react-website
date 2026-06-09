import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Card, CardContent, Typography, TextField, Button, Alert, Stack } from '@mui/material'
import { supabase } from '../utils/supabase'

const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      setError('아이디와 비밀번호를 입력해주세요.')
      return
    }
    setLoading(true)
    setError('')
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (err) {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.')
    } else {
      navigate('/board')
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Card sx={{ width: '100%', maxWidth: 420, p: 2 }}>
        <CardContent>
          <Stack spacing={3} alignItems="center">
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={800} color="primary" sx={{ letterSpacing: -1 }}>
                🍵 ULSAN
              </Typography>
              <Typography variant="h5" fontWeight={700} color="secondary">
                TastePick
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                울산 맛집 & 카페 정보 공유
              </Typography>
            </Box>

            <Typography variant="h6" fontWeight={700} alignSelf="flex-start">
              로그인
            </Typography>

            {error && <Alert severity="error" sx={{ width: '100%' }}>{error}</Alert>}

            <TextField
              label="아이디 (이메일)"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            <TextField
              label="비밀번호"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />

            <Button variant="contained" fullWidth size="large" onClick={handleLogin} disabled={loading}>
              {loading ? '로그인 중...' : '로그인'}
            </Button>

            <Button variant="text" color="secondary" onClick={() => navigate('/signup')}>
              회원가입하러 가기
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}

export default LoginPage
