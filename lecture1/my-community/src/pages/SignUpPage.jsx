import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Card, CardContent, Typography, TextField, Button, Alert, Stack, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined'
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
    const { data } = await supabase.from('profiles').select('id').eq('username', username).single()
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
    const { data, error: err } = await supabase.auth.signUp({ email, password })
    if (err) {
      setError(err.message)
      setLoading(false)
      return
    }
    if (data.user) {
      await supabase.from('profiles').insert({ id: data.user.id, username, phone: phone || null })
    }
    setLoading(false)
    navigate('/login')
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Card sx={{ width: '100%', maxWidth: 440, p: 2 }}>
        <CardContent>
          <Stack spacing={2.5}>
            <Typography variant="h5" fontWeight={700}>회원가입</Typography>

            {error && <Alert severity="error">{error}</Alert>}

            <Stack direction="row" spacing={1}>
              <TextField
                label="닉네임"
                fullWidth
                value={username}
                onChange={(e) => { setUsername(e.target.value); setUsernameStatus(null) }}
                color={usernameStatus === 'available' ? 'success' : usernameStatus === 'taken' ? 'error' : 'primary'}
                helperText={usernameStatus === 'available' ? '사용 가능한 닉네임입니다.' : usernameStatus === 'taken' ? '이미 사용 중인 닉네임입니다.' : ''}
              />
              <Button variant="outlined" onClick={handleCheckUsername} disabled={checkingUsername || !username} sx={{ minWidth: 90, alignSelf: 'flex-start', mt: 0.5 }}>
                중복확인
              </Button>
            </Stack>

            <TextField
              label="아이디 (이메일)"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="비밀번호"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPwFocused(true)}
            />

            {(pwFocused || password) && (
              <List dense disablePadding sx={{ bgcolor: '#f9f9f9', borderRadius: 2, p: 1 }}>
                {pwRules.map((rule) => {
                  const ok = rule.test(password)
                  return (
                    <ListItem key={rule.label} disableGutters sx={{ py: 0.3 }}>
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        {ok
                          ? <CheckCircleOutlineIcon fontSize="small" color="success" />
                          : <RadioButtonUncheckedIcon fontSize="small" sx={{ color: '#ccc' }} />}
                      </ListItemIcon>
                      <ListItemText primary={rule.label} primaryTypographyProps={{ variant: 'body2', color: ok ? 'success.main' : 'text.secondary' }} />
                    </ListItem>
                  )
                })}
              </List>
            )}

            <TextField
              label="전화번호 (선택)"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="010-0000-0000"
            />

            <Button variant="contained" fullWidth size="large" onClick={handleSignUp} disabled={loading}>
              {loading ? '가입 중...' : '회원가입'}
            </Button>

            <Button variant="text" color="secondary" onClick={() => navigate('/login')}>
              이미 계정이 있으신가요? 로그인
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}

export default SignUpPage
