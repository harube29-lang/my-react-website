import { useState } from 'react'
import {
  Box, Typography, Divider, Paper,
  Radio, RadioGroup, FormControl, FormLabel, FormControlLabel,
} from '@mui/material'

const options = [
  { value: 'junior', label: '주니어 (0~3년)', icon: '🌱' },
  { value: 'mid', label: '미드 (3~7년)', icon: '🌿' },
  { value: 'senior', label: '시니어 (7~10년)', icon: '🌳' },
  { value: 'lead', label: '리드 (10년 이상)', icon: '🏆' },
]

const Section06_Radio = () => {
  const [selected, setSelected] = useState('')

  const handleChange = (e) => setSelected(e.target.value)

  const selectedOption = options.find((o) => o.value === selected)
  const selectedLabel = selectedOption ? `${selectedOption.icon} ${selectedOption.label}` : null

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h3" sx={{ mb: 1 }}>
        06. Radio
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        RadioGroup + FormControlLabel — 단일 선택, 선택값 실시간 표시
      </Typography>

      <Paper variant="outlined" sx={{ p: 2, maxWidth: 320 }}>
        <FormControl>
          <FormLabel sx={{ fontWeight: 600, mb: 1 }}>개발 연차를 선택하세요</FormLabel>
          <RadioGroup value={selected} onChange={handleChange}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                label={`${option.icon} ${option.label}`}
                control={<Radio color="primary" />}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Paper>

      <Paper variant="outlined" sx={{ mt: 2, p: 2, maxWidth: 320, bgcolor: 'background.paper' }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
          선택된 옵션
        </Typography>
        <Typography variant="body2" fontWeight={500}>
          {selectedLabel ?? '(선택 없음)'}
        </Typography>
      </Paper>

      <Divider sx={{ mt: 4 }} />
    </Box>
  )
}

export default Section06_Radio
