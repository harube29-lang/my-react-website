import { useState, useRef } from 'react'
import { Box, Typography, Divider, Paper, IconButton, Chip, Tooltip } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const items = [
  { no: 1,  title: 'React Hooks 이해하기',       tag: 'React',      color: '#e3f2fd' },
  { no: 2,  title: 'TypeScript 제네릭 활용법',    tag: 'TypeScript', color: '#e8eaf6' },
  { no: 3,  title: 'CSS Grid vs Flexbox',        tag: 'CSS',        color: '#e8f5e9' },
  { no: 4,  title: 'Vite로 빠른 번들링하기',      tag: 'Vite',       color: '#fff8e1' },
  { no: 5,  title: 'MUI 커스텀 테마 설정',        tag: 'MUI',        color: '#fce4ec' },
  { no: 6,  title: 'React Query 상태관리',        tag: 'React',      color: '#e3f2fd' },
  { no: 7,  title: 'REST vs GraphQL 비교',       tag: 'API',        color: '#f3e5f5' },
  { no: 8,  title: 'Git 브랜치 전략 (Git Flow)', tag: 'Git',        color: '#e0f2f1' },
  { no: 9,  title: 'Docker 컨테이너 입문',        tag: 'DevOps',     color: '#fff3e0' },
  { no: 10, title: 'CI/CD 파이프라인 구축',       tag: 'DevOps',     color: '#fafafa' },
  { no: 11, title: 'Zustand 전역 상태관리',       tag: 'React',      color: '#e3f2fd' },
  { no: 12, title: '웹 접근성(a11y) 체크리스트',  tag: 'UX',         color: '#f9fbe7' },
  { no: 13, title: 'Lighthouse 성능 최적화',      tag: 'Performance',color: '#ede7f6' },
  { no: 14, title: 'Next.js App Router 완전 정복', tag: 'Next.js',  color: '#e8eaf6' },
  { no: 15, title: 'PWA 오프라인 캐싱 전략',      tag: 'PWA',        color: '#e0f7fa' },
]

const Section11_Scroll = () => {
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef(null)

  const handleScroll = (e) => setScrollTop(e.currentTarget.scrollTop)

  const scrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const showTopBtn = scrollTop > 60

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h3" sx={{ mb: 1 }}>
        11. Scroll
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        고정 높이 300px 스크롤 컨테이너 — 스크롤 시 Top 버튼 등장
      </Typography>

      <Box sx={{ position: 'relative', maxWidth: 520 }}>
        <Paper
          ref={containerRef}
          variant="outlined"
          onScroll={handleScroll}
          sx={{ height: 300, overflowY: 'auto', borderRadius: 2 }}
        >
          {items.map((item) => (
            <Box
              key={item.no}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                px: 2,
                py: 1.5,
                bgcolor: item.color,
                borderBottom: '1px solid',
                borderColor: 'divider',
                '&:last-child': { borderBottom: 'none' },
              }}
            >
              <Typography
                variant="caption"
                sx={{ minWidth: 24, fontWeight: 700, color: 'text.disabled' }}
              >
                {String(item.no).padStart(2, '0')}
              </Typography>
              <Typography variant="body2" sx={{ flexGrow: 1 }}>
                {item.title}
              </Typography>
              <Chip label={item.tag} size="small" sx={{ fontSize: 11 }} />
            </Box>
          ))}
        </Paper>

        <Tooltip title="맨 위로" placement="left">
          <IconButton
            onClick={scrollToTop}
            color="primary"
            size="small"
            sx={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              bgcolor: 'white',
              boxShadow: 3,
              opacity: showTopBtn ? 1 : 0,
              transform: showTopBtn ? 'scale(1)' : 'scale(0.7)',
              transition: 'opacity 0.2s, transform 0.2s',
              pointerEvents: showTopBtn ? 'auto' : 'none',
              '&:hover': { bgcolor: 'primary.50' },
            }}
          >
            <KeyboardArrowUpIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        스크롤 위치: {Math.round(scrollTop)}px
      </Typography>

      <Divider sx={{ mt: 4 }} />
    </Box>
  )
}

export default Section11_Scroll
