import { useState } from 'react'
import {
  Box, Typography, Divider, Paper,
  Checkbox, FormControlLabel, FormGroup,
} from '@mui/material'

const items = [
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'react', label: 'React' },
  { value: 'typescript', label: 'TypeScript' },
]

const Section05_Checkbox = () => {
  const [checked, setChecked] = useState([])

  const isAllChecked = checked.length === items.length
  const isIndeterminate = checked.length > 0 && checked.length < items.length

  const handleAll = () => {
    setChecked(isAllChecked ? [] : items.map((i) => i.value))
  }

  const handleItem = (value) => {
    setChecked((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h3" sx={{ mb: 1 }}>
        05. Checkbox
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        다중 선택 + 전체 선택/해제 — 선택 항목 수 실시간 표시
      </Typography>

      <Paper variant="outlined" sx={{ p: 2, maxWidth: 320 }}>
        <FormControlLabel
          label={<Typography fontWeight={600}>전체 선택</Typography>}
          control={
            <Checkbox
              checked={isAllChecked}
              indeterminate={isIndeterminate}
              onChange={handleAll}
              color="primary"
            />
          }
        />
        <Divider sx={{ my: 1 }} />
        <FormGroup sx={{ pl: 2 }}>
          {items.map((item) => (
            <FormControlLabel
              key={item.value}
              label={item.label}
              control={
                <Checkbox
                  checked={checked.includes(item.value)}
                  onChange={() => handleItem(item.value)}
                  color="primary"
                />
              }
            />
          ))}
        </FormGroup>
      </Paper>

      <Paper variant="outlined" sx={{ mt: 2, p: 2, maxWidth: 320, bgcolor: 'background.paper' }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
          선택된 항목
        </Typography>
        <Typography variant="body2" fontWeight={500}>
          {checked.length === 0
            ? '(없음)'
            : `${checked.map((v) => items.find((i) => i.value === v).label).join(', ')} — 총 ${checked.length}개`}
        </Typography>
      </Paper>

      <Divider sx={{ mt: 4 }} />
    </Box>
  )
}

export default Section05_Checkbox
