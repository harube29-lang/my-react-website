import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Card, CardContent, Typography, TextField, Button,
  Alert, Stack, List, ListItem, ListItemIcon, ListItemText
} from '@mui/material'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { supabase } from '../utils/supabase'

const pwRules = [
  { label: '8자 이상', test: (pw) => pw.length >= 8 },
  { label: '영문 대문자 포함', test: (pw) => /[A-Z]/.test(pw) },
  { label: '영문 소문자 포함', test: (pw) => /[a-z]/.test(pw) },
  { label: '숫자 포함', test: (pw) => /[0-9]/.test(pw) },
]

const SignUpPage = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [pwFocused, setPwFocused] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [checkingUsername, setCheckingUsername] = useState(false)
  const [usernameStatus, setUsernameStatus] = useState(null)

  const handleCheckUsername = async () => {
    if (!username.trim()) return
    setCheckingUsername(true)
    const { data } = await supabase.from('profiles').select('id').eq('username', username).maybeSingle()
    setCheckingUsername(false)
    setUsernameStatus(data ? 'taken' : 'available')
  }

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      setError('모든 필드를 입력해주세요.')
      return
    }
    if (usernameStatus !== 'available') {
      setError('닉네임 중복확인을 해주세요.')
      return
    }
    if (!pwRules.every((r) => r.test(password))) {
      setError('비밀번호 규칙을 확인해주세요.')
      return
    }
    setLoading(true)
    setError('')

    const { data, error: err } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } }
    })

    if (err) {
      setError(err.message)
      setLoading(false)
      return
    }

    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        username,
        phone: phone || null,
      })
    }

    setLoading(false)
    navigate('/login', { state: { signedUp: true } })
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #7C9A6D22 0%, #FAF7F2 50%, #A67C5222 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2
    }}>
      <Card sx={{ width: '100%', maxWidth: 460, p: 1 }}>
        <CardContent>
          <Stack spacing={2.5}>
            <Box textAlign="center" mb={1}>
              <Typography variant="h5" fontWeight={800} color="primary">회원가입</Typography>
              <Typography variant="body2" color="text.secondary">ULSAN TastePick에 오신 걸 환영해요!</Typography>
            </Box>

            {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}

            <Stack direction="row" spacing={1} alignItems="flex-start">
              <TextField
                label="닉네임"
                fullWidth
                size="small"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setUsernameStatus(null) }}
                color={usernameStatus === 'available' ? 'success' : usernameStatus === 'taken' ? 'error' : 'primary'}
                helperText={
                  usernameStatus === 'available' ? '✅ 사용 가능' :
                  usernameStatus === 'taken' ? '❌ 이미 사용 중' : ' '
                }
              />
              <Button
                variant="outlined"
                size="small"
                onClick={handleCheckUsername}
                disabled={checkingUsername || !username}
                sx={{ mt: 0.5, minWidth: 80, height: 40 }}
              >
                중복확인
              </Button>
            </Stack>

            <TextField
              label="이메일"
              type="email"
              fullWidth
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Box>
              <TextField
                label="비밀번호"
                type="password"
                fullWidth
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPwFocused(true)}
              />
              {(pwFocused || password) && (
                <List dense disablePadding sx={{ mt: 1, bgcolor: '#f5f5f5', borderRadius: 2, px: 1.5, py: 0.5 }}>
                  {pwRules.map((rule) => {
                    const ok = rule.test(password)
                    return (
                      <ListItem key={rule.label} disableGutters sx={{ py: 0.2 }}>
                        <ListItemIcon sx={{ minWidth: 26 }}>
                          {ok
                            ? <CheckCircleOutlinedIcon sx={{ fontSize: 16, color: '#7C9A6D' }} />
                            : <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: '#ccc' }} />}
                        </ListItemIcon>
                        <ListItemText
                          primary={rule.label}
                          primaryTypographyProps={{ variant: 'caption', color: ok ? '#7C9A6D' : 'text.secondary' }}
                        />
                      </ListItem>
                    )
                  })}
                </List>
              )}
            </Box>

            <TextField
              label="전화번호 (선택)"
              fullWidth
              size="small"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="010-0000-0000"
            />

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleSignUp}
              disabled={loading}
              sx={{ py: 1.5, fontSize: '1rem', borderRadius: 3 }}
            >
              {loading ? '가입 중...' : '🍵 회원가입'}
            </Button>

            <Button variant="text" color="secondary" onClick={() => navigate('/login')}>
              이미 계정이 있으신가요? 로그인하기
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}

export default SignUpPage
