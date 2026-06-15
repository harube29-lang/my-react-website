import { useState, useEffect } from 'react'
import { keyframes } from '@emotion/react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Skeleton from '@mui/material/Skeleton'
import { Link } from 'react-router-dom'
import LaunchIcon from '@mui/icons-material/Launch'
import { SiFigma, SiHtml5 } from 'react-icons/si'
import profileImg from '../assets/profile.jpg'
import ContactSection from '../components/Contact/ContactSection'
import { supabase } from '../lib/supabase'

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

/* ════════════════════════════════════════
   Skills 섹션 데이터
════════════════════════════════════════ */
const SKILLS = [
  { type: 'react-icon', icon: SiFigma, name: 'Figma',       level: '활용 가능', stars: 4, color: '#F24E1E', bgColor: '#FFF1EE' },
  { type: 'adobe', letter: 'Ai',       name: 'Illustrator', level: '활용 가능', stars: 4, color: '#FF9A00', bgColor: '#FFF8EE', adobeBg: '#2C0A00' },
  { type: 'adobe', letter: 'Ps',       name: 'Photoshop',   level: '기초 가능', stars: 3, color: '#31A8FF', bgColor: '#EEF7FF', adobeBg: '#001E36' },
  { type: 'react-icon', icon: SiHtml5, name: 'HTML5',       level: '기초 가능', stars: 3, color: '#E34F26', bgColor: '#FFF1EE' },
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
            p: { xs: 3, md: 3.5 }, borderRadius: 3,
            bgcolor: hovered ? bgColor : '#FFFFFF', cursor: 'default',
            transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
            boxShadow: hovered ? '0 10px 30px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.04)',
            transition: 'all 0.3s ease' }}
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
   Projects 카드
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
          minHeight: { xs: '88vh', md: '92vh' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'hidden',
          pt: { xs: 12, md: 16 },
          pb: { xs: 10, md: 14 },
        }}
      >

        {/* ── 배경 워터마크 "HYEKYOUNG" ── */}
        {/* overflow:hidden 래퍼로 감싸서 document 수평 스크롤 완전 차단 */}
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
              fontSize: { xs: '21vw', sm: '19vw', md: '17vw' },
              fontWeight: 900,
              color: '#111827',
              opacity: 0.04,
              whiteSpace: 'nowrap',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              flexShrink: 0,
              animation: `${fadeIn} 1.2s ease both`,
            }}
          >
            HYEKYOUNG
          </Box>
        </Box>

        {/* ── 메인 콘텐츠 레이어 ── */}
        <Box
          sx={{
            position: 'relative', zIndex: 1,
            maxWidth: 1280,
            mx: 'auto',
            px: { xs: 4, sm: 6, md: 10 },
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
              mb: { xs: 10, sm: 12, md: 14 },
              animation: `${fadeUp} 0.7s 0.2s ease both`,
              opacity: 0,
              display: 'flex',
              alignItems: 'baseline',
              flexWrap: 'nowrap',
              gap: 0,
              width: '100%',
              /* 디센더·어센더 클리핑 방지 */
              overflow: 'visible',
              pb: '0.12em',
            }}
          >
            <Box
              component="span"
              sx={{
                fontFamily: '"Archivo Black", sans-serif',
                fontSize: { xs: '12vw', sm: '12vw', md: '11vw' },
                fontWeight: 900,
                background: 'linear-gradient(135deg, #FF7A00 0%, #F04438 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: { xs: '-0.03em', md: '-0.04em' },
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
                fontSize: { xs: '12vw', sm: '12vw', md: '11vw' },
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

          {/* 얇은 구분선 — 브랜드 포인트 컬러 */}
          <Box
            sx={{
              width: 48, height: 2,
              background: 'linear-gradient(90deg, #FF7A00, #F04438)',
              borderRadius: 1,
              mx: 'auto',
              mb: { xs: 3.5, md: 4.5 },
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
              '즐거운 마음으로 누구나 끊임없이 찾을 가치를 오늘도 만들어가고자 합니다 :)',
            ].map((line, i) => (
              <Typography
                key={i}
                sx={{
                  fontFamily: '"Pretendard", sans-serif',
                  fontSize: { xs: '0.88rem', sm: '0.95rem', md: '1.05rem' },
                  fontWeight: i === 0 ? 500 : 400,
                  color: i === 0 ? '#111827' : '#374151',
                  lineHeight: 2,
                  letterSpacing: '-0.01em',
                  wordBreak: 'keep-all',
                }}
              >
                {line}
              </Typography>
            ))}

            {/* 미니멀 CTA */}
            <Box
              sx={{
                display: 'flex', justifyContent: 'center', gap: { xs: 3, md: 4 },
                mt: { xs: 4.5, md: 6 },
                animation: `${fadeUp} 0.6s 0.6s ease both`,
                opacity: 0,
              }}
            >
              <Button
                component={Link} to="/projects"
                variant="contained" color="primary"
                sx={{
                  px: 3.5, py: 1.3,
                  fontFamily: '"Pretendard", sans-serif',
                  fontWeight: 700, fontSize: '0.9rem',
                  boxShadow: '0 4px 18px rgba(255,122,0,0.28)',
                  transition: 'all 0.28s cubic-bezier(.34,1.56,.64,1)',
                  '&:hover': { transform: 'scale(1.05) translateY(-2px)',
                               boxShadow: '0 8px 28px rgba(255,122,0,0.38)' },
                }}
              >
                작업물 보기
              </Button>
              <Button
                component={Link} to="/about"
                variant="outlined" color="primary"
                sx={{
                  px: 3.5, py: 1.3,
                  fontFamily: '"Pretendard", sans-serif',
                  fontWeight: 600, fontSize: '0.9rem',
                  borderWidth: '1.5px',
                  transition: 'all 0.28s cubic-bezier(.34,1.56,.64,1)',
                  '&:hover': { transform: 'scale(1.05) translateY(-2px)',
                               borderWidth: '1.5px', bgcolor: 'rgba(255,122,0,0.05)' },
                }}
              >
                About Me
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* ── Hero 끝 ── */}


      {/* ══════════════════════════════════════
          2. About Me
      ══════════════════════════════════════ */}
      <Section id="about" bg="#FFFFFF">

        {/* 헤더 + 프로필 */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' },
                   alignItems: 'center', gap: { xs: 5, md: 10 }, mb: { xs: 7, md: 9 } }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Label>About Me</Label>
            <Typography variant="h2"
              sx={{ fontSize: { xs: '1.6rem', sm: '2rem', md: '2.25rem' }, mb: 1.5, wordBreak: 'keep-all' }}>
              안녕하세요,<br />황혜경입니다.
            </Typography>
            <Box sx={{ width: 40, height: 3, bgcolor: 'primary.main', borderRadius: 1, mb: 2.5 }} />
            <Typography variant="body1"
              sx={{ color: 'text.secondary', lineHeight: 1.9, wordBreak: 'keep-all' }}>
              동명대학교 산업디자인전공을 졸업하고, UX/UI 디자이너로 전향한 신입입니다.
            </Typography>
          </Box>
          <Box sx={{ flexShrink: 0, display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
            <Box component="img" src={profileImg} alt="황혜경 프로필"
              sx={{ width: { xs: 160, sm: 200, md: 240 }, height: { xs: 160, sm: 200, md: 240 },
                    borderRadius: 3, objectFit: 'cover',
                    boxShadow: '0 8px 28px rgba(0,0,0,0.12)', display: 'block' }} />
          </Box>
        </Box>

        {/* 콘텐츠 블록 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 5, md: 6 }, mb: { xs: 6, md: 8 } }}>

          {/* 나의 개발 스토리 */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Typography variant="h3"
                sx={{ fontSize: { xs: '1.05rem', md: '1.15rem' }, color: '#111827' }}>
                나의 개발 스토리
              </Typography>
              <Box component="span"
                sx={{ fontSize: '0.62rem', fontWeight: 700, color: 'primary.main',
                      bgcolor: 'rgba(255,122,0,0.08)', px: 1, py: 0.25, borderRadius: 0.75 }}>
                홈 표시
              </Box>
            </Box>
            <Box sx={{ width: 28, height: 2, bgcolor: 'primary.main', borderRadius: 1, mb: 2.5, opacity: 0.35 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                '전직을 고민하던 중 UX/UI 디자인의 실제 수정 과정과 피드백을 다룬 콘텐츠를 접하게 되었습니다. 해당 영상에서는 사용자 흐름에서 발생하는 불필요한 요소를 제거하고, 정보 구조를 재정리하여 사용자의 피로도를 줄이는 과정을 중심으로 개선이 이루어졌습니다.',
                '이 과정을 보며 단순히 시각적으로 완성된 결과물이 아니라, 데이터와 사용자 관점에 기반해 문제를 해결하는 디자인의 중요성을 명확히 이해하게 되었습니다. 특히 사용자 경험을 개선하기 위한 구조적 사고와 반복적인 개선 과정에 깊이 공감하며 UX/UI 디자인 직무에 대한 확신을 갖게 되었습니다.',
                '이후 해당 분야로의 전향을 결정하고, 사용자 중심의 디자인 사고를 기반으로 툴 학습 및 사이드 프로젝트를 진행하며 실무 역량을 쌓고 있습니다. 현재는 "보기 좋은 디자인"이 아닌 사용자 문제를 해결하는 설계 중심의 UX/UI 디자이너를 목표로 지속적으로 성장하고 있습니다.',
              ].map((para, i) => (
                <Typography key={i} variant="body1"
                  sx={{ color: '#374151', lineHeight: 2, fontSize: { xs: '0.9rem', md: '0.975rem' }, wordBreak: 'keep-all' }}>
                  {para}
                </Typography>
              ))}
            </Box>
          </Box>

          <Box sx={{ height: '1px', bgcolor: '#F3F4F6' }} />

          {/* 개발 철학 */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Typography variant="h3"
                sx={{ fontSize: { xs: '1.05rem', md: '1.15rem' }, color: '#111827' }}>
                개발 철학
              </Typography>
              <Box component="span"
                sx={{ fontSize: '0.62rem', fontWeight: 700, color: 'primary.main',
                      bgcolor: 'rgba(255,122,0,0.08)', px: 1, py: 0.25, borderRadius: 0.75 }}>
                홈 표시
              </Box>
            </Box>
            <Box sx={{ width: 28, height: 2, bgcolor: 'primary.main', borderRadius: 1, mb: 2.5, opacity: 0.35 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                '미적 완성도를 중요하게 여기지만, 디자인 과정에서는 항상 유니버설 디자인 관점을 우선적으로 검토해 왔습니다. 특정한 시각적 표현보다 다양한 사용자가 직관적으로 이해하고 접근할 수 있는 경험 설계를 더 중요하게 생각합니다.',
                '결국 좋은 디자인은 심미성과 사용성의 균형 위에서, 누구에게나 일관된 경험을 제공하는 것이라고 믿습니다.',
              ].map((para, i) => (
                <Typography key={i} variant="body1"
                  sx={{ color: '#374151', lineHeight: 2, fontSize: { xs: '0.9rem', md: '0.975rem' }, wordBreak: 'keep-all' }}>
                  {para}
                </Typography>
              ))}
            </Box>
          </Box>

        </Box>

        <Button variant="contained" color="primary" component={Link} to="/about"
          size="large" sx={{ px: 3.5, py: 1.4 }}>
          더 알아보기
        </Button>
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
        <Box sx={{ display: 'flex', gap: { xs: 2, md: 3 }, overflowX: 'auto', pb: 1,
                   '&::-webkit-scrollbar': { height: 4 },
                   '&::-webkit-scrollbar-thumb': { backgroundColor: '#D1D5DB', borderRadius: 2 } }}>
          {loading
            ? [1, 2, 3].map(n => <ProjectSkeleton key={n} />)
            : projects.length > 0
              ? projects.map(p => <HomeProjectCard key={p.id} project={p} />)
              : [1, 2, 3].map(n => (
                  <Box key={n} sx={{ flex: '1 0 280px', minWidth: 280, minHeight: 200,
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
