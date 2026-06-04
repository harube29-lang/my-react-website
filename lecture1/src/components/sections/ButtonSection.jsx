import { Box, Button, Typography, Stack, Divider } from '@mui/material'

const VARIANTS = ['contained', 'outlined', 'text']
const COLORS = ['primary', 'secondary', 'error']

const ButtonSection = () => {
  const handleClick = (variant, color) => {
    alert(`클릭! variant: ${variant}, color: ${color}`)
  }

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" gutterBottom>
        Button
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {VARIANTS.map((variant) => (
        <Box key={variant} sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            variant="{variant}"
          </Typography>
          <Stack direction="row" spacing={2}>
            {COLORS.map((color) => (
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
    </Box>
  )
}

export default ButtonSection
