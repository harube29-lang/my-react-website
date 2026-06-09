import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Box, Button, TextField, Typography, Paper, Alert,
  InputAdornment, IconButton, Chip, Stack
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import LocalCafeIcon from '@mui/icons-material/LocalCafe'
import { supabase } from '../supabase'

const PwRule = ({ ok, label }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
    {ok
      ? <CheckCircleOutlineIcon sx={{ fontSize: 16, color: '#7C9A6D' }} />
      : <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: '#BBBBBB' }} />}
    <Typography variant="caption" sx={{ color: ok ? '#7C9A6D' : '#BBBBBB' }}>{label}</Typography>
  </Box>
)

const RegisterPage = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '', phone: '' })
  const [showPw, setShowPw] = useState(false)
  const [usernameStatus, setUsernameStatus] = useState(null) // null | 'ok' | 'dup' | 'checking'
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const pwRules = {
    length: form.password.length >= 8,
    letter: /[a-zA-Z]/.test(form.password),
    number: /[0-9]/.test(form.password),
  }
  const pwTyping = form.password.length > 0

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (name === 'username') setUsernameStatus(null)
  }

  const checkUsername = async () => {
    if (!form.username) return
    setUsernameStatus('checking')
    const { data } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', form.username)
      .single()
    setUsernameStatus(data ? 'dup' : 'ok')
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!form.username || !form.password) { setError('필수 항목을 입력해주세요.'); return }
    if (usernameStatus !== 'ok') { setError('아이디 중복확인을 완료해주세요.'); return }
    if (!pwRules.length || !pwRules.letter || !pwRules.number) { setError('비밀번호 규칙을 확인해주세요.'); return }

    setLoading(true)
    setError('')
    const email = `${form.username}@tastepick.local`
    const { error } = await supabase.auth.signUp({
      email,
      password: form.password,
      options: { data: { username: form.username, phone: form.phone } }
    })
    if (error) {
      setError('회원가입에 실패했습니다. 다시 시도해주세요.')
    } else {
      navigate('/')
    }
    setLoading(false)
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Paper elevation={0} sx={{ width: '100%', maxWidth: 440, p: 5, border: '1px solid #E8E0D5', borderRadius: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
            <Box sx={{
              width: 48, height: 48, borderRadius: '50%',
              background: 'linear-gradient(135deg, #7C9A6D 0%, #A67C52 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <LocalCafeIcon sx={{ color: 'white', fontSize: 26 }} />
            </Box>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#7C9A6D' }}>ULSAN TastePick</Typography>
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>회원가입</Typography>

        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleRegister} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* 아이디 */}
          <Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                label="아이디" name="username" fullWidth
                value={form.username} onChange={handleChange}
                placeholder="영문, 숫자 조합"
                error={usernameStatus === 'dup'}
              />
              <Button
                variant="outlined" onClick={checkUsername}
                disabled={!form.username || usernameStatus === 'checking'}
                sx={{ minWidth: 90, borderColor: '#7C9A6D', color: '#7C9A6D', whiteSpace: 'nowrap' }}
              >
                {usernameStatus === 'checking' ? '확인중' : '중복확인'}
              </Button>
            </Box>
            {usernameStatus === 'ok' && (
              <Typography variant="caption" sx={{ color: '#7C9A6D', ml: 1 }}>사용 가능한 아이디입니다.</Typography>
            )}
            {usernameStatus === 'dup' && (
              <Typography variant="caption" sx={{ color: 'error.main', ml: 1 }}>이미 사용 중인 아이디입니다.</Typography>
            )}
          </Box>

          {/* 비밀번호 */}
          <Box>
            <TextField
              label="비밀번호" name="password" fullWidth
              value={form.password} onChange={handleChange}
              type={showPw ? 'text' : 'password'}
              placeholder="8자 이상, 영문+숫자 포함"
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
            <Stack direction="row" spacing={2} sx={{ mt: 1, ml: 1 }}>
              <PwRule ok={pwTyping && pwRules.length} label="8자 이상" />
              <PwRule ok={pwTyping && pwRules.letter} label="영문자 포함" />
              <PwRule ok={pwTyping && pwRules.number} label="숫자 포함" />
            </Stack>
          </Box>

          {/* 전화번호 */}
          <TextField
            label="전화번호" name="phone" fullWidth
            value={form.phone} onChange={handleChange}
            placeholder="010-0000-0000 (선택)"
          />

          <Button
            type="submit" variant="contained" fullWidth size="large"
            disabled={loading}
            sx={{ mt: 1, py: 1.5, bgcolor: '#7C9A6D', '&:hover': { bgcolor: '#6A8A5C' } }}
          >
            {loading ? '가입 중...' : '회원가입'}
          </Button>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            이미 계정이 있으신가요?{' '}
            <Link to="/login" style={{ color: '#7C9A6D', fontWeight: 600 }}>로그인</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}

export default RegisterPage
