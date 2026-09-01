import { useState, useEffect, memo } from 'react'
import { keyframes } from '@emotion/react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { Link } from 'react-router-dom'
import { alpha } from '@mui/material/styles'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import profileImg from '../assets/profile.jpg'
import thumbArchive  from '../assets/thumb_archive.png'
import thumbParis    from '../assets/thumb_paris.png'
import thumbNatuur   from '../assets/thumb_natuur.png'
import thumbHospital from '../assets/thumb_hospital.png'
import thumbNetflix  from '../assets/thumb_netflix.jpg'
import ContactSection from '../components/Contact/ContactSection'
import { usePortfolio, CATEGORY_COLORS } from '../context/PortfolioContext'

const CATEGORY_COLORS_PROJECT = {
  'WEB DESIGN':     '#9CA3AF',
  'AI VIBE CODING': '#C4B5FD',
}

const HOME_PROJECTS = [
  { id: 1, title: '아카이브 커피',       category: 'WEB DESIGN',     badge: '자체제작', thumbnail: thumbArchive  },
  { id: 2, title: '파리크라상',          category: 'WEB DESIGN',     badge: '리디자인', thumbnail: thumbParis    },
  { id: 3, title: '나뚜루',              category: 'WEB DESIGN',     badge: '리디자인', thumbnail: thumbNatuur   },
  { id: 4, title: '울산대학교병원',      category: 'WEB DESIGN',     badge: '리디자인', thumbnail: thumbHospital },
  { id: 5, title: '넷플릭스 스타일 OTT', category: 'AI VIBE CODING', badge: '자체제작', thumbnail: thumbNetflix  },
]

/* ════════════════════════════════════════
   애니메이션 키프레임
════════════════════════════════════════ */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0);    }
`
const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`
const fadeInFaint = keyframes`
  from { opacity: 0;    }
  to   { opacity: 0.06; }
`
const bounceY = keyframes`
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(8px); }
`


/* ════════════════════════════════════════
   홈 스킬 카드 (context topSkills 연동)
════════════════════════════════════════ */
const Stars = ({ count, color }) => (
  <Box sx={{ display: 'flex', gap: 0.4 }}>
    {[1, 2, 3, 4, 5].map(n => (
      <Box key={n} sx={{ width: 8, height: 8, borderRadius: '50%',
                         bgcolor: n <= count ? color : '#E5E7EB', transition: 'background 0.2s' }} />
    ))}
  </Box>
)

const toStars    = (lvl) => lvl >= 75 ? 4 : lvl >= 55 ? 3 : lvl >= 35 ? 2 : 1
const toLevelTxt = (lvl) => lvl >= 70 ? '활용 가능' : lvl >= 40 ? '기초 가능' : '학습 중'

