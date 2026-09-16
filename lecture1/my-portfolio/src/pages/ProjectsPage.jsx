import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import thumbArchive  from '../assets/thumb_archive.png'
import thumbParis    from '../assets/thumb_paris.png'
import thumbNatuur   from '../assets/thumb_natuur.png'
import thumbHospital from '../assets/thumb_hospital.png'
import thumbNetflix  from '../assets/thumb_netflix.jpg'

import detailArchive  from '../assets/detail_archive.png'
import detailParis    from '../assets/detail_paris.png'
import detailNatuur   from '../assets/detail_natuur.png'
import detailHospital from '../assets/detail_hospital.png'

import landingArchive     from '../assets/landing_archive.png'
import detailPageArchive  from '../assets/detailpage_archive.png'
import landingNatuur      from '../assets/landing_natuur.jpg'
import detailPageNatuur   from '../assets/detailpage_natuur.jpg'

import workParisHome      from '../assets/work_paris_home.png'
import workParisProduct   from '../assets/work_paris_product.png'
import workParisOrder     from '../assets/work_paris_order.png'
import workParisCommunity from '../assets/work_paris_community.png'

import workHospitalHome   from '../assets/work_hospital_home.png'

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
    detailImage: detailArchive,
    detailImageSize: [1440, 4000],
    workImages: [
      { src: landingArchive, size: [1920, 5825] },
      { src: detailPageArchive, size: [1920, 5300] },
    ],
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
    detailImage: detailParis,
    detailImageSize: [1440, 4405],
    workImages: [
      { src: workParisHome, size: [1920, 3912] },
      { src: workParisProduct, size: [1920, 5130] },
      { src: workParisOrder, size: [1920, 3227] },
      { src: workParisCommunity, size: [1920, 2965] },
    ],
    siteUrl: 'https://pariscroissantorder.com/?NaPm=ct%3Dmtx5tqve%7Cci%3DER53e2ead2%2Dadfc%2D11f1%2Da9b8%2D6e3ae24fc82e%7Ctr%3Dbrnd%7Chk%3Dca62ee4eb5828d8b1dea8343e805e71e5f25f704%7Cnacn%3DdApsB0w7fawmA',
  },
  {
    id: 3,
    title: '나뚜루',
    category: 'WEB DESIGN',
    badge: '리디자인',
    description:
      '스토어 중심 판매 구조에서 벗어나 브랜드 스토리를 전달하고자 여백과 자연 친화적 감성을 담은 웹사이트를 새롭게 기획했습니다. 기존의 올드한 디자인을 개선하고 따뜻하고 여유로운 레이아웃을 적용해 편안한 사용자 경험을 제공합니다.',
    thumbnail: thumbNatuur,
    detailImage: detailNatuur,
    detailImageSize: [1440, 4485],
    workImages: [
      { src: landingNatuur, size: [1920, 4900] },
      { src: detailPageNatuur, size: [1920, 4384] },
    ],
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
    detailImage: detailHospital,
    detailImageSize: [1440, 4913],
    workImages: [
      { src: workHospitalHome, size: [1920, 5000] },
    ],
    siteUrl: 'https://www.uuh.ulsan.kr/kr/',
  },
  {
    id: 5,
    title: '넷플릭스st OTT',
    category: 'AI VIBE CODING',
    badge: '자체제작',
    description:
      '넷플릭스를 벤치마킹해 OTT 콘텐츠 소개 랜딩페이지를 직접 기획하고 제작했습니다. 다크 테마 기반의 몰입감 있는 히어로 배너와 카테고리별 콘텐츠 탐색 구조로, 실제 OTT 서비스와 가까운 사용자 경험을 구현하는 데 집중했습니다.',
    thumbnail: thumbNetflix,
    siteUrl: 'https://harube29-lang.github.io/home-ott/',
  },
]

