import { useState } from 'react'
import { Box, TextField, Typography, Divider, Stack, Paper } from '@mui/material'

const variants = ['standard', 'outlined', 'filled']

const Section02_Input = () => {
  const [values, setValues] = useState({ standard: '', outlined: '', filled: '' })

  const handleChange = (variant) => (e) => {
    setValues((prev) => ({ ...prev, [variant]: e.target.value }))
  }

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h3" sx={{ mb: 1 }}>
        02. Input
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        TextField variant 3가지 (standard / outlined / filled) — 입력값 실시간 표시
      </Typography>

      <Stack spacing={3} sx={{ maxWidth: 400 }}>
        {variants.map((variant) => (
          <TextField
            key={variant}
            variant={variant}
            label={`${variant} 입력`}
            placeholder={`${variant} 텍스트를 입력하세요`}
            value={values[variant]}
            onChange={handleChange(variant)}
            fullWidth
          />
        ))}
      </Stack>

      <Paper variant="outlined" sx={{ mt: 3, p: 2, maxWidth: 400, bgcolor: 'background.paper' }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
          실시간 입력값
        </Typography>
        {variants.map((variant) => (
          <Typography key={variant} variant="body2" sx={{ mb: 0.5 }}>
            <Box component="span" sx={{ color: 'text.secondary' }}>{variant}: </Box>
            <Box component="span" sx={{ fontWeight: 500 }}>
              {values[variant] || '(없음)'}
            </Box>
          </Typography>
        ))}
      </Paper>

      <Divider sx={{ mt: 4 }} />
    </Box>
  )
}

export default Section02_Input