const HomeSkillCard = memo(({ skill }) => {
  const [hovered, setHovered] = useState(false)
  const Icon  = skill.Icon
  const color = CATEGORY_COLORS[skill.category] ?? '#6B7280'
  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5,
            p: { xs: 3, md: 3.5 }, borderRadius: 3,
            bgcolor: hovered ? alpha(color, 0.06) : '#FFFFFF', cursor: 'default',
            transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
            boxShadow: hovered ? `0 10px 30px ${alpha(color, 0.16)}` : '0 2px 8px rgba(0,0,0,0.04)',
            transition: 'all 0.3s ease',
            willChange: 'transform' }}
    >
      <Box sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'transform 0.35s cubic-bezier(.34,1.56,.64,1), filter 0.3s ease',
        transform: hovered ? 'rotate(-8deg) scale(1.18)' : 'rotate(0) scale(1)',
        filter: hovered ? `drop-shadow(0 0 10px ${color}99)` : 'none',
      }}>
        <Icon size={52} color={hovered ? color : '#9CA3AF'} style={{ transition: 'color 0.25s' }} />
      </Box>
      <Typography variant="body2"
        sx={{ fontWeight: 600, color: hovered ? '#111827' : '#6B7280', fontSize: '0.875rem', transition: 'color 0.2s' }}>
        {skill.name}
      </Typography>
      <Stars count={toStars(skill.level)} color={color} />
      <Box sx={{ px: 1.2, py: 0.35, borderRadius: 1, bgcolor: hovered ? color : '#F3F4F6', transition: 'background 0.25s' }}>
        <Typography sx={{ fontSize: '0.68rem', fontWeight: 600, color: hovered ? '#FFFFFF' : '#9CA3AF', transition: 'color 0.25s' }}>
          {toLevelTxt(skill.level)}
        </Typography>
      </Box>
    </Box>
  )
})

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
  const { homeData } = usePortfolio()
  const { homeContent, topSkills, basicInfo } = homeData

  const storySummary = homeContent.find(s => s.id === 'dev-story')?.summary ?? ''

  return (
    <Box>

      {/* ══════════════════════════════════════
          1. HERO  —  타이포그래피 중심 미니멀
      ══════════════════════════════════════ */}
      <Box
        id="hero"
        component="section"
        sx={{
          position: 'relative',
          bgcolor: '#FFFFFF',
          backgroundImage: "repeating-linear-gradient(rgba(255,122,0,0.14) 0 1px, transparent 1px 100%), repeating-linear-gradient(90deg, rgba(255,122,0,0.14) 0 1px, transparent 1px 100%)",
          backgroundSize: '36px 36px',
          minHeight: { xs: '100svh', sm: '100vh', md: '100vh' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'hidden',
          pt: { xs: 10, sm: 12, md: 16 },
          pb: { xs: 8,  sm: 10, md: 14 },
        }}
      >

        {/* ── 배경 워터마크 "HYEKYOUNG" ── */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 0,
          }}
        >
          <Box
            component="span"
            sx={{
              fontFamily: '"Archivo Black", sans-serif',
              fontSize: { xs: '15vw', sm: '15vw', md: '14.5vw' },
              fontWeight: 900,
              color: '#111827',
              whiteSpace: 'nowrap',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              flexShrink: 0,
              animation: `${fadeInFaint} 1.2s ease both`,
            }}
          >
            HYE KYOUNG
          </Box>
        </Box>

        {/* ── 메인 콘텐츠 레이어 ── */}
        <Box
          sx={{
            position: 'relative', zIndex: 1,
            maxWidth: 1280,
            mx: 'auto',
            px: { xs: 3, sm: 5, md: 8, lg: 10 },
            width: '100%',
          }}
        >
          {/* 좌측 상단 소캡션 */}
          <Typography
            sx={{
              fontFamily: '"Pretendard", sans-serif',
              fontSize: { xs: '0.82rem', sm: '0.9rem', md: '1.05rem' },
              fontWeight: 700,
              color: '#111827',
              letterSpacing: '-0.01em',
              mb: { xs: 2.5, md: 3 },
              animation: `${fadeUp} 0.6s 0.1s ease both`,
              opacity: 0,
            }}
          >
            누구나 찾게 만드는, 즐거움을 만드는
          </Typography>

          {/* ── 거대 로고타입 "hye kyoung" ── */}
          <Box
            sx={{
              mb: { xs: 7, sm: 9, md: 12, lg: 14 },
              animation: `${fadeUp} 0.7s 0.2s ease both`,
              opacity: 0,
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'center',
              flexWrap: 'nowrap',
              gap: 0,
              width: '100%',
              overflow: 'visible',
              pb: '0.12em',
            }}
          >
            <Box
              component="span"
              sx={{
                fontFamily: '"Archivo Black", sans-serif',
                fontSize: { xs: '11vw', sm: '9vw', md: '8vw', lg: '7vw' },
                fontWeight: 900,
                background: 'linear-gradient(135deg, #FF7A00 0%, #F04438 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: { xs: '-0.02em', sm: '-0.03em', md: '-0.04em' },
                lineHeight: 1.15,
                display: 'inline-block',
              }}
            >
              hye&nbsp;
            </Box>

            <Box
              component="span"
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: { xs: '11vw', sm: '9vw', md: '8vw', lg: '7vw' },
                fontStyle: 'italic',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #FF7A00 0%, #F04438 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: { xs: '-0.02em', md: '-0.025em' },
                lineHeight: 1.15,
                display: 'inline-block',
              }}
            >
              kyoung
            </Box>
          </Box>

          {/* 얇은 구분선 */}
          <Box
            sx={{
              width: 48, height: 2,
              background: 'linear-gradient(90deg, #FF7A00, #F04438)',
              borderRadius: 1,
              mx: 'auto',
              mb: { xs: 8, sm: 11, md: 15, lg: 18 },
              animation: `${fadeIn} 0.5s 0.5s ease both`,
              opacity: 0,
            }}
          />

          {/* 하단 본문 카피 3줄 — 중앙 정렬 */}
          <Box
            sx={{
              textAlign: 'center',
              animation: `${fadeUp} 0.7s 0.42s ease both`,
              opacity: 0,
            }}
          >
            {[
              '탄탄한 기획 위에 감각적인 인터페이스를 만드는 디자이너 황혜경입니다.',
              '사용하기 쉽고, 대중의 기억에 강하게 남을 UX/UI 디자인을 합니다.',
              '즐거운 마음으로 누구나 끊임없이 찾을 가치를 오늘도 만들어가고자 합니다.',
            ].map((line, i) => (
              <Typography
                key={i}
                sx={{
                  fontFamily: '"Pretendard", sans-serif',
                  fontSize: { xs: '0.84rem', sm: '0.93rem', md: '1.02rem', lg: '1.08rem' },
                  fontWeight: i === 0 ? 500 : 400,
                  color: i === 0 ? '#111827' : '#374151',
                  lineHeight: { xs: 1.85, md: 2 },
                  letterSpacing: '-0.01em',
                  wordBreak: 'keep-all',
                }}
              >
                {line}
              </Typography>
            ))}

            {/* CTA */}
            <Box sx={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: { xs: 2.5, md: 3 },
              mt: { xs: 5, sm: 6, md: 8, lg: 9 },
              animation: `${fadeUp} 0.6s 0.6s ease both`,
              opacity: 0,
            }}>

              {/* 주요 + 보조 버튼 */}
              <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'center',
                gap: { xs: 1.5, sm: 2, md: 2.5 },
                width: { xs: '100%', sm: 'auto' },
              }}>
                <Button
                  component={Link} to="/projects"
                  variant="contained" color="primary"
                  sx={{
                    width: { xs: '100%', sm: 'auto' },
                    px: { xs: 3, sm: 3.5, md: 4.5 },
                    py: { xs: 1.6, md: 1.35 },
                    minHeight: 44,
                    fontFamily: '"Pretendard", sans-serif',
                    fontWeight: 700, fontSize: { xs: '0.9rem', md: '0.92rem' },
                    boxShadow: '0 4px 18px rgba(255,122,0,0.3)',
                    transition: 'all 0.28s cubic-bezier(.34,1.56,.64,1)',
                    willChange: 'transform',
                    '&:hover': {
                      transform: 'perspective(600px) translateY(-3px) rotateX(6deg)',
                      boxShadow: '0 14px 38px rgba(255,122,0,0.48)',
                    },
                  }}
                >
                  포트폴리오 보기
                </Button>
                <Button
                  onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                  variant="outlined" color="primary"
                  sx={{
                    width: { xs: '100%', sm: 'auto' },
                    px: { xs: 3, sm: 3.5, md: 4.5 },
                    py: { xs: 1.6, md: 1.35 },
                    minHeight: 44,
                    fontFamily: '"Pretendard", sans-serif',
                    fontWeight: 600, fontSize: { xs: '0.9rem', md: '0.92rem' },
                    borderWidth: '1.5px',
                    transition: 'all 0.28s cubic-bezier(.34,1.56,.64,1)',
                    willChange: 'transform',
                    '&:hover': {
                      transform: 'perspective(600px) translateY(-3px) rotateX(6deg)',
                      borderWidth: '1.5px', bgcolor: 'rgba(255,122,0,0.05)',
                      boxShadow: '0 8px 24px rgba(255,122,0,0.2)',
                    },
                  }}
                >
                  연락하기
                </Button>
              </Box>

              {/* 소셜 아이콘 */}
              <Box sx={{ display: 'flex', gap: { xs: 1.5, md: 1.2 } }}>
                <IconButton
                  href="https://github.com/harube29-lang"
                  target="_blank" rel="noopener noreferrer"
                  sx={{
                    color: '#6B7280',
                    border: '1px solid #E5E7EB',
                    width: 44, height: 44,
                    transition: 'all 0.22s ease',
                    '&:hover': { color: '#111827', borderColor: '#111827', bgcolor: '#F3F4F6', transform: 'translateY(-3px)' },
                  }}
                >
                  <GitHubIcon sx={{ fontSize: '1.2rem' }} />
                </IconButton>
                <IconButton
                  href="https://www.linkedin.com"
                  target="_blank" rel="noopener noreferrer"
                  sx={{
                    color: '#6B7280',
                    border: '1px solid #E5E7EB',
                    width: 44, height: 44,
                    transition: 'all 0.22s ease',
                    '&:hover': { color: '#0A66C2', borderColor: '#0A66C2', bgcolor: 'rgba(10,102,194,0.06)', transform: 'translateY(-3px)' },
                  }}
                >
                  <LinkedInIcon sx={{ fontSize: '1.2rem' }} />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* ── 스크롤 인디케이터 ── */}
        <Box
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          sx={{
            position: 'absolute', bottom: { xs: 22, md: 30 }, left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5,
            cursor: 'pointer', userSelect: 'none',
            animation: `${fadeIn} 0.8s 1s ease both`, opacity: 0,
            transition: 'opacity 0.2s',
            '&:hover': { opacity: 0.6 },
          }}
        >
          <Typography sx={{ fontSize: '0.6rem', fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.18em' }}>
            SCROLL
          </Typography>
          <KeyboardArrowDownIcon sx={{
            color: '#D1D5DB', fontSize: '1.2rem',
            animation: `${bounceY} 1.5s ease-in-out infinite`,
          }} />
        </Box>
      </Box>
      {/* ── Hero 끝 ── */}


      {/* ══════════════════════════════════════
          2. About Me
      ══════════════════════════════════════ */}
      <Section id="about" bg="#FFFFFF">

        {/* 헤더 + 프로필 카드 */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' },
                   alignItems: { xs: 'flex-start', md: 'center' }, gap: { xs: 5, md: 10 }, mb: { xs: 7, md: 9 } }}>
          <Box sx={{ flex: 1, minWidth: 0, order: { xs: 2, md: 1 } }}>
            <Label>About Me</Label>
            <Typography variant="h2"
              sx={{ fontSize: { xs: '1.6rem', sm: '2rem', md: '2.25rem' }, mb: 1.5, wordBreak: 'keep-all' }}>
              안녕하세요,<br />{basicInfo.name}입니다.
            </Typography>
            <Box sx={{ width: 40, height: 3, bgcolor: 'primary.main', borderRadius: 1, mb: 2.5 }} />

            {/* homeData.homeContent — showInHome 섹션 요약 (context 실시간 연동) */}
            {homeContent.map((sec, i) => (
              <Box key={sec.id} sx={{ mb: i < homeContent.length - 1 ? 2.5 : 3.5 }}>
                {homeContent.length > 1 && (
                  <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: 'primary.main',
                                    letterSpacing: '0.1em', textTransform: 'uppercase', mb: 0.6 }}>
                    {sec.title}
                  </Typography>
                )}
                <Typography variant="body1"
                  sx={{ color: 'text.secondary', lineHeight: 1.9, wordBreak: 'keep-all' }}>
                  {sec.summary}
                </Typography>
              </Box>
            ))}

            {/* 주요 스킬 미니 아이콘 (context topSkills 연동) */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: { xs: 4, md: 5 } }}>
              {topSkills.map(skill => {
                const Icon = skill.Icon
                const color = CATEGORY_COLORS[skill.category]
                return (
                  <Box key={skill.id}
                    sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.8,
                          px: 1.5, py: 0.65, borderRadius: 1.5,
                          bgcolor: alpha(color, 0.07), border: `1px solid ${alpha(color, 0.18)}` }}>
                    <Icon size={13} color={color} />
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', letterSpacing: '-0.01em' }}>
                      {skill.name}
                    </Typography>
                  </Box>
                )
              })}
            </Box>
          </Box>

          {/* 프로필 카드 */}
          <Box sx={{ flexShrink: 0, display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, order: { xs: 1, md: 2 } }}>
            <Box sx={{ border: '1px solid #F3F4F6', borderRadius: 3, overflow: 'hidden', width: { xs: 180, md: 220 }, boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
              <Box component="img" src={profileImg} alt={`${basicInfo.name} 프로필`}
                sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }} />
              <Box sx={{ p: 2, bgcolor: '#FAFAFA' }}>
                <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#111827' }}>
                  {basicInfo.name}
                </Typography>
                <Typography sx={{ color: '#6B7280', fontSize: '0.78rem', mt: 0.3 }}>
                  {basicInfo.role}
                </Typography>
                <Box sx={{ width: 24, height: '1px', bgcolor: '#E5E7EB', my: 1.2 }} />
                <Typography sx={{ fontSize: '0.72rem', color: '#9CA3AF' }}>
                  {basicInfo.education}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Button variant="contained" color="primary" component={Link} to="/about"
          size="large" sx={{ px: 3.5, py: 1.4 }}>
          더 알아보기
        </Button>
      </Section>


      {/* ══════════════════════════════════════
          3. Skills (context topSkills 연동)
      ══════════════════════════════════════ */}
      <Section id="skills" bg="#F9FAFB">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                   mb: { xs: 5, md: 7 }, flexWrap: 'wrap', gap: 3 }}>
          <Box>
            <Label>Skills</Label>
            <Typography variant="h2"
              sx={{ fontSize: { xs: '1.6rem', sm: '2rem', md: '2.25rem' }, wordBreak: 'keep-all' }}>
              주요 기술
            </Typography>
            <Box sx={{ width: 40, height: 3, bgcolor: 'primary.main', borderRadius: 1, mt: 1.5 }} />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
              숙련도 상위 4개 · 아이콘에 마우스를 올려보세요
            </Typography>
          </Box>
          <Button variant="outlined" color="primary" component={Link} to="/about" sx={{ px: 2.5, py: 1 }}>
            전체 스킬 보기 →
          </Button>
        </Box>
        <Box sx={{ display: 'grid',
                   gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
                   gap: { xs: 2, md: 2.5 } }}>
          {topSkills.map(skill => <HomeSkillCard key={skill.id} skill={skill} />)}
        </Box>
      </Section>


      {/* ══════════════════════════════════════
          4. Portfolio
      ══════════════════════════════════════ */}
      <Section id="projects" bg="#FFFFFF">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                   mb: { xs: 5, md: 7 }, flexWrap: 'wrap', gap: 3 }}>
          <Box>
            <Label>Portfolio</Label>
            <Typography variant="h2"
              sx={{ fontSize: { xs: '1.6rem', sm: '2rem', md: '2.25rem' }, wordBreak: 'keep-all' }}>
              포트폴리오
            </Typography>
            <Box sx={{ width: 40, height: 3, bgcolor: 'primary.main', borderRadius: 1, mt: 1.5 }} />
          </Box>
          <Button variant="outlined" color="primary" component={Link} to="/projects" sx={{ px: 2.5, py: 1 }}>
            전체 보기 →
          </Button>
        </Box>

        {/* 2열 썸네일 그리드 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: { xs: 2, md: 3 },
          }}
        >
          {HOME_PROJECTS.map(p => (
            <Box
              key={p.id}
              component={Link}
              to="/projects"
              sx={{
                display: 'block',
                position: 'relative',
                paddingTop: '66%',
                borderRadius: 3,
                overflow: 'hidden',
                border: '1px solid #E5E7EB',
                textDecoration: 'none',
                cursor: 'pointer',
                '&:hover .thumb-overlay': { opacity: 1 },
                '&:hover img': { transform: 'scale(1.04)' },
              }}
            >
              <Box
                component="img"
                src={p.thumbnail}
                alt={p.title}
                loading="lazy"
                sx={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'top',
                  transition: 'transform 0.4s ease',
                }}
              />
              {/* 오버레이 — 모바일(터치)은 항상 노출, sm 이상은 호버 시에만 */}
              <Box
                className="thumb-overlay"
                sx={{
                  position: 'absolute', inset: 0,
                  background: { xs: 'linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.05) 60%)', sm: 'rgba(0,0,0,0.45)' },
                  display: 'flex', flexDirection: 'column',
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  justifyContent: { xs: 'flex-end', sm: 'center' },
                  p: { xs: 2, sm: 0 },
                  opacity: { xs: 1, sm: 0 },
                  transition: 'opacity 0.3s ease',
                }}
              >
                <Typography
                  sx={{
                    color: CATEGORY_COLORS_PROJECT[p.category], fontSize: '0.66rem', fontWeight: 700,
                    letterSpacing: '0.14em', textTransform: 'uppercase', mb: 0.8,
                  }}
                >
                  {p.category}
                </Typography>
                <Box
                  sx={{
                    px: 1.4, py: 0.4, borderRadius: 1,
                    bgcolor: 'rgba(255,122,0,0.85)',
                    color: '#fff', fontSize: '0.68rem', fontWeight: 700, mb: 1,
                  }}
                >
                  {p.badge}
                </Box>
                <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>
                  {p.title}
                </Typography>
              </Box>
            </Box>
          ))}
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
