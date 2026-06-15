import { useState, useEffect } from 'react'
import { keyframes } from '@emotion/react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Skeleton from '@mui/material/Skeleton'
import { Link } from 'react-router-dom'
import LaunchIcon from '@mui/icons-material/Launch'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { SiFigma, SiHtml5 } from 'react-icons/si'
import profileImg from '../assets/profile.jpg'
import ContactSection from '../components/Contact/ContactSection'
import { supabase } from '../lib/supabase'

/* ════════════════════════════════════════
   애니메이션 키프레임
════════════════════════════════════════ */
const float1 = keyframes`
  0%, 100% { transform: rotate(-10deg) translateY(0px);   }
  50%       { transform: rotate(-10deg) translateY(-22px); }
`
const float2 = keyframes`
  0%, 100% { transform: rotate(8deg) translateY(-8px);  }
  50%       { transform: rotate(8deg) translateY(-28px); }
`
const scrollBounce = keyframes`
  0%, 100% { transform: translateX(-50%) translateY(0);    opacity: 0.75; }
  50%       { transform: translateX(-50%) translateY(10px); opacity: 0.25; }
`
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0);    }
`
const fadeRight = keyframes`
  from { opacity: 0; transform: translateX(36px); }
  to   { opacity: 1; transform: translateX(0);    }