/* ── 작업내용 모달 (기존 사이트가 없는 프로젝트용) ── */
const DetailModal = ({ project, onClose }) => {
  const theme = useTheme()
  const fullScreenMobile = useMediaQuery(theme.breakpoints.down('sm'))
  if (!project) return null
  return (
    <Dialog
      open={!!project}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={fullScreenMobile}
      PaperProps={{ sx: { borderRadius: { xs: 0, sm: 3 }, overflow: 'hidden', position: 'relative' } }}
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

      <DialogContent sx={{ p: 0, maxHeight: { xs: '100%', sm: '85vh' }, overflowY: 'auto' }}>
        <Box
          component="img"
          src={project.detailImage || project.thumbnail}
          alt={project.title}
          width={project.detailImageSize?.[0]}
          height={project.detailImageSize?.[1]}
          sx={
            project.detailImage
              ? { width: '100%', height: 'auto', aspectRatio: `${project.detailImageSize[0]} / ${project.detailImageSize[1]}`, display: 'block', bgcolor: '#F3F4F6' }
              : { width: '100%', maxHeight: 480, objectFit: 'cover', display: 'block' }
          }
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
      </DialogContent>
    </Dialog>
  )
}

/* ── 작업물 보기 모달 (랜딩 페이지 → 상세 페이지 순서로 스크롤) ── */
const WorkImagesModal = ({ project, onClose }) => {
  const theme = useTheme()
  const fullScreenMobile = useMediaQuery(theme.breakpoints.down('sm'))
  if (!project) return null
  return (
    <Dialog
      open={!!project}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={fullScreenMobile}
      PaperProps={{ sx: { borderRadius: { xs: 0, sm: 3 }, overflow: 'hidden', position: 'relative' } }}
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

      <DialogContent sx={{ p: 0, maxHeight: { xs: '100%', sm: '85vh' }, overflowY: 'auto' }}>
        {project.workImages.map(({ src, size }, idx) => (
          <Box
            key={idx}
            component="img"
            src={src}
            alt={`${project.title} 작업물 ${idx + 1}`}
            width={size?.[0]}
            height={size?.[1]}
            sx={{
              width: '100%',
              height: 'auto',
              aspectRatio: size ? `${size[0]} / ${size[1]}` : undefined,
              display: 'block',
              bgcolor: '#F3F4F6',
            }}
          />
        ))}
      </DialogContent>
    </Dialog>
  )
}

