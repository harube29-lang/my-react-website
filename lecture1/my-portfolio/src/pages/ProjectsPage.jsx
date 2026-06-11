import { useState, useEffect } from 'react'
import {
  Box, Typography, Divider, Grid, Card, CardMedia, CardContent,
  CardActions, Chip, Button, Stack, Skeleton
} from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'
import GitHubIcon from '@mui/icons-material/GitHub'
import { supabase } from '../lib/supabase'

const ProjectCard = ({ project }) => {
  const [imgError, setImgError] = useState(false)

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'grey.300',
        transition: 'transform 0.22s ease, box-shadow 0.22s ease',
        '&:hover': {
          transform: 'translateY(-6px) scale(1.01)',
          boxShadow: '0 12px 36px rgba(255,122,0,0.15)',
          borderColor: 'primary.main',
        },
      }}
    >
      {/* 썸네일 */}
      <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: '12px 12px 0 0' }}>
        {imgError ? (
          <Box
            sx={{
              height: 180,
              background: 'linear-gradient(135deg, #FF7A00 0%, #F04438 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, opacity: 0.7 }}>
              {project.title}
            </Typography>
          </Box>
        ) : (
          <CardMedia
            component="img"
            height={180}
            image={project.thumbnail_url}
            alt={project.title}
            onError={() => setImgError(true)}
            sx={{ objectFit: 'cover', transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.04)' } }}
          />
        )}
      </Box>

      <CardContent sx={{ flex: 1, p: 2.5 }}>
        {/* 제목 */}
        <Typography variant="h3" sx={{ fontSize: '1rem', fontWeight: 700, mb: 1, color: 'text.primary' }}>
          {project.title}
        </Typography>

        {/* 설명 */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.65,
          }}
        >
          {project.description}
        </Typography>

        {/* 기술 스택 뱃지 */}
        <Stack direction="row" spacing={0.5} flexWrap="wrap" sx={{ gap: 0.5 }}>
          {project.tech_stack?.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              sx={{
                bgcolor: 'rgba(255,122,0,0.08)',
                color: 'primary.main',
                fontWeight: 600,
                fontSize: '0.7rem',
                height: 22,
                borderRadius: 1,
              }}
            />
          ))}
        </Stack>

        {/* 날짜 */}
        {project.created_at && (
          <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 1.5 }}>
            {new Date(project.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}
          </Typography>
        )}
      </CardContent>

      {/* 버튼 */}
      <CardActions sx={{ px: 2.5, pb: 2.5, pt: 0, gap: 1 }}>
        {project.detail_url && (
          <Button
            variant="contained"
            size="small"
            startIcon={<LaunchIcon sx={{ fontSize: 14 }} />}
            href={project.detail_url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              flex: 1,
              py: 0.8,
              fontSize: '0.8rem',
              boxShadow: 'none',
              '&:active': { transform: 'scale(0.97)' },
            }}
          >
            Live Demo
          </Button>
        )}
        {project.github_url && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<GitHubIcon sx={{ fontSize: 14 }} />}
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              flex: 1,
              py: 0.8,
              fontSize: '0.8rem',
              '&:active': { transform: 'scale(0.97)' },
            }}
          >
            GitHub
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

const SkeletonCard = () => (
  <Card sx={{ borderRadius: 3, border: '1px solid', borderColor: 'grey.300' }}>
    <Skeleton variant="rectangular" height={180} />
    <CardContent sx={{ p: 2.5 }}>
      <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="85%" />
      <Skeleton variant="text" width="40%" sx={{ mt: 1 }} />
    </CardContent>
    <CardActions sx={{ px: 2.5, pb: 2.5, pt: 0 }}>
      <Skeleton variant="rounded" width="48%" height={32} />
      <Skeleton variant="rounded" width="48%" height={32} />
    </CardActions>
  </Card>
)

const ProjectsPage = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('projects')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data) setProjects(data)
        setLoading(false)
      })
  }, [])

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 4, md: 6 }, py: { xs: 6, sm: 8, md: 12 } }}>

      {/* 헤더 */}
      <Typography
        variant="caption"
        sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', display: 'block', mb: 1, fontSize: { xs: '0.65rem', sm: '0.75rem' } }}
      >
        Projects
      </Typography>
      <Typography variant="h1" sx={{ fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }, mb: 1, wordBreak: 'keep-all' }}>
        주요 프로젝트
      </Typography>
      <Divider sx={{ width: 60, borderColor: 'primary.main', borderWidth: 2, mb: 2 }} />
      <Typography variant="body1" color="text.secondary" sx={{ mb: { xs: 5, md: 7 }, wordBreak: 'keep-all' }}>
        직접 기획·개발한 프로젝트들을 소개합니다.
      </Typography>

      {/* 카드 그리드 */}
      <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <SkeletonCard />
              </Grid>
            ))
          : projects.map((project) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={project.id}>
                <ProjectCard project={project} />
              </Grid>
            ))
        }
      </Grid>

    </Box>
  )
}

export default ProjectsPage
