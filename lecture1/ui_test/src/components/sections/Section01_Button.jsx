import { Box, Button, Typography, Divider, Stack } from '@mui/material'

const variants = ['contained', 'outlined', 'text']
const colors = ['primary', 'secondary', 'error']

const Section01_Button = () => {
  const handleClick = (variant, color) => {
    alert(`클릭! variant: ${variant} / color: ${color}`)
  }

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h3" sx={{ mb: 1 }}>
        01. Button
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        variant × color 조합 (contained / outlined / text) × (primary / secondary / error)
      </Typography>

      {variants.map((variant) => (
        <Box key={variant} sx={{ mb: 3 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            variant="{variant}"
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            {colors.map((color) => (
              <Button
                key={color}
                variant={variant}
                color={color}
                onClick={() => handleClick(variant, color)}
              >
                {color}
              </Button>
            ))}
          </Stack>
        </Box>
      ))}

      <Divider sx={{ mt: 4 }} />
    </Box>
  )
}

export default Section01_Button
