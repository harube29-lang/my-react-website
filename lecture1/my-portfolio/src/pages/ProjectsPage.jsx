import { useState, useEffect } from 'react'
import {
  Box, Typography, Divider, Chip, Button, Stack, Skeleton
} from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'
import GitHubIcon from '@mui/icons-material/GitHub'
import { supabase } from '../lib/supabase'

/* ── 프로젝트 카드 ── */
const ProjectCard = ({ project }) => {
  const [imgError, setImgError] = useState(false)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'grey.300',
        bgcolor: 'background.paper',
        overflow: 'hidden',
        transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 12px 36px rgba(255,122,0,0.14)',
          borderColor: 'primary.main',
        },
      }}
    >
      {/* 썸네일 — 16:9 비율 고정 */}
      <Box sx={{ position: 'relative', width: '100%', paddingTop: '56.25%', overflow: 'hidden', flexShrink: 0 }}>
        {imgError || !project.thumbnail_url ? (
          <Box
            sx={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, #FF7A00 0%, #F04438 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Typography sx={{ color: '#fff', fontWeight: 700, opacity: 0.8, fontSize: '0.95rem', px: 2, textAlign: 'center' }}>
              {project.title}
            </Typography>
          </Box>
        ) : (
          <Box
            component="img"
            src={project.thumbnail_url}
            alt={project.title}
            onError={() => setImgError(true)}
            sx={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.04)' },
            }}
          />
        )}
      </Box>

      {/* 카드 내용 — flex:1 로 남은 공간 채움 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 2.5 }}>

        {/* 제목 */}
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 700, fontSize: '1rem', mb: 1, color: 'text.primary', lineHeight: 1.4 }}
        >
          {project.title}
        </Typography>

        {/* 설명 — 3줄 고정 */}
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
            flex: 1,
          }}
        >
          {project.description}
        </Typography>

        {/* 기술 스택 뱃지 */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
          {project.tech_stack?.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              sx={{
                bgcolor: 'rgba(255,122,0,0.08)',
                color: 'primary.main',
                fontWeight: 600,
                fontSize: '0.68rem',
                height: 22,
                borderRadius: 1,
              }}
            />
          ))}
        </Box>

        {/* 날짜 */}
        {project.created_at && (
          <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mb: 2 }}>
            {new Date(project.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}
          </Typography>
        )}

        {/* 버튼 — 항상 카드 하단에 고정 */}
        <Stack direction="row" spacing={1} sx={{ mt: 'auto' }}>
          {project.detail_url && (
            <Button
              variant="contained"
              size="small"
              startIcon={<LaunchIcon sx={{ fontSize: 13 }} />}
              href={project.detail_url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                flex: 1, py: 0.9, fontSize: '0.78rem',
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
              startIcon={<GitHubIcon sx={{ fontSize: 13 }} />}
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                flex: 1, py: 0.9, fontSize: '0.78rem',
                '&:active': { transform: 'scale(0.97)' },
              }}
            >
              GitHub
            </Button>
          )}
        </Stack>
      </Box>
    </Box>
  )
}

/* ── 스켈레톤 카드 ── */
const SkeletonCard = () => (
  <Box sx={{ borderRadius: 3, border: '1px solid', borderColor: 'grey.300', overflow: 'hidden' }}>
    <Skeleton variant="rectangular" sx={{ width: '100%', paddingTop: '56.25%' }} />
    <Box sx={{ p: 2.5 }}>
      <Skeleton variant="text" width="65%" height={22} sx={{ mb: 1 }} />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="80%" sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
        <Skeleton variant="rounded" width={52} height={22} />
        <Skeleton variant="rounded" width={40} height={22} />
        <Skeleton variant="rounded" width={56} height={22} />
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Skeleton variant="rounded" sx={{ flex: 1, height: 32 }} />
        <Skeleton variant="rounded" sx={{ flex: 1, height: 32 }} />
      </Box>
    </Box>
  </Box>
)

/* ── 메인 페이지 ── */
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

  const items = loading ? Array.from({ length: 3 }) : projects

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', px: { xs: 2, sm: 4, md: 6 }, py: { xs: 6, sm: 8, md: 12 } }}>

      {/* 헤더 */}
      <Typography
        variant="caption"
        sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', display: 'block', mb: 1, fontSize: '0.72rem' }}
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

      {/* CSS Grid 레이아웃 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: '24px',
          alignItems: 'stretch',
        }}
      >
        {items.map((project, i) =>
          loading
            ? <SkeletonCard key={i} />
            : <ProjectCard key={project.id} project={project} />
        )}
      </Box>

    </Box>
  )
}

export default ProjectsPage
