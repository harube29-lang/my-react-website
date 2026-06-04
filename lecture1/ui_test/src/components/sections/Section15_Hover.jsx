import { Box, Typography, Divider } from '@mui/material'

const hoverCards = [
  {
    key: 'color',
    label: '① 색상 전환',
    desc: 'background-color',
    emoji: '🎨',
    base: { bgcolor: '#e3f2fd', color: '#1976d2' },
    hover: {
      bgcolor: '#1976d2',
      color: 'white',
      transition: 'background-color 0.3s, color 0.3s',
    },
  },
  {
    key: 'scale',
    label: '② 크기 확대',
    desc: 'transform: scale',
    emoji: '🔍',
    base: { bgcolor: '#e8f5e9', color: '#2e7d32' },
    hover: {
      transform: 'scale(1.1)',
      bgcolor: '#e8f5e9',
      boxShadow: '0 8px 24px rgba(46,125,50,0.25)',
      transition: 'transform 0.25s, box-shadow 0.25s',
    },
  },
  {
    key: 'shadow',
    label: '③ 그림자',
    desc: 'box-shadow',
    emoji: '🌑',
    base: { bgcolor: '#fff8e1', color: '#e65100', boxShadow: 'none' },
    hover: {
      bgcolor: '#fff8e1',
      boxShadow: '0 12px 32px rgba(230,81,0,0.3)',
      transition: 'box-shadow 0.3s',
    },
  },
  {
    key: 'slide',
    label: '④ 슬라이드 업',
    desc: 'translateY',
    emoji: '🚀',
    base: { bgcolor: '#f3e5f5', color: '#6a1b9a', transform: 'translateY(0)' },
    hover: {
      bgcolor: '#ce93d8',
      color: 'white',
      transform: 'translateY(-8px)',
      transition: 'transform 0.25s, background-color 0.25s, color 0.25s',
    },
  },
  {
    key: 'border',
    label: '⑤ 테두리 강조',
    desc: 'border + inset shadow',
    emoji: '🔲',
    base: { bgcolor: '#fce4ec', color: '#880e4f', border: '2px solid transparent' },
    hover: {
      bgcolor: '#fce4ec',
      border: '2px solid #e91e63',
      boxShadow: 'inset 0 0 0 3px rgba(233,30,99,0.15)',
      transition: 'border-color 0.2s, box-shadow 0.2s',
    },
  },
  {
    key: 'rotate',
    label: '⑥ 회전',
    desc: 'rotate + scale',
    emoji: '🌀',
    base: { bgcolor: '#e0f2f1', color: '#00695c', transform: 'rotate(0deg)' },
    hover: {
      bgcolor: '#00897b',
      color: 'white',
      transform: 'rotate(6deg) scale(1.05)',
      transition: 'transform 0.3s, background-color 0.3s, color 0.3s',
    },
  },
  {
    key: 'blur',
    label: '⑦ 밝기 변화',
    desc: 'brightness + contrast',
    emoji: '💡',
    base: { bgcolor: '#ede7f6', color: '#4527a0', filter: 'brightness(1)' },
    hover: {
      bgcolor: '#ede7f6',
      filter: 'brightness(0.85) contrast(1.2)',
      transform: 'scale(1.03)',
      transition: 'filter 0.3s, transform 0.3s',
    },
  },
  {
    key: 'underline',
    label: '⑧ 밑줄 애니메이션',
    desc: '::after pseudo-element',
    emoji: '✏️',
    isUnderline: true,
    base: { bgcolor: '#fff3e0', color: '#e65100' },
  },
]

const HoverCard = ({ card }) => {
  if (card.isUnderline) {
    return (
      <Box
        sx={{
          flex: '1 1 180px',
          minHeight: 130,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          p: 2,
          cursor: 'pointer',
          bgcolor: card.base.bgcolor,
          color: card.base.color,
          border: '1.5px solid',
          borderColor: 'divider',
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0, left: 0,
            width: '0%', height: '3px',
            bgcolor: card.base.color,
            transition: 'width 0.35s ease',
          },
          '&:hover::after': { width: '100%' },
        }}
      >
        <Typography variant="h4">{card.emoji}</Typography>
        <Typography variant="body2" fontWeight={700} textAlign="center">{card.label}</Typography>
        <Typography variant="caption" color="text.secondary">{card.desc}</Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        flex: '1 1 180px',
        minHeight: 130,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        p: 2,
        cursor: 'pointer',
        border: '1.5px solid',
        borderColor: 'divider',
        ...card.base,
        '&:hover': card.hover,
      }}
    >
      <Typography variant="h4">{card.emoji}</Typography>
      <Typography variant="body2" fontWeight={700} textAlign="center">{card.label}</Typography>
      <Typography variant="caption" color="text.secondary">{card.desc}</Typography>
    </Box>
  )
}

const Section15_Hover = () => {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h3" sx={{ mb: 1 }}>
        15. Hover
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        MUI sx + CSS — 8가지 호버 효과 카드. 마우스를 올려보세요!
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {hoverCards.map((card) => (
          <HoverCard key={card.key} card={card} />
        ))}
      </Box>

      <Divider sx={{ mt: 4 }} />
    </Box>
  )
}

export default Section15_Hover
