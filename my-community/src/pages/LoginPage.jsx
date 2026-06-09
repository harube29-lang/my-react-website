import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Box, Button, TextField, Typography, Paper, Alert, InputAdornment, IconButton } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import LocalCafeIcon from '@mui/icons-material/LocalCafe'
import { supabase } from '../supabase'

const LoginPage = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!username || !password) { setError('아이디와 비밀번호를 입력해주세요.'); return }
    setLoading(true)
    setError('')
    const email = `${username}@tastepick.local`
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.')
    } else {
      navigate('/')
    }
    setLoading(false)
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Paper elevation={0} sx={{ width: '100%', maxWidth: 420, p: 5, border: '1px solid #E8E0D5', borderRadius: 3 }}>
        {/* 로고 */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Box sx={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'linear-gradient(135deg, #7C9A6D 0%, #A67C52 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <LocalCafeIcon sx={{ color: 'white', fontSize: 30 }} />
            </Box>
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#7C9A6D', letterSpacing: '-0.5px' }}>
            ULSAN TastePick
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            울산 맛집 & 카페 정보 공유
          </Typography>
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>로그인</Typography>

        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="아이디" fullWidth value={username}
            onChange={(e) => setUsername(e.target.value.trim())}
            placeholder="아이디를 입력하세요"
          />
          <TextField
            label="비밀번호" fullWidth value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPw ? 'text' : 'password'}
            placeholder="비밀번호를 입력하세요"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPw(!showPw)} edge="end">
                    {showPw ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button
            type="submit" variant="contained" fullWidth size="large"
            disabled={loading}
            sx={{ mt: 1, py: 1.5, bgcolor: '#7C9A6D', '&:hover': { bgcolor: '#6A8A5C' } }}
          >
            {loading ? '로그인 중...' : '로그인'}
          </Button>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            아직 계정이 없으신가요?{' '}
            <Link to="/register" style={{ color: '#7C9A6D', fontWeight: 600 }}>
              회원가입하러가기
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}

export default LoginPage
