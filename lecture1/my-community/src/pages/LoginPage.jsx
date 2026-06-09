import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Box, Card, CardContent, Typography, TextField, Button, Alert, Stack, Divider } from '@mui/material'
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
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.')
      return
    }
    setLoading(true)
    setError('')
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (err) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.')
    } else {
      navigate('/board')
    }
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #7C9A6D22 0%, #FAF7F2 50%, #A67C5222 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2
    }}>
      {/* 로고 */}
      <Box
        sx={{ mb: 3, textAlign: 'center', cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        <Typography variant="h4" fontWeight={900} color="primary">🍵 ULSAN</Typography>
        <Typography variant="h5" fontWeight={700} color="secondary">TastePick</Typography>
        <Typography variant="caption" color="text.secondary">울산 맛집 & 카페 커뮤니티</Typography>
      </Box>

      <Card sx={{ width: '100%', maxWidth: 420, borderRadius: 4, p: 1 }}>
        <CardContent>
          <Stack spacing={2.5}>
            <Typography variant="h6" fontWeight={700} textAlign="center">로그인</Typography>

            {signedUp && (
              <Alert severity="success" sx={{ borderRadius: 2 }}>
                회원가입 완료! 이메일 인증 후 로그인해주세요.
              </Alert>
            )}
            {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}

            <TextField
              label="이메일"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <TextField
              label="비밀번호"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleLogin}
              disabled={loading}
              sx={{ py: 1.5, borderRadius: 3, fontSize: '1rem', fontWeight: 700 }}
            >
              {loading ? '로그인 중...' : '로그인'}
            </Button>

            <Divider sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>또는</Divider>

            <Button
              variant="outlined"
              fullWidth
              size="large"
              onClick={() => navigate('/signup')}
              sx={{ py: 1.5, borderRadius: 3, fontWeight: 600 }}
            >
              회원가입하기
            </Button>

            <Button variant="text" size="small" color="inherit" sx={{ color: 'text.secondary' }} onClick={() => navigate('/')}>
              ← 메인으로 돌아가기
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}

export default LoginPage
