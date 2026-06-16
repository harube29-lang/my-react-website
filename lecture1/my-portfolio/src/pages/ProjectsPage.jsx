import { useState, useEffect } from 'react'
import {
  Box, Typography, Divider, Chip, Button, Stack, Skeleton,
  Dialog, DialogContent, IconButton,
} from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'
import GitHubIcon from '@mui/icons-material/GitHub'
import CloseIcon from '@mui/icons-material/Close'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { supabase } from '../lib/supabase'

/* ── 상세 모달 ── */
const DetailModal = ({ project, onClose }) => {
  if (!project) return null
  return (
    <Dialog
      open={!!project}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, p: 0, overflow: 'hidden' },
      }}
    >
      {/* 썸네일 헤더 */}
      <Box sx={{ position: 'relative', width: '100%', paddingTop: '45%', flexShrink: 0 }}>
        {project.thumbnail_url ? (
          <Box
            component="img"
            src={project.thumbnail_url}
            alt={project.title}
            sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Box
            sx={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, #FF7A00 0%, #F04438 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
              {project.title}
            </Typography>
          </Box>
        )}
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            position: 'absolute', top: 10, right: 10,
            bgcolor: 'rgba(0,0,0,0.45)', color: '#fff',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.65)' },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 3.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
          {project.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75, mb: 2.5 }}>
          {project.description}
        </Typography>

        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: 1 }}>
          기술 스택
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6, mt: 0.8, mb: 3 }}>
          {project.tech_stack?.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              sx={{
                bgcolor: 'rgba(255,122,0,0.08)', color: 'primary.main',
                fontWeight: 600, fontSize: '0.7rem', height: 24, borderRadius: 1,
              }}
            />
          ))}
        </Box>

        <Stack direction="row" spacing={1}>
          {project.detail_url && (
            <Button
              variant="contained" size="small" fullWidth
              startIcon={<LaunchIcon sx={{ fontSize: 14 }} />}
              href={project.detail_url} target="_blank" rel="noopener noreferrer"
              sx={{ py: 1, fontSize: '0.8rem', boxShadow: 'none' }}
            >
              Live Demo
            </Button>
          )}
          {project.github_url && (
            <Button
              variant="outlined" size="small" fullWidth
              startIcon={<GitHubIcon sx={{ fontSize: 14 }} />}
              href={project.github_url} target="_blank" rel="noopener noreferrer"
              sx={{ py: 1, fontSize: '0.8rem' }}
            >
              GitHub
            </Button>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

/* ── 프로젝트 카드 ── */
const ProjectCard = ({ project, onDetail }) => {
  const [imgError, setImgError] = useState(false)

  return (
    <Box
      sx={{
        display: 'flex', flexDirection: 'column', height: '100%',
        borderRadius: 3, border: '1px solid', borderColor: 'grey.300',
        bgcolor: 'background.paper', overflow: 'hidden',
        transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 12px 36px rgba(255,122,0,0.14)',
          borderColor: 'primary.main',
        },
      }}
    >
      {/* 썸네일 — 16:9 */}
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
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.04)' },
            }}
          />
        )}
      </Box>

      {/* 카드 내용 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 2.5 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 700, fontSize: '1rem', mb: 1, color: 'text.primary', lineHeight: 1.4 }}
        >
          {project.title}
        </Typography>

        {/* 설명 — 3줄 클램프 */}
        <Typography
          variant="body2" color="text.secondary"
          sx={{
            mb: 2, flex: 1,
            display: '-webkit-box', WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.65,
          }}
        >
          {project.description}
        </Typography>

        {/* 기술 스택 뱃지 */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
          {project.tech_stack?.map((tech) => (
            <Chip
              key={tech} label={tech} size="small"
              sx={{
                bgcolor: 'rgba(255,122,0,0.08)', color: 'primary.main',
                fontWeight: 600, fontSize: '0.68rem', height: 22, borderRadius: 1,
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

        {/* 버튼 */}
        <Stack direction="row" spacing={1} sx={{ mt: 'auto' }}>
          {project.detail_url && (
            <Button
              variant="contained" size="small"
              startIcon={<LaunchIcon sx={{ fontSize: 13 }} />}
              href={project.detail_url} target="_blank" rel="noopener noreferrer"
              sx={{ flex: 1, py: 0.9, fontSize: '0.78rem', boxShadow: 'none', '&:active': { transform: 'scale(0.97)' } }}
            >
              Live Demo
            </Button>
          )}
          {project.github_url && (
            <Button
              variant="outlined" size="small"
              startIcon={<GitHubIcon sx={{ fontSize: 13 }} />}
              href={project.github_url} target="_blank" rel="noopener noreferrer"
              sx={{ flex: 1, py: 0.9, fontSize: '0.78rem', '&:active': { transform: 'scale(0.97)' } }}
            >
              GitHub
            </Button>
          )}
          <Button
            variant="outlined" size="small"
            startIcon={<InfoOutlinedIcon sx={{ fontSize: 13 }} />}
            onClick={() => onDetail(project)}
            sx={{
              flex: 1, py: 0.9, fontSize: '0.78rem',
              borderColor: 'grey.300', color: 'text.secondary',
              '&:hover': { borderColor: 'primary.main', color: 'primary.main', bgcolor: 'rgba(255,122,0,0.04)' },
              '&:active': { transform: 'scale(0.97)' },
            }}
          >
            Details
          </Button>
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
        <Skeleton variant="rounded" sx={{ flex: 1, height: 32 }} />
      </Box>
    </Box>
  </Box>
)

/* ── 메인 페이지 ── */
const ProjectsPage = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading]   = useState(true)
  const [selected, setSelected] = useState(null)

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

  const items = loading ? Array.from({ length: 4 }) : projects

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 4, md: 6 }, py: { xs: 6, sm: 8, md: 12 } }}>

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

      {/* 4열 그리드 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: '24px',
          alignItems: 'stretch',
        }}
      >
        {items.map((project, i) =>
          loading
            ? <SkeletonCard key={i} />
            : <ProjectCard key={project.id} project={project} onDetail={setSelected} />
        )}
      </Box>

      {/* 상세 모달 */}
      <DetailModal project={selected} onClose={() => setSelected(null)} />
    </Box>
  )
}

export default ProjectsPage
