import { useState } from 'react'
import {
  Box, Typography, Divider, Button, Paper, Stack,
  Fade, Grow, Slide,
} from '@mui/material'

const cssKeyframes = `
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    40%       { transform: translateY(-18px); }
    60%       { transform: translateY(-9px); }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1);    opacity: 1; }
    50%       { transform: scale(1.25); opacity: 0.7; }
  }
`

const ANIMATIONS = [
  {
    key: 'fade',
    label: '① Fade',
    desc: 'MUI Fade — 투명도',
    color: '#e3f2fd',
    emoji: '🌫️',
    render: (show) => (
      <Fade in={show} timeout={600}>
        <Paper sx={{ p: 2, bgcolor: '#bbdefb', textAlign: 'center' }}>
          <Typography>🌫️ Fade In!</Typography>
        </Paper>
      </Fade>
    ),
  },
  {
    key: 'grow',
    label: '② Grow',
    desc: 'MUI Grow — 크기 확대',
    color: '#e8f5e9',
    emoji: '🌱',
    render: (show) => (
      <Grow in={show} timeout={600}>
        <Paper sx={{ p: 2, bgcolor: '#c8e6c9', textAlign: 'center' }}>
          <Typography>🌱 Grow!</Typography>
        </Paper>
      </Grow>
    ),
  },
  {
    key: 'slide',
    label: '③ Slide',
    desc: 'MUI Slide — 아래에서 등장',
    color: '#fff8e1',
    emoji: '📤',
    render: (show) => (
      <Box sx={{ overflow: 'hidden' }}>
        <Slide in={show} direction="up" timeout={500}>
          <Paper sx={{ p: 2, bgcolor: '#fff9c4', textAlign: 'center' }}>
            <Typography>📤 Slide Up!</Typography>
          </Paper>
        </Slide>
      </Box>
    ),
  },
  {
    key: 'bounce',
    label: '④ Bounce',
    desc: 'CSS keyframes — 통통 튀기',
    color: '#fce4ec',
    emoji: '🏀',
    render: (show) => (
      <Box sx={{ textAlign: 'center', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography
          variant="h4"
          sx={show ? { animation: 'bounce 0.7s ease infinite' } : { opacity: 0 }}
        >
          🏀
        </Typography>
      </Box>
    ),
  },
  {
    key: 'spin',
    label: '⑤ Spin',
    desc: 'CSS keyframes — 회전',
    color: '#f3e5f5',
    emoji: '⭐',
    render: (show) => (
      <Box sx={{ textAlign: 'center', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography
          variant="h4"
          sx={show ? { animation: 'spin 0.8s linear infinite' } : { opacity: 0 }}
        >
          ⭐
        </Typography>
      </Box>
    ),
  },
  {
    key: 'pulse',
    label: '⑥ Pulse',
    desc: 'CSS keyframes — 맥박',
    color: '#e0f2f1',
    emoji: '❤️',
    render: (show) => (
      <Box sx={{ textAlign: 'center', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography
          variant="h4"
          sx={show ? { animation: 'pulse 0.9s ease-in-out infinite' } : { opacity: 0 }}
        >
          ❤️
        </Typography>
      </Box>
    ),
  },
]

const Section12_Animation = () => {
  const [active, setActive] = useState({})

  const toggle = (key) => setActive((prev) => ({ ...prev, [key]: !prev[key] }))

  const allOn = ANIMATIONS.every((a) => active[a.key])
  const toggleAll = () => {
    if (allOn) setActive({})
    else setActive(Object.fromEntries(ANIMATIONS.map((a) => [a.key, true])))
  }

  return (
    <Box sx={{ mb: 6 }}>
      <style>{cssKeyframes}</style>

      <Typography variant="h3" sx={{ mb: 1 }}>
        12. Animation
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        MUI Fade / Grow / Slide + CSS keyframes Bounce / Spin / Pulse — 버튼으로 토글
      </Typography>

      <Button
        variant={allOn ? 'contained' : 'outlined'}
        size="small"
        onClick={toggleAll}
        sx={{ mb: 3 }}
      >
        {allOn ? '전체 끄기' : '전체 켜기'}
      </Button>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 2,
        }}
      >
        {ANIMATIONS.map((anim) => {
          const on = !!active[anim.key]
          return (
            <Paper
              key={anim.key}
              variant="outlined"
              sx={{ p: 2, bgcolor: anim.color, borderRadius: 2 }}
            >
              <Stack spacing={1.5}>
                <Box>
                  <Typography variant="body2" fontWeight={700}>{anim.label}</Typography>
                  <Typography variant="caption" color="text.secondary">{anim.desc}</Typography>
                </Box>

                <Box sx={{ minHeight: 60 }}>{anim.render(on)}</Box>

                <Button
                  size="small"
                  variant={on ? 'contained' : 'outlined'}
                  color="primary"
                  onClick={() => toggle(anim.key)}
                  fullWidth
                >
                  {on ? '끄기' : '켜기'}
                </Button>
              </Stack>
            </Paper>
          )
        })}
      </Box>

      <Divider sx={{ mt: 4 }} />
    </Box>
  )
}

export default Section12_Animation
