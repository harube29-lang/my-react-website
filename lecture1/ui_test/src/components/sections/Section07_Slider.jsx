import { useState } from 'react'
import { Box, Typography, Divider, Paper, Slider, Stack } from '@mui/material'

const marks = [
  { value: 0, label: '0' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 75, label: '75' },
  { value: 100, label: '100' },
]

const getColor = (value) => {
  if (value <= 30) return 'error'
  if (value <= 60) return 'warning'
  return 'success'
}

const getEmoji = (value) => {
  if (value <= 30) return '🥶'
  if (value <= 60) return '😊'
  if (value <= 85) return '🔥'
  return '🚀'
}

const Section07_Slider = () => {
  const [value, setValue] = useState(50)

  const handleChange = (_, newValue) => setValue(newValue)

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h3" sx={{ mb: 1 }}>
        07. Slider
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        0~100 범위, 25 단위 구간 표시 — 값에 따라 색상 및 이모지 변경
      </Typography>

      <Paper variant="outlined" sx={{ p: 3, maxWidth: 440 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">현재 값</Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h4" fontWeight={700} color={`${getColor(value)}.main`}>
              {value}
            </Typography>
            <Typography variant="h5">{getEmoji(value)}</Typography>
          </Stack>
        </Stack>

        <Slider
          value={value}
          onChange={handleChange}
          min={0}
          max={100}
          step={1}
          marks={marks}
          valueLabelDisplay="auto"
          color={getColor(value)}
          sx={{ mt: 1 }}
        />

        <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
          <Typography variant="caption" color="text.disabled">0</Typography>
          <Typography variant="caption" color="text.disabled">100</Typography>
        </Stack>
      </Paper>

      <Paper variant="outlined" sx={{ mt: 2, p: 2, maxWidth: 440, bgcolor: 'background.paper' }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
          실시간 값
        </Typography>
        <Typography variant="body2" fontWeight={500}>
          {getEmoji(value)}&nbsp;
          {value}% —&nbsp;
          {value <= 30 ? '낮음' : value <= 60 ? '보통' : value <= 85 ? '높음' : '최대'}
        </Typography>
      </Paper>

      <Divider sx={{ mt: 4 }} />
    </Box>
  )
}

export default Section07_Slider
