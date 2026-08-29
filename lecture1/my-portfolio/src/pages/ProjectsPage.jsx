import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

/* ── 프로젝트 데이터 ── */
const PROJECTS = [
  {
    id: 1,
    title: '프로젝트 제목 1',
    description: '프로젝트에 대한 간단한 설명을 입력해 주세요.',
    tools: ['Figma', 'UX Design'],
    thumbnail: null,
    detail: '프로젝트 상세 내용을 입력해 주세요.',
    figmaUrl: '',
  },
  {
    id: 2,
    title: '프로젝트 제목 2',
    description: '프로젝트에 대한 간단한 설명을 입력해 주세요.',
    tools: ['Figma', 'UI Design'],
    thumbnail: null,
    detail: '프로젝트 상세 내용을 입력해 주세요.',
    figmaUrl: '',
  },
  {
    id: 3,
    title: '프로젝트 제목 3',
    description: '프로젝트에 대한 간단한 설명을 입력해 주세요.',
    tools: ['Figma', 'Prototyping'],
    thumbnail: null,
    detail: '프로젝트 상세 내용을 입력해 주세요.',
    figmaUrl: '',
  },
  {
    id: 4,
    title: '프로젝트 제목 4',
    description: '프로젝트에 대한 간단한 설명을 입력해 주세요.',
    tools: ['Figma', 'Wireframing'],
    thumbnail: null,
    detail: '프로젝트 상세 내용을 입력해 주세요.',
    figmaUrl: '',
  },
]

/* ── 더보기 모달 ── */
const DetailModal = ({ project, onClose }) => {
  if (!project) return null
  return (
    <Dialog
      open={!!project}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, overflow: 'hidden' } }}
    >
      {/* 썸네일 */}
      <Box sx={{ position: 'relative', width: '100%', paddingTop: '56.25%', bgcolor: '#F3F4F6' }}>
        {project.thumbnail ? (
          <Box
            component="img"
            src={project.thumbnail}
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
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2.5 }}>
          {project.detail}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6 }}>
          {project.tools.map(tool => (
            <Chip
              key={tool} label={tool} size="small"
              sx={{
                bgcolor: 'rgba(255,122,0,0.08)', color: 'primary.main',
                fontWeight: 600, fontSize: '0.7rem', height: 24, borderRadius: 1,
              }}
            />
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  )
}

/* ── 프로젝트 카드 ── */
const ProjectCard = ({ project, onDetail }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 3,
      border: '1px solid',
      borderColor: 'grey.200',
      bgcolor: '#fff',
      overflow: 'hidden',
      transition: 'transform 0.22s ease, box-shadow 0.22s ease',
      '&:hover': {
        transform: 'translateY(-6px)',
        boxShadow: '0 12px 36px rgba(255,122,0,0.13)',
        borderColor: 'primary.main',
      },
    }}
  >
    {/* 썸네일 — 4:3 비율 */}
    <Box sx={{ position: 'relative', width: '100%', paddingTop: '75%', bgcolor: '#F9FAFB', flexShrink: 0 }}>
      {project.thumbnail ? (
        <Box
          component="img"
          src={project.thumbnail}
          alt={project.title}
          sx={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'scale(1.04)' },
          }}
        />
      ) : (
        <Box
          sx={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, #FF7A00 0%, #F04438 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', fontWeight: 600 }}>
            이미지 준비 중
          </Typography>
        </Box>
      )}
    </Box>

    {/* 카드 내용 */}
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: '1rem', mb: 1, color: '#111827' }}>
        {project.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mb: 2, flex: 1 }}>
        {project.description}
      </Typography>

      {/* 툴 태그 */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2.5 }}>
        {project.tools.map(tool => (
          <Chip
            key={tool} label={tool} size="small"
            sx={{
              bgcolor: 'rgba(255,122,0,0.08)', color: 'primary.main',
              fontWeight: 600, fontSize: '0.68rem', height: 22, borderRadius: 1,
            }}
          />
        ))}
      </Box>

      {/* 더보기 버튼 */}
      <Button
        variant="outlined"
        size="small"
        onClick={() => onDetail(project)}
        sx={{
          borderColor: '#E5E7EB',
          color: '#374151',
          fontWeight: 600,
          fontSize: '0.82rem',
          borderRadius: 2,
          py: 0.9,
          textTransform: 'none',
          '&:hover': {
            borderColor: 'primary.main',
            color: 'primary.main',
            bgcolor: 'rgba(255,122,0,0.04)',
          },
        }}
      >
        더보기
      </Button>
    </Box>
  </Box>
)

/* ── 메인 페이지 ── */
const ProjectsPage = () => {
  const [selected, setSelected] = useState(null)

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', px: { xs: 2, sm: 4, md: 6 }, py: { xs: 6, sm: 8, md: 12 } }}>

      {/* 헤더 */}
      <Typography
        variant="caption"
        sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', display: 'block', mb: 1, fontSize: '0.72rem' }}
      >
        Portfolio
      </Typography>
      <Typography variant="h1" sx={{ fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }, mb: 1, wordBreak: 'keep-all' }}>
        작업물
      </Typography>
      <Box sx={{ width: 60, height: 3, bgcolor: 'primary.main', borderRadius: 1, mb: 2 }} />
      <Typography variant="body1" color="text.secondary" sx={{ mb: { xs: 5, md: 7 }, wordBreak: 'keep-all' }}>
        직접 기획하고 디자인한 작업물들을 소개합니다.
      </Typography>

      {/* 2열 그리드 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
          gap: { xs: 3, md: 4 },
        }}
      >
        {PROJECTS.map(project => (
          <ProjectCard key={project.id} project={project} onDetail={setSelected} />
        ))}
      </Box>

      {/* 더보기 모달 */}
      <DetailModal project={selected} onClose={() => setSelected(null)} />

    </Box>
  )
}

export default ProjectsPage
