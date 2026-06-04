import { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { Box, Typography, Divider, IconButton, Stack } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const slides = [
  { id: 1, emoji: '🌅', title: '새벽의 여명',    desc: '하루의 시작을 알리는 따뜻한 빛',  bg: 'linear-gradient(135deg, #f8961e 0%, #f3722c 100%)' },
  { id: 2, emoji: '🌊', title: '푸른 바다',       desc: '끝없이 펼쳐진 수평선 너머로',      bg: 'linear-gradient(135deg, #4cc9f0 0%, #4361ee 100%)' },
  { id: 3, emoji: '🌲', title: '초록 숲속',       desc: '고요하고 싱그러운 자연 속으로',    bg: 'linear-gradient(135deg, #52b788 0%, #1b4332 100%)' },
  { id: 4, emoji: '🌌', title: '별이 빛나는 밤', desc: '수억 개의 별이 쏟아지는 하늘',    bg: 'linear-gradient(135deg, #240046 0%, #7b2d8b 100%)' },
  { id: 5, emoji: '🏔️', title: '눈 덮인 산',    desc: '정상에서 바라보는 경이로운 전경', bg: 'linear-gradient(135deg, #caf0f8 0%, #90e0ef 100%)' },
]

const Section16_Swipe = () => {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(null)

  const prev = () => {
    setDir('right')
    setIndex((i) => (i - 1 + slides.length) % slides.length)
  }
  const next = () => {
    setDir('left')
    setIndex((i) => (i + 1) % slides.length)
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => next(),
    onSwipedRight: () => prev(),
    onSwiping: (e) => setDir(e.dir),
    preventScrollOnSwipe: true,
    trackMouse: true,
  })

  const slide = slides[index]

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h3" sx={{ mb: 1 }}>
        16. Swipe
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        react-swipeable — 터치/마우스 드래그로 슬라이드 전환, 이전·다음 버튼 제공
      </Typography>

      <Box sx={{ maxWidth: 480 }}>
        {/* 슬라이드 영역 */}
        <Box
          {...handlers}
          sx={{
            position: 'relative',
            borderRadius: 3,
            overflow: 'hidden',
            height: 260,
            background: slide.bg,
            cursor: 'grab',
            userSelect: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.5,
            color: 'white',
            boxShadow: 4,
            transition: 'background 0.4s ease',
            '&:active': { cursor: 'grabbing' },
          }}
        >
          <Typography variant="h2" sx={{ fontSize: '4rem', lineHeight: 1 }}>
            {slide.emoji}
          </Typography>
          <Typography variant="h5" fontWeight={700}>
            {slide.title}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85, px: 4, textAlign: 'center' }}>
            {slide.desc}
          </Typography>

          {/* 이전/다음 버튼 */}
          <IconButton
            onClick={prev}
            size="small"
            sx={{
              position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
              bgcolor: 'rgba(255,255,255,0.25)', color: 'white',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.4)' },
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={next}
            size="small"
            sx={{
              position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
              bgcolor: 'rgba(255,255,255,0.25)', color: 'white',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.4)' },
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* 인덱스 점 표시 */}
        <Stack direction="row" justifyContent="center" spacing={1} sx={{ mt: 2 }}>
          {slides.map((s, i) => (
            <Box
              key={s.id}
              onClick={() => setIndex(i)}
              sx={{
                width: i === index ? 24 : 8,
                height: 8,
                borderRadius: 4,
                bgcolor: i === index ? 'primary.main' : 'action.disabled',
                cursor: 'pointer',
                transition: 'width 0.3s, background-color 0.3s',
              }}
            />
          ))}
        </Stack>

        {/* 슬라이드 정보 */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1.5 }}>
          <Typography variant="caption" color="text.secondary">
            {index + 1} / {slides.length}
          </Typography>
          <Typography variant="caption" color="text.disabled">
            {dir === 'left' ? '← 스와이프' : dir === 'right' ? '→ 스와이프' : '드래그해보세요'}
          </Typography>
        </Stack>
      </Box>

      <Divider sx={{ mt: 4 }} />
    </Box>
  )
}

export default Section16_Swipe