`

/* ════════════════════════════════════════
   스킬 퀵 바 데이터
════════════════════════════════════════ */
const SKILLS_BAR = [
  { name: 'Figma',          color: '#F24E1E' },
  { name: 'Adobe XD',       color: '#FF61F6' },
  { name: 'Photoshop',      color: '#31A8FF' },
  { name: 'Illustrator',    color: '#FF9A00' },
  { name: 'UI/UX Design',   color: '#FFFFFF' },
  { name: 'Web Publishing', color: '#E34F26' },
]

/* ════════════════════════════════════════
   폰 목업 스크린 Placeholder
════════════════════════════════════════ */
const PhoneScreen = ({ gradient }) => (
  <Box
    sx={{
      position: 'absolute', inset: 4,
      borderRadius: '18px',
      background: gradient,
      overflow: 'hidden',
    }}
  >
    {/*
      ↓ 실제 프로젝트 스크린샷으로 교체하세요.
      Replace this placeholder with:
        import mockupImg from '../assets/mockup1.png'
        <Box component="img" src={mockupImg}
             sx={{ width:'100%', height:'100%', objectFit:'cover', borderRadius:'inherit' }} />
    */}
    <Box sx={{ p: 1.5, pt: 2.8 }}>
      {/* 상태바 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5, px: 0.5 }}>
        <Box sx={{ width: 28, height: 3, bgcolor: 'rgba(255,255,255,0.55)', borderRadius: 1 }} />
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {[14, 10, 12].map((w, i) => (
            <Box key={i} sx={{ width: w, height: 3, bgcolor: 'rgba(255,255,255,0.55)', borderRadius: 1 }} />
          ))}
        </Box>
      </Box>
      {/* 타이틀 스켈레톤 */}
      <Box sx={{ width: '55%', height: 7, bgcolor: 'rgba(255,255,255,0.65)', borderRadius: 1, mb: 0.8 }} />
      <Box sx={{ width: '80%', height: 3.5, bgcolor: 'rgba(255,255,255,0.3)', borderRadius: 1, mb: 0.5 }} />
      <Box sx={{ width: '65%', height: 3.5, bgcolor: 'rgba(255,255,255,0.3)', borderRadius: 1, mb: 2 }} />
      {/* 이미지 영역 */}
      <Box
        sx={{ height: 58, bgcolor: 'rgba(255,255,255,0.14)', borderRadius: 2, mb: 1.5,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.28)' }} />
      </Box>
      {/* 카드 3열 */}
      <Box sx={{ display: 'flex', gap: 0.5, mb: 1.5 }}>
        {[1, 2, 3].map(i => (
          <Box key={i} sx={{ flex: 1, height: 34, bgcolor: 'rgba(255,255,255,0.12)', borderRadius: 1.5 }} />
        ))}
      </Box>
      {/* 텍스트 줄 */}
      <Box sx={{ width: '88%', height: 3, bgcolor: 'rgba(255,255,255,0.22)', borderRadius: 1, mb: 0.5 }} />
      <Box sx={{ width: '72%', height: 3, bgcolor: 'rgba(255,255,255,0.22)', borderRadius: 1 }} />
    </Box>
  </Box>
)

/* ════════════════════════════════════════
   Skills 섹션 데이터
════════════════════════════════════════ */
const SKILLS = [
  { type: 'react-icon', icon: SiFigma,  name: 'Figma',        level: '활용 가능', stars: 4, color: '#F24E1E', bgColor: '#FFF1EE' },
  { type: 'adobe',  letter: 'Ai',       name: 'Illustrator',  level: '활용 가능', stars: 4, color: '#FF9A00', bgColor: '#FFF8EE', adobeBg: '#2C0A00' },
  { type: 'adobe',  letter: 'Ps',       name: 'Photoshop',    level: '기초 가능', stars: 3, color: '#31A8FF', bgColor: '#EEF7FF', adobeBg: '#001E36' },
  { type: 'react-icon', icon: SiHtml5,  name: 'HTML5',        level: '기초 가능', stars: 3, color: '#E34F26', bgColor: '#FFF1EE' },
]

const Stars = ({ count, color }) => (
  <Box sx={{ display: 'flex', gap: 0.4 }}>
    {[1, 2, 3, 4, 5].map(n => (
      <Box key={n} sx={{ width: 8, height: 8, borderRadius: '50%',
                         bgcolor: n <= count ? color : '#E5E7EB', transition: 'background 0.2s' }} />
    ))}
  </Box>
)

const SkillCard = ({ skill }) => {
  const [hovered, setHovered] = useState(false)
  const { type, icon: Icon, letter, name, level, stars, color, bgColor, adobeBg } = skill
  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5,
            p: { xs: 3, md: 3.5 }, borderRadius: 3, border: '1.5px solid',
            borderColor: hovered ? color : '#E5E7EB',
            bgcolor: hovered ? bgColor : '#FFFFFF', cursor: 'default',
            transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
            boxShadow: hovered ? `0 12px 32px ${color}28` : '0 1px 4px rgba(0,0,0,0.06)',
            transition: 'all 0.25s cubic-bezier(.34,1.56,.64,1)' }}
    >
      {type === 'react-icon'
        ? <Icon size={52} color={hovered ? color : '#9CA3AF'} style={{ transition: 'color 0.25s' }} />
        : <Box sx={{ width: 52, height: 52, borderRadius: 1.5,
                     bgcolor: hovered ? adobeBg : '#F3F4F6',
                     display: 'flex', alignItems: 'center', justifyContent: 'center',
                     transition: 'background 0.25s' }}>
            <Typography sx={{ color: hovered ? color : '#9CA3AF', fontWeight: 700,
                               fontSize: '1.1rem', fontFamily: '"Arial", sans-serif',
                               letterSpacing: '-0.03em', transition: 'color 0.25s' }}>
              {letter}
            </Typography>
          </Box>
      }
      <Typography variant="body2"
        sx={{ fontWeight: 600, color: hovered ? '#111827' : '#6B7280',
              fontSize: '0.875rem', transition: 'color 0.2s' }}>
        {name}
      </Typography>
      <Stars count={stars} color={color} />
      <Box sx={{ px: 1.2, py: 0.35, borderRadius: 1,
                 bgcolor: hovered ? color : '#F3F4F6', transition: 'background 0.25s' }}>
        <Typography sx={{ fontSize: '0.68rem', fontWeight: 600,
                           color: hovered ? '#FFFFFF' : '#9CA3AF', transition: 'color 0.25s' }}>
          {level}
        </Typography>
      </Box>
    </Box>
  )
}

/* ════════════════════════════════════════
   Projects 카드 (홈 미리보기)
════════════════════════════════════════ */
const HomeProjectCard = ({ project }) => {
  const [imgError, setImgError] = useState(false)
  return (
    <Box sx={{ flex: '1 0 280px', minWidth: 280, borderRadius: 3, border: '1px solid #E5E7EB',
               bgcolor: '#fff', overflow: 'hidden',
               transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
               '&:hover': { transform: 'translateY(-5px)',
                            boxShadow: '0 12px 36px rgba(255,122,0,0.14)', borderColor: '#FF7A00' } }}>
      <Box sx={{ position: 'relative', width: '100%', paddingTop: '56.25%', overflow: 'hidden' }}>
        {imgError || !project.thumbnail_url ? (
          <Box sx={{ position: 'absolute', inset: 0,
                     background: 'linear-gradient(135deg, #FF7A00 0%, #F04438 100%)',
                     display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ color: '#fff', fontWeight: 700, opacity: 0.85, fontSize: '0.95rem', px: 2, textAlign: 'center' }}>
              {project.title}
            </Typography>
          </Box>
        ) : (
          <Box component="img" src={project.thumbnail_url} alt={project.title}
               onError={() => setImgError(true)}
               sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
                     transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.04)' } }} />
        )}
      </Box>
      <Box sx={{ p: 2.5 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '1rem', mb: 1, color: '#111827', lineHeight: 1.4 }}>
          {project.title}
        </Typography>
        <Typography variant="body2" color="text.secondary"
          sx={{ mb: 2, display: '-webkit-box', WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.65 }}>
          {project.description}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
          {project.tech_stack?.slice(0, 3).map(tech => (
            <Chip key={tech} label={tech} size="small"
              sx={{ bgcolor: 'rgba(255,122,0,0.08)', color: '#FF7A00',
                    fontWeight: 600, fontSize: '0.68rem', height: 22, borderRadius: 1 }} />
          ))}
        </Box>
        {project.detail_url && (
          <Button variant="outlined" size="small" startIcon={<LaunchIcon sx={{ fontSize: 13 }} />}
            href={project.detail_url} target="_blank" rel="noopener noreferrer"
            sx={{ fontSize: '0.78rem', py: 0.8 }}>
            자세히 보기
          </Button>
        )}
      </Box>
    </Box>
  )
}

const ProjectSkeleton = () => (
  <Box sx={{ flex: '1 0 280px', minWidth: 280, borderRadius: 3, border: '1px solid #E5E7EB', overflow: 'hidden' }}>
    <Skeleton variant="rectangular" sx={{ width: '100%', paddingTop: '56.25%' }} />
    <Box sx={{ p: 2.5 }}>
      <Skeleton variant="text" width="70%" height={22} sx={{ mb: 1 }} />
      <Skeleton variant="text" /><Skeleton variant="text" width="85%" sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
        <Skeleton variant="rounded" width={48} height={22} />
        <Skeleton variant="rounded" width={40} height={22} />
      </Box>
      <Skeleton variant="rounded" width={100} height={30} />
    </Box>
  </Box>
)

/* ════════════════════════════════════════
   공통 섹션 래퍼 / 레이블
════════════════════════════════════════ */
const Section = ({ id, bg, children }) => (
  <Box id={id} component="section"
    sx={{ backgroundColor: bg || 'background.default',
          py: { xs: 10, sm: 14, md: 18 }, px: { xs: 3, sm: 5, md: 8 } }}>
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>{children}</Box>
  </Box>
)

const Label = ({ children }) => (
  <Typography variant="caption"
    sx={{ display: 'inline-block', color: 'primary.main', fontWeight: 700,
          letterSpacing: '0.16em', textTransform: 'uppercase', fontSize: '0.72rem', mb: 1.5 }}>
    {children}
  </Typography>
)

/* ════════════════════════════════════════
   HomePage
════════════════════════════════════════ */
const HomePage = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('projects').select('*').eq('is_published', true)
      .order('sort_order', { ascending: true }).limit(3)
      .then(({ data }) => { if (data) setProjects(data); setLoading(false) })
  }, [])

  return (
    <Box>

      {/* ══════════════════════════════════════
          1. HERO
      ══════════════════════════════════════ */}
      <Box
        id="hero"
        component="section"
        sx={{
          position: 'relative',
          background: 'linear-gradient(135deg, #FF7A00 0%, #F04438 100%)',
          pt: { xs: 14, sm: 18, md: 22 },
          pb: 0,
          px: { xs: 3, sm: 5, md: 8 },
          overflow: 'hidden',
        }}
      >
        {/* 배경 데코 원 */}
        <Box sx={{ position: 'absolute', top: -140, right: -80, width: 420, height: 420,
                   borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', bottom: 140, left: -100, width: 300, height: 300,
                   borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />

        {/* ── 메인 콘텐츠 (텍스트 좌 + 목업 우) ── */}
        <Box
          sx={{ maxWidth: 1200, mx: 'auto',
                display: 'flex', flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center', gap: { xs: 8, md: 4 } }}
        >

          {/* ── 좌: 텍스트 그룹 ── */}
          <Box sx={{ flex: 1, animation: `${fadeUp} 0.7s ease both` }}>

            {/* 뱃지 */}
            <Box
              sx={{ display: 'inline-flex', alignItems: 'center', gap: 1,
                    bgcolor: 'rgba(255,255,255,0.16)', backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.28)',
                    px: 2, py: 0.9, borderRadius: '100px', mb: 3.5,
                    animation: `${fadeUp} 0.5s ease both` }}
            >
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#fff', opacity: 0.9 }} />
              <Typography
                sx={{ color: '#fff', fontSize: '0.7rem', fontWeight: 700,
                      letterSpacing: '0.22em', textTransform: 'uppercase' }}
              >
                UX / UI Designer
              </Typography>
            </Box>

            {/* 메인 헤드라인 — 대형 */}
            <Typography
              variant="h1"
              sx={{ color: '#FFFFFF',
                    fontSize: { xs: '2.9rem', sm: '3.8rem', md: '4.8rem' },
                    fontWeight: 800, lineHeight: 1.0,
                    mb: 3, wordBreak: 'keep-all', letterSpacing: '-0.03em',
                    animation: `${fadeUp} 0.65s 0.1s ease both`,
                    '& span': { display: 'block' } }}
            >
              <span>사용자의</span>
              <span>흐름을</span>
              <span>설계합니다.</span>
            </Typography>

            {/* 서브 카피 */}
            <Typography
              sx={{ color: 'rgba(255,255,255,0.76)', maxWidth: 420, lineHeight: 1.9,
                    mb: 5, fontSize: { xs: '0.95rem', md: '1.05rem' }, wordBreak: 'keep-all',
                    animation: `${fadeUp} 0.65s 0.22s ease both` }}
            >
              섬세함으로 불편함을 읽고,<br />심플함으로 해결합니다.
            </Typography>

            {/* CTA 버튼 */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap',
                       animation: `${fadeUp} 0.65s 0.34s ease both` }}>
              <Button
                variant="contained"
                component={Link}
                to="/projects"
                size="large"
                sx={{ bgcolor: '#FFFFFF', color: '#FF7A00', fontWeight: 700,
                      px: 3.5, py: 1.5, background: '#FFFFFF',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
                      transition: 'all 0.3s cubic-bezier(.34,1.56,.64,1)',
                      '&:hover': { bgcolor: '#FFF5EE', background: '#FFF5EE',
                                   boxShadow: '0 8px 30px rgba(0,0,0,0.22)',
                                   transform: 'scale(1.06) translateY(-3px)' } }}
              >
                작업물 보기
              </Button>
              <Button
                variant="outlined"
                component={Link}
                to="/about"
                size="large"
                sx={{ borderColor: 'rgba(255,255,255,0.6)', color: '#FFFFFF',
                      fontWeight: 600, px: 3.5, py: 1.5, borderWidth: '1.5px',
                      backdropFilter: 'blur(4px)',
                      transition: 'all 0.3s cubic-bezier(.34,1.56,.64,1)',
                      '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.18)',
                                   borderWidth: '1.5px',
                                   transform: 'scale(1.06) translateY(-3px)' } }}
              >
                About Me
              </Button>
            </Box>
          </Box>

          {/* ── 우: 폰 목업 플로팅 영역 ── */}
          <Box
            sx={{ flexShrink: 0, position: 'relative',
                  width: { sm: 300, md: 380 }, height: { sm: 360, md: 460 },
                  display: { xs: 'none', sm: 'block' },
                  animation: `${fadeRight} 0.8s 0.15s ease both` }}
          >
            {/* 배경 glow */}
            <Box sx={{ position: 'absolute', top: '50%', left: '50%',
                       transform: 'translate(-50%, -50%)',
                       width: 260, height: 260, borderRadius: '50%',
                       background: 'radial-gradient(circle, rgba(255,255,255,0.14) 0%, transparent 70%)',
                       pointerEvents: 'none' }} />

            {/* 스몰 데코 닷 */}
            {[[14, 30], [240, 50], [30, 300], [260, 320]].map(([x, y], i) => (
              <Box key={i} sx={{ position: 'absolute', left: x, top: y,
                                 width: 6, height: 6, borderRadius: '50%',
                                 bgcolor: 'rgba(255,255,255,0.3)' }} />
            ))}

            {/* ── Phone 1 — 왼쪽 뒤 (보라/파랑 테마) ── */}
            <Box
              sx={{ position: 'absolute',
                    left: { sm: 8, md: 10 }, top: { sm: 70, md: 90 },
                    width: { sm: 128, md: 148 }, height: { sm: 258, md: 298 },
                    borderRadius: '22px',
                    background: '#1A1A2E',
                    border: '2.5px solid rgba(255,255,255,0.2)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
                    overflow: 'hidden', zIndex: 1,
                    animation: `${float1} 4s ease-in-out infinite` }}
            >
              <Box sx={{ position: 'absolute', top: 7, left: '50%', transform: 'translateX(-50%)',
                         width: 50, height: 10, bgcolor: '#1A1A2E', borderRadius: 5, zIndex: 2 }} />
              <PhoneScreen gradient="linear-gradient(160deg, #6C63FF 0%, #3A86FF 100%)" />
              <Box sx={{ position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)',
                         width: 36, height: 3.5, bgcolor: 'rgba(255,255,255,0.35)', borderRadius: 2 }} />
            </Box>

            {/* ── Phone 2 — 오른쪽 앞 (오렌지 테마) ── */}
            <Box
              sx={{ position: 'absolute',
                    right: { sm: 8, md: 10 }, top: { sm: 8, md: 10 },
                    width: { sm: 148, md: 172 }, height: { sm: 296, md: 344 },
                    borderRadius: '26px',
                    background: '#1A1A2E',
                    border: '2.5px solid rgba(255,255,255,0.28)',
                    boxShadow: '0 28px 72px rgba(0,0,0,0.55)',
                    overflow: 'hidden', zIndex: 2,
                    animation: `${float2} 4.8s 0.7s ease-in-out infinite` }}
            >
              <Box sx={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
                         width: 58, height: 12, bgcolor: '#1A1A2E', borderRadius: 6, zIndex: 2 }} />
              <PhoneScreen gradient="linear-gradient(160deg, #FF7A00 0%, #F04438 100%)" />
              <Box sx={{ position: 'absolute', bottom: 7, left: '50%', transform: 'translateX(-50%)',
                         width: 44, height: 4, bgcolor: 'rgba(255,255,255,0.4)', borderRadius: 2 }} />
            </Box>
          </Box>
        </Box>

        {/* ── 스크롤 유도 화살표 ── */}
        <Box
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          sx={{ position: 'absolute', bottom: { xs: 86, md: 102 }, left: '50%',
                animation: `${scrollBounce} 2.3s ease-in-out infinite`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.3,
                cursor: 'pointer', userSelect: 'none',
                '&:hover': { opacity: 1 } }}
        >
          <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.58rem', fontWeight: 700,
                             letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Scroll
          </Typography>
          <KeyboardArrowDownIcon sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 17 }} />
        </Box>

        {/* ── 역량 퀵 바 (Glassmorphism) ── */}
        <Box
          sx={{ mt: { xs: 8, md: 14 },
                mx: { xs: -3, sm: -5, md: -8 },
                px: { xs: 3, sm: 5, md: 8 },
                py: { xs: 2.2, md: 2.8 },
                background: 'rgba(255,255,255,0.10)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderTop: '1px solid rgba(255,255,255,0.18)' }}
        >
          <Box
            sx={{ maxWidth: 1200, mx: 'auto',
                  display: 'flex', flexWrap: 'wrap',
                  gap: { xs: 2, md: 0 }, alignItems: 'center',
                  justifyContent: { xs: 'center', md: 'flex-start' } }}
          >
            {SKILLS_BAR.map((s, i) => (
              <Box key={s.name}
                sx={{ display: 'flex', alignItems: 'center',
                      px: { xs: 0, md: i === 0 ? 0 : 3 },
                      gap: 1, opacity: 0.82,
                      transition: 'opacity 0.2s', '&:hover': { opacity: 1 } }}
              >
                <Box
                  sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: s.color, flexShrink: 0,
                        boxShadow: `0 0 7px ${s.color}` }}
                />
                <Typography
                  sx={{ color: 'rgba(255,255,255,0.9)', fontSize: { xs: '0.75rem', md: '0.81rem' },
                        fontWeight: 500, letterSpacing: '0.01em', whiteSpace: 'nowrap' }}
                >
                  {s.name}
                </Typography>
                {i < SKILLS_BAR.length - 1 && (
                  <Box sx={{ display: { xs: 'none', md: 'block' },
                             width: 1, height: 14, bgcolor: 'rgba(255,255,255,0.22)',
                             ml: 3, flexShrink: 0 }} />
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      {/* ── Hero 끝 ── */}


      {/* ══════════════════════════════════════
          2. About Me
      ══════════════════════════════════════ */}
      <Section id="about" bg="#FFFFFF">
        <Box
          sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center', gap: { xs: 5, md: 10 } }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Label>About Me</Label>
            <Typography variant="h2"
              sx={{ fontSize: { xs: '1.6rem', sm: '2rem', md: '2.25rem' }, mb: 1.5, wordBreak: 'keep-all' }}>
              안녕하세요,<br />황혜경입니다.
            </Typography>
            <Box sx={{ width: 40, height: 3, bgcolor: 'primary.main', borderRadius: 1, mb: 3 }} />
            <Typography variant="body1"
              sx={{ color: 'text.secondary', lineHeight: 1.9, mb: 4, wordBreak: 'keep-all' }}>
              동명대학교 산업디자인전공을 졸업하고, UX/UI 디자이너로 전향한 신입입니다.<br />
              전직을 고민하던 중 실제 UX 개선 과정을 접하며 데이터와 사용자 관점 기반의
              문제 해결 디자인의 중요성을 이해했습니다.<br /><br />
              보기 좋은 디자인이 아닌, 사용자 문제를 해결하는 설계 중심의 UX/UI 디자이너를
              목표로 성장 중입니다.
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/about"
              size="large" sx={{ px: 3.5, py: 1.4 }}>
              더 알아보기
            </Button>
          </Box>
          <Box sx={{ flexShrink: 0, display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
            <Box component="img" src={profileImg} alt="황혜경 프로필"
              sx={{ width: { xs: 160, sm: 200, md: 240 }, height: { xs: 160, sm: 200, md: 240 },
                    borderRadius: 3, objectFit: 'cover',
                    boxShadow: '0 8px 28px rgba(0,0,0,0.12)', display: 'block' }} />
          </Box>
        </Box>
      </Section>


      {/* ══════════════════════════════════════
          3. Skills
      ══════════════════════════════════════ */}
      <Section id="skills" bg="#F9FAFB">
        <Box sx={{ mb: { xs: 5, md: 7 } }}>
          <Label>Skills</Label>
          <Typography variant="h2"
            sx={{ fontSize: { xs: '1.6rem', sm: '2rem', md: '2.25rem' }, wordBreak: 'keep-all' }}>
            사용 도구
          </Typography>
          <Box sx={{ width: 40, height: 3, bgcolor: 'primary.main', borderRadius: 1, mt: 1.5 }} />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            아이콘에 마우스를 올려보세요
          </Typography>
        </Box>
        <Box sx={{ display: 'grid',
                   gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
                   gap: { xs: 2, md: 2.5 } }}>
          {SKILLS.map(skill => <SkillCard key={skill.name} skill={skill} />)}
        </Box>
      </Section>


      {/* ══════════════════════════════════════
          4. Projects
      ══════════════════════════════════════ */}
      <Section id="projects" bg="#FFFFFF">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                   mb: { xs: 5, md: 7 }, flexWrap: 'wrap', gap: 3 }}>
          <Box>
            <Label>Projects</Label>
            <Typography variant="h2"
              sx={{ fontSize: { xs: '1.6rem', sm: '2rem', md: '2.25rem' }, wordBreak: 'keep-all' }}>
              주요 프로젝트
            </Typography>
            <Box sx={{ width: 40, height: 3, bgcolor: 'primary.main', borderRadius: 1, mt: 1.5 }} />
          </Box>
          <Button variant="outlined" color="primary" component={Link} to="/projects" sx={{ px: 2.5, py: 1 }}>
            전체 보기 →
          </Button>
        </Box>
        <Box
          sx={{ display: 'flex', gap: { xs: 2, md: 3 }, overflowX: 'auto', pb: 1,
                '&::-webkit-scrollbar': { height: 4 },
                '&::-webkit-scrollbar-thumb': { backgroundColor: '#D1D5DB', borderRadius: 2 } }}
        >
          {loading
            ? [1, 2, 3].map(n => <ProjectSkeleton key={n} />)
            : projects.length > 0
              ? projects.map(p => <HomeProjectCard key={p.id} project={p} />)
              : [1, 2, 3].map(n => (
                  <Box key={n}
                    sx={{ flex: '1 0 280px', minWidth: 280, minHeight: 200,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          borderRadius: 3, border: '1px dashed #E5E7EB' }}>
                    <Typography variant="body2" color="text.disabled">준비 중입니다</Typography>
                  </Box>
                ))
          }
        </Box>
      </Section>


      {/* ══════════════════════════════════════
          5. Contact
      ══════════════════════════════════════ */}
      <ContactSection />

    </Box>
  )
}

export default HomePage
