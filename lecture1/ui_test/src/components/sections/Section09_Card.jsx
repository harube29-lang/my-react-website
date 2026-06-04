import { useState } from 'react'
import {
  Box, Typography, Divider,
  Grid, Card, CardMedia, CardContent, CardActions,
  Button, IconButton, Chip,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

const cards = [
  {
    id: 1,
    title: 'React',
    subtitle: '프론트엔드 라이브러리',
    description: 'Meta가 만든 UI 구축을 위한 JavaScript 라이브러리. 컴포넌트 기반 아키텍처로 재사용성이 높습니다.',
    tag: '인기',
    tagColor: 'primary',
    bg: 'rgba(236, 181, 93, 0.18)',
    emoji: '⚛️',
  },
  {
    id: 2,
    title: 'TypeScript',
    subtitle: '정적 타입 언어',
    description: 'JavaScript의 슈퍼셋으로 정적 타입을 지원합니다. 대규모 프로젝트에서 버그를 사전에 방지합니다.',
    tag: '추천',
    tagColor: 'success',
    bg: 'rgba(234, 225, 80, 0.18)',
    emoji: '🔷',
  },
  {
    id: 3,
    title: 'Vite',
    subtitle: '빌드 도구',
    description: '차세대 프론트엔드 빌드 도구. 빠른 HMR과 최적화된 번들링으로 개발 경험을 크게 향상시킵니다.',
    tag: '빠름',
    tagColor: 'warning',
    bg: 'rgba(135, 119, 112, 0.12)',
    emoji: '⚡',
  },
  {
    id: 4,
    title: 'MUI',
    subtitle: 'UI 컴포넌트 라이브러리',
    description: 'Google Material Design을 기반으로 한 React UI 라이브러리. 다양한 컴포넌트를 즉시 사용할 수 있습니다.',
    tag: '디자인',
    tagColor: 'secondary',
    bg: 'rgba(46, 14, 7, 0.06)',
    emoji: '🎨',
  },
]

const Section09_Card = () => {
  const [liked, setLiked] = useState([])
  const [hovered, setHovered] = useState(null)

  const toggleLike = (id) => {
    setLiked((prev) => prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id])
  }

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h3" sx={{ mb: 1 }}>
        09. Card
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        CardMedia + CardContent + CardActions — Grid 배치, 호버 시 elevation 효과
      </Typography>

      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={card.id}>
            <Card
              elevation={0}
              onMouseEnter={() => setHovered(card.id)}
              onMouseLeave={() => setHovered(null)}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.25s, box-shadow 0.25s',
                transform: hovered === card.id ? 'translateY(-5px)' : 'none',
                boxShadow: hovered === card.id
                  ? '0 12px 32px rgba(46,14,7,0.15)'
                  : '0 2px 8px rgba(46,14,7,0.06)',
                cursor: 'pointer',
                bgcolor: 'rgba(255,255,255,0.55)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(46,14,7,0.08)',
              }}
            >
              <CardMedia
                sx={{
                  height: 120,
                  bgcolor: card.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                }}
                title={card.title}
              >
                {card.emoji}
              </CardMedia>

              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Typography variant="h6" component="div">
                    {card.title}
                  </Typography>
                  <Chip label={card.tag} color={card.tagColor} size="small" />
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                  {card.subtitle}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                <Button size="small" color="primary">자세히</Button>
                <Box>
                  <IconButton size="small" onClick={() => toggleLike(card.id)} color={liked.includes(card.id) ? 'error' : 'default'}>
                    {liked.includes(card.id) ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
                  </IconButton>
                  <IconButton size="small">
                    <ShareIcon fontSize="small" />
                  </IconButton>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ mt: 4 }} />
    </Box>
  )
}

export default Section09_Card