/* ── 프로젝트 카드
   모바일(xs): 이미지 · 뱃지 · 제목 · '작업물 보기' 버튼 하나만 (1열, 이미지를 크게)
   태블릿/PC(sm↑): 기존 레이아웃 유지 (설명 + 버튼 3종)
── */
const ProjectCard = ({ project, onView, onViewWork }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
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
    {/* 썸네일 — 모바일은 1열로 넓어진 만큼 살짝 낮은 비율로 이미지를 더 크게 보여줌 */}
    <Box
      className="thumb-hover-group"
      sx={{
        position: 'relative',
        width: '100%',
        paddingTop: { xs: '58%', sm: '66%' },
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
          '.thumb-hover-group:hover &': { transform: 'scale(1.03)' },
        }}
      />
    </Box>

    {/* 텍스트 + 버튼 */}
    <Box sx={{ p: { xs: 2.2, sm: 2.5, md: 3 }, display: 'flex', flexDirection: 'column', flex: 1 }}>

      {/* 뱃지 + 제목 (제목은 별도 줄 + keep-all로 한 글자씩 줄바꿈되는 것을 방지) */}
      <Box sx={{ mb: { xs: 1.4, sm: 1.2 } }}>
        <Box
          sx={{
            display: 'inline-block',
            px: 1.2, py: 0.3, borderRadius: 1,
            bgcolor: 'rgba(255,122,0,0.08)',
            color: 'primary.main',
            fontSize: '0.68rem', fontWeight: 700,
            whiteSpace: 'nowrap',
            mb: 0.8,
          }}
        >
          {project.badge}
        </Box>
        <Typography
          variant="subtitle1"
          sx={{
            width: '100%',
            fontWeight: 700,
            fontSize: '1rem',
            color: '#111827',
            lineHeight: 1.35,
            wordBreak: 'keep-all',
            overflowWrap: 'break-word',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.title}
        </Typography>
      </Box>

      {/* 설명 — 모바일에서는 숨기고 sm 이상에서만 노출 */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          display: { xs: 'none', sm: '-webkit-box' },
          lineHeight: 1.75,
          mb: 3,
          flex: 1,
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {project.description}
      </Typography>

      {/* 버튼 영역 — 모바일에서도 한 줄 유지 (줄바꿈 없이 균등 분배, 살짝 축소) */}
      <Box sx={{ display: 'flex', gap: { xs: 0.8, sm: 1.5 }, flexWrap: { xs: 'nowrap', sm: 'wrap' }, mt: 'auto' }}>
        {project.workImages && (
          <Button
            variant="outlined"
            size="small"
            onClick={() => onViewWork(project)}
            sx={{
              flex: { xs: '1 1 0', sm: '0 0 auto' },
              minWidth: 0,
              borderColor: '#E5E7EB',
              color: '#6B7280',
              fontWeight: 600,
              fontSize: { xs: '0.7rem', sm: '0.8rem' },
              borderRadius: 2,
              px: { xs: 0.8, sm: 2.2 },
              py: { xs: 0.65, sm: 0.9 },
              textTransform: 'none',
              whiteSpace: 'nowrap',
              '&:hover': { borderColor: '#9CA3AF', color: '#374151', bgcolor: 'transparent' },
            }}
          >
            결과물
          </Button>
        )}
        <Button
          variant="outlined"
          size="small"
          {...(project.detailImage
            ? { onClick: () => onView(project) }
            : { href: project.siteUrl, target: '_blank', rel: 'noopener noreferrer' })}
          sx={{
            flex: { xs: '1 1 0', sm: '0 0 auto' },
            minWidth: 0,
            borderColor: '#E5E7EB',
            color: '#6B7280',
            fontWeight: 600,
            fontSize: { xs: '0.7rem', sm: '0.8rem' },
            borderRadius: 2,
            px: { xs: 0.8, sm: 2.2 },
            py: { xs: 0.65, sm: 0.9 },
            textTransform: 'none',
            whiteSpace: 'nowrap',
            '&:hover': { borderColor: '#9CA3AF', color: '#374151', bgcolor: 'transparent' },
          }}
        >
          작업과정 보기
        </Button>
        {project.detailImage && project.siteUrl && (
          <Button
            variant="outlined"
            size="small"
            href={project.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              flex: { xs: '1 1 0', sm: '0 0 auto' },
              minWidth: 0,
              borderColor: '#E5E7EB',
              color: '#6B7280',
              fontWeight: 600,
              fontSize: { xs: '0.7rem', sm: '0.8rem' },
              borderRadius: 2,
              px: { xs: 0.8, sm: 2.2 },
              py: { xs: 0.65, sm: 0.9 },
              textTransform: 'none',
              whiteSpace: 'nowrap',
              '&:hover': { borderColor: '#9CA3AF', color: '#374151', bgcolor: 'transparent' },
            }}
          >
            기존사이트보기
          </Button>
        )}
      </Box>
    </Box>
  </Box>
)

/* ── 메인 페이지 ── */
const ProjectsPage = () => {
  const [selected, setSelected] = useState(null)
  const [workSelected, setWorkSelected] = useState(null)

  const groupedProjects = CATEGORY_ORDER.reduce((acc, category) => {
    const items = PROJECTS.filter(p => p.category === category)
    if (items.length) acc.push({ category, items })
    return acc
  }, [])

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', px: { xs: 2.5, sm: 4, md: 6 }, py: { xs: 6, sm: 8, md: 12 } }}>

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

            {/* 모바일 1열 / sm 이상 2열 그리드 */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                gap: { xs: 2.5, sm: 3, md: 4 },
              }}
            >
              {items.map(project => (
                <ProjectCard key={project.id} project={project} onView={setSelected} onViewWork={setWorkSelected} />
              ))}
            </Box>
          </Box>
        )
      })}

      {/* 작업내용 모달 */}
      <DetailModal project={selected} onClose={() => setSelected(null)} />

      {/* 작업물 보기 모달 */}
      <WorkImagesModal project={workSelected} onClose={() => setWorkSelected(null)} />

    </Box>
  )
}

export default ProjectsPage
