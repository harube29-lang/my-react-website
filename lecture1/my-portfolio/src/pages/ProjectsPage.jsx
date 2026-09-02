import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import thumbArchive  from '../assets/thumb_archive.png'
import thumbParis    from '../assets/thumb_paris.png'
import thumbNatuur   from '../assets/thumb_natuur.png'
import thumbHospital from '../assets/thumb_hospital.png'
import thumbNetflix  from '../assets/thumb_netflix.jpg'
import processArchive from '../assets/process_archive.png'

/* ── 카테고리 스타일 ── */
const CATEGORY_STYLES = {
  'WEB DESIGN':     { color: '#6B7280', bg: 'rgba(107,114,128,0.08)' },
  'AI VIBE CODING': { color: '#7C3AED', bg: 'rgba(124,58,237,0.09)' },
}
const CATEGORY_ORDER = ['WEB DESIGN', 'AI VIBE CODING']

/* ── 프로젝트 데이터 ── */
const PROJECTS = [
  {
    id: 1,
    title: '아카이브 커피',
    category: 'WEB DESIGN',
    badge: '자체제작',
    description:
      '원두 구매 및 납품 신청, 맞춤 컨설팅 문의 과정을 직관적인 동선으로 구현한 커피 비즈니스 사이트를 자체 제작해봤습니다.',
    thumbnail: thumbArchive,
    processImage: processArchive,
    processUrl: '',
    siteUrl: '',
  },
  {
    id: 2,
    title: '파리크라상',
    category: 'WEB DESIGN',
    badge: '리디자인',
    description:
      '업데이트가 오래되지 않았던 파리크라상 웹사이트를 2026년 트렌드에 맞춰 리디자인했습니다. 브랜드 컬러는 유지하고, 여백과 카드 UI를 재구성하여 보다 깔끔하고 직관적인 사용자 경험을 제공하도록 개선했습니다.',
    thumbnail: thumbParis,
    processUrl: '',
    siteUrl: 'https://pariscroissantorder.com/?NaPm=ct%3Dmtkg0pl9%7Cci%3DER0068d3d8%2Da6fe%2D11f1%2Db668%2D3eb4e95f5b38%7Ctr%3Dbrnd%7Chk%3Deb7824475665f67825b0dfd295ef3be1d3cdd402%7Cnacn%3DdApsB0w7fawmA',
  },
  {
    id: 3,
    title: '나뚜루',
    category: 'WEB DESIGN',
    badge: '리디자인',
    description:
      '스토어 중심 판매 구조에서 벗어나 브랜드 스토리를 전달하고자 여백과 자연 친화적 감성을 담은 웹사이트를 새롭게 기획했습니다. 기존의 올드한 디자인을 개선하고 따뜻하고 여유로운 레이아웃을 적용해 편안한 사용자 경험을 제공합니다.',
    thumbnail: thumbNatuur,
    processUrl: '',
    siteUrl: '',
  },
  {
    id: 4,
    title: '울산대학교병원',
    category: 'WEB DESIGN',
    badge: '리디자인',
    description:
      '지역 유일 상급종합병원의 전문성과 첨단 의료 기술을 사용자 중심의 간결하고 정돈된 인터페이스로 재구성한 웹 리디자인 프로젝트입니다. 환자들이 복잡한 절차 없이 빠르게 진료 정보와 예약 시스템을 이용할 수 있도록 UX/UI를 개선했습니다.',
    thumbnail: thumbHospital,
    processUrl: '',
    siteUrl: 'https://www.uuh.ulsan.kr/kr/',
  },
  {
    id: 5,
    title: '넷플릭스 스타일 OTT',
    category: 'AI VIBE CODING',
    badge: '자체제작',
    description:
      '넷플릭스를 벤치마킹해 OTT 콘텐츠 소개 랜딩페이지를 직접 기획하고 제작했습니다. 다크 테마 기반의 몰입감 있는 히어로 배너와 카테고리별 콘텐츠 탐색 구조로, 실제 OTT 서비스와 가까운 사용자 경험을 구현하는 데 집중했습니다.',
    thumbnail: thumbNetflix,
    processUrl: '',
    siteUrl: 'https://harube29-lang.github.io/home-ott/',
  },
]

