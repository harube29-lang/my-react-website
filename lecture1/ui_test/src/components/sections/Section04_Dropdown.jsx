import { useState } from 'react'
import {
  Box, Typography, Divider, Stack,
  FormControl, InputLabel, Select, MenuItem, Paper, Chip,
} from '@mui/material'

const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'nuxt', label: 'Nuxt.js' },
]

const Section04_Dropdown = () => {
  const [selected, setSelected] = useState('')

  const handleChange = (e) => setSelected(e.target.value)

  const selectedLabel = frameworks.find((f) => f.value === selected)?.label

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h3" sx={{ mb: 1 }}>
        04. Dropdown
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Select + MenuItem — 6개 옵션, 선택값 실시간 표시
      </Typography>

      <Stack spacing={3} sx={{ maxWidth: 400 }}>
        <FormControl fullWidth>
          <InputLabel id="framework-label">프레임워크 선택</InputLabel>
          <Select
            labelId="framework-label"
            value={selected}
            label="프레임워크 선택"
            onChange={handleChange}
          >
            {frameworks.map((f) => (
              <MenuItem key={f.value} value={f.value}>
                {f.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.paper' }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
            선택된 값
          </Typography>
          {selected ? (
            <Chip label={selectedLabel} color="primary" size="medium" />
          ) : (
            <Typography variant="body2" color="text.disabled">
              (선택 없음)
            </Typography>
          )}
        </Paper>
      </Stack>

      <Divider sx={{ mt: 4 }} />
    </Box>
  )
}

export default Section04_Dropdown