/* ── 작업과정 모달 ── */
const ProcessModal = ({ project, onClose }) => {
  if (!project) return null
  return (
    <Dialog
      open={!!project}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, overflow: 'hidden', position: 'relative', m: { xs: 1, sm: 4 } } }}
    >
      <IconButton
        onClick={onClose}
        size="small"
        sx={{
          position: 'absolute', top: 12, right: 12, zIndex: 1,
          bgcolor: 'rgba(0,0,0,0.45)', color: '#fff',
          '&:hover': { bgcolor: 'rgba(0,0,0,0.65)' },
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      <DialogContent sx={{ p: 0, maxHeight: '85vh', overflowY: 'auto' }}>
        {project.processImage ? (
          <Box
            component="img"
            src={project.processImage}
            alt={`${project.title} 작업과정`}
            sx={{ width: '100%', height: 'auto', display: 'block' }}
          />
        ) : (
          <>
            <Box
              component="img"
              src={project.thumbnail}
              alt={project.title}
              sx={{ width: '100%', maxHeight: 480, objectFit: 'cover', display: 'block' }}
            />
            <Box sx={{ p: { xs: 3, md: 4 } }}>
              <Typography
                sx={{
                  fontSize: '0.68rem', fontWeight: 700,
                  color: CATEGORY_STYLES[project.category]?.color,
                  letterSpacing: '0.14em', textTransform: 'uppercase', mb: 1,
                }}
              >
                {project.category}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827' }}>
                  {project.title}
                </Typography>
                <Box
                  sx={{
                    px: 1.2, py: 0.3, borderRadius: 1,
                    bgcolor: 'rgba(255,122,0,0.1)',
                    color: 'primary.main',
                    fontSize: '0.72rem', fontWeight: 700,
                  }}
                >
                  {project.badge}
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.9 }}>
                {project.description}
              </Typography>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

/* ── 프로젝트 카드 ── */
const ProjectCard = ({ project, onProcess }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 3,
      overflow: 'hidden',
      border: '1px solid #E5E7EB',
      bgcolor: '#fff',
      transition: 'transform 0.22s ease, box-shadow 0.22s ease',
      '&:hover': {
        transform: 'translateY(-6px)',
        boxShadow: '0 16px 40px rgba(0,0,0,0.10)',
      },
    }}
  >
    {/* 썸네일 */}
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        paddingTop: '66%',
        overflow: 'hidden',
        bgcolor: '#F3F4F6',
        flexShrink: 0,
      }}
    >
      <Box
        component="img"
        src={project.thumbnail}
        alt={project.title}
        loading="lazy"
        sx={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          objectPosition: 'top',
          transition: 'transform 0.4s ease',
          '&:hover': { transform: 'scale(1.03)' },
        }}
      />
    </Box>

    {/* 텍스트 + 버튼 */}
    <Box sx={{ p: { xs: 2.5, md: 3 }, display: 'flex', flexDirection: 'column', flex: 1 }}>

      {/* 뱃지 + 제목 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.2 }}>
        <Box
          sx={{
            px: 1.2, py: 0.3, borderRadius: 1,
            bgcolor: 'rgba(255,122,0,0.08)',
            color: 'primary.main',
            fontSize: '0.68rem', fontWeight: 700, flexShrink: 0,
          }}
        >
          {project.badge}
        </Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: '1rem', color: '#111827' }}>
          {project.title}
        </Typography>
      </Box>

      {/* 설명 */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          lineHeight: 1.75,
          mb: 3,
          flex: 1,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {project.description}
      </Typography>

      {/* 버튼 영역 */}
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          size="small"
          onClick={() => onProcess(project)}
          sx={{
            bgcolor: '#111827',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.8rem',
            borderRadius: 2,
            px: 2.2,
            py: 0.9,
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': { bgcolor: '#374151', boxShadow: 'none' },
          }}
        >
          작업과정 보기
        </Button>

        {project.siteUrl && (
          <Button
            variant="outlined"
            size="small"
            href={project.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              borderColor: '#E5E7EB',
              color: '#6B7280',
              fontWeight: 600,
              fontSize: '0.8rem',
              borderRadius: 2,
              px: 2.2,
              py: 0.9,
              textTransform: 'none',
              '&:hover': { borderColor: '#9CA3AF', color: '#374151', bgcolor: 'transparent' },
            }}
          >
            기존 사이트 보기
          </Button>
        )}
      </Box>
    </Box>
  </Box>
)

/* ── 메인 페이지 ── */
const ProjectsPage = () => {
  const [selected, setSelected] = useState(null)

  const groupedProjects = CATEGORY_ORDER.reduce((acc, category) => {
    const items = PROJECTS.filter(p => p.category === category)
    if (items.length) acc.push({ category, items })
    return acc
  }, [])

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', px: { xs: 2, sm: 4, md: 6 }, py: { xs: 6, sm: 8, md: 12 } }}>

      {/* 헤더 */}
      <Typography
        variant="caption"
        sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', display: 'block', mb: 1, fontSize: '0.72rem' }}
      >
        Portfolio
      </Typography>
      <Typography variant="h1" sx={{ fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }, mb: 1, wordBreak: 'keep-all', color: '#111827' }}>
        작업물
      </Typography>
      <Box sx={{ width: 48, height: 3, background: 'linear-gradient(90deg, #FF7A00, #F04438)', borderRadius: 1, mb: 2 }} />
      <Typography variant="body1" color="text.secondary" sx={{ mb: { xs: 6, md: 8 }, wordBreak: 'keep-all' }}>
        직접 기획하고 디자인한 작업물들을 소개합니다.
      </Typography>

      {/* 카테고리별 섹션 */}
      {groupedProjects.map(({ category, items }, i) => {
        const style = CATEGORY_STYLES[category]
        return (
          <Box
            key={category}
            component="section"
            aria-label={`${category} 카테고리`}
            sx={{
              pt: i > 0 ? { xs: 6, md: 8 } : 0,
              mt: i > 0 ? { xs: 6, md: 8 } : 0,
              borderTop: i > 0 ? '1px solid #E5E7EB' : 'none',
              mb: { xs: 7, md: 9 },
            }}
          >
            {/* 섹션 헤더 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: { xs: 3, md: 4 } }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: style.color }} aria-hidden="true" />
              <Typography sx={{ fontSize: { xs: '0.85rem', md: '0.9rem' }, fontWeight: 700, color: style.color, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                {category}
              </Typography>
              <Box sx={{ flex: 1, height: '1px', bgcolor: '#F3F4F6' }} />
            </Box>

            {/* 2열 그리드 */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                gap: { xs: 3, md: 4 },
              }}
            >
              {items.map(project => (
                <ProjectCard key={project.id} project={project} onProcess={setSelected} />
              ))}
            </Box>
          </Box>
        )
      })}

      {/* 모달 */}
      <ProcessModal project={selected} onClose={() => setSelected(null)} />

    </Box>
  )
}

export default ProjectsPage
