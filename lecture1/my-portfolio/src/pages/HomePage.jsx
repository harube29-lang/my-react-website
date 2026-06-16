import { useState, useEffect, memo } from 'react'
import { keyframes } from '@emotion/react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Skeleton from '@mui/material/Skeleton'
import { Link } from 'react-router-dom'
import { alpha } from '@mui/material/styles'
import LaunchIcon from '@mui/icons-material/Launch'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import profileImg from '../assets/profile.jpg'
import ContactSection from '../components/Contact/ContactSection'
import { supabase } from '../lib/supabase'
import { usePortfolio, CATEGORY_COLORS } from '../context/PortfolioContext'

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
const bounceY = keyframes`
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(8px); }
`
const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.45; transform: scale(0.82); }
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
            transition: 'all 0.3s ease' }}
    >
      <Icon size={52} color={hovered ? color : '#9CA3AF'} style={{ transition: 'color 0.25s' }} />
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
   Projects 카드
════════════════════════════════════════ */
const HomeProjectCard = memo(({ project }) => {
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
               loading="lazy"
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
})

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
  const [loading,  setLoading]  = useState(true)
  const [projError, setProjError] = useState(false)
  const { homeData } = usePortfolio()
  const { homeContent, topSkills, basicInfo } = homeData

  const storySummary = homeContent.find(s => s.id === 'dev-story')?.summary ?? ''

  useEffect(() => {
    supabase
      .from('projects').select('*').eq('is_published', true)
      .order('sort_order', { ascending: true }).limit(3)
      .then(({ data, error }) => {
        if (error) { setProjError(true) }
        else if (data) { setProjects(data) }
        setLoading(false)
      })
  }, [])

  return (
    <Box>

      {/* ══════════════════════════════════════
          1. HERO  —  스플릿 레이아웃
      ══════════════════════════════════════ */}
      <Box
        id="hero"
        component="section"
        sx={{
          position: 'relative',
          bgcolor: '#FAFAFA',
          backgroundImage: "repeating-linear-gradient(rgba(255,122,0,0.08) 0 1px, transparent 1px 100%), repeating-linear-gradient(90deg, rgba(255,122,0,0.08) 0 1px, transparent 1px 100%)",
          backgroundSize: '40px 40px',
          minHeight: { xs: '100vh', md: '96vh' },
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          pt: { xs: 14, md: 10 },
          pb: { xs: 12, md: 8 },
        }}
      >

        {/* ── 배경 워터마크 ── */}
        <Box aria-hidden="true" sx={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', pointerEvents: 'none', userSelect: 'none', zIndex: 0,
        }}>
          <Box component="span" sx={{
            fontFamily: '"Archivo Black", sans-serif',
            fontSize: { xs: '22vw', md: '18vw' },
            fontWeight: 900, color: '#111827', opacity: 0.03,
            whiteSpace: 'nowrap', letterSpacing: '-0.02em', lineHeight: 1, flexShrink: 0,
            animation: `${fadeIn} 1.4s ease both`,
          }}>
            HYEKYOUNG
          </Box>
        </Box>

        {/* ── 스플릿 메인 콘텐츠 ── */}
        <Box sx={{
          position: 'relative', zIndex: 1,
          maxWidth: 1280, mx: 'auto',
          px: { xs: 4, sm: 6, md: 10 },
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: { xs: 8, md: 6 },
        }}>

          {/* ── LEFT: 텍스트 ── */}
          <Box sx={{ flex: '1 1 58%', minWidth: 0 }}>

            {/* 역할 뱃지 */}
            <Box sx={{
              display: 'inline-flex', alignItems: 'center', gap: 1,
              px: 1.8, py: 0.7, borderRadius: '999px',
              bgcolor: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.22)',
              mb: { xs: 3.5, md: 4.5 },
              animation: `${fadeUp} 0.5s 0.05s ease both`, opacity: 0,
            }}>
              <Box sx={{
                width: 8, height: 8, borderRadius: '50%', bgcolor: '#10B981',
                animation: `${pulse} 1.8s ease-in-out infinite`,
              }} />
              <Typography sx={{
                fontSize: '0.8rem', fontWeight: 700, color: '#065F46', letterSpacing: '-0.01em',
              }}>
                신입 UX/UI 디자이너&nbsp;·&nbsp;채용 가능
              </Typography>
            </Box>

            {/* 이름 — 세로 스택 */}
            <Box sx={{
              mb: { xs: 4, md: 5 },
              animation: `${fadeUp} 0.7s 0.15s ease both`, opacity: 0,
              overflow: 'visible', pb: '0.08em',
            }}>
              <Box component="span" sx={{
                display: 'block',
                fontFamily: '"Archivo Black", sans-serif',
                fontSize: { xs: '16vw', sm: '11vw', md: '9.5vw' },
                fontWeight: 900,
                background: 'linear-gradient(135deg, #FF7A00 0%, #F04438 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                letterSpacing: { xs: '-0.03em', md: '-0.04em' },
                lineHeight: 1.08,
              }}>
                hye
              </Box>
              <Box component="span" sx={{
                display: 'block',
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: { xs: '16vw', sm: '11vw', md: '9.5vw' },
                fontStyle: 'italic', fontWeight: 700,
                background: 'linear-gradient(135deg, #FF7A00 0%, #F04438 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                letterSpacing: { xs: '-0.02em', md: '-0.025em' },
                lineHeight: 1.08,
              }}>
                kyoung
              </Box>
            </Box>

            {/* 구분선 */}
            <Box sx={{
              width: 48, height: 2,
              background: 'linear-gradient(90deg, #FF7A00, #F04438)',
              borderRadius: 1,
              mb: { xs: 3, md: 3.5 },
              animation: `${fadeIn} 0.5s 0.3s ease both`, opacity: 0,
            }} />

            {/* 한줄 태그라인 */}
            <Typography sx={{
              fontFamily: '"Pretendard", sans-serif',
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.18rem' },
              fontWeight: 500, color: '#374151',
              lineHeight: 1.85, letterSpacing: '-0.02em', wordBreak: 'keep-all',
              mb: { xs: 4, md: 5 },
              animation: `${fadeUp} 0.7s 0.35s ease both`, opacity: 0,
            }}>
              사용자의 문제를 먼저 읽고,<br />기억에 남는 UX/UI를 설계합니다.
            </Typography>

            {/* 스탯 로우 */}
            <Box sx={{
              display: 'flex', gap: { xs: 4, md: 5 },
              mb: { xs: 5, md: 6 },
              animation: `${fadeUp} 0.6s 0.45s ease both`, opacity: 0,
            }}>
              {[
                { value: '5+',    label: '프로젝트' },
                { value: 'Figma', label: '주력 툴'  },
                { value: '신입',  label: '경력'     },
              ].map(({ value, label }) => (
                <Box key={label}>
                  <Typography sx={{
                    fontSize: { xs: '1.5rem', md: '1.65rem' },
                    fontWeight: 800, color: '#FF7A00',
                    fontFamily: '"Archivo Black", sans-serif',
                    lineHeight: 1.1, letterSpacing: '-0.03em',
                  }}>
                    {value}
                  </Typography>
                  <Typography sx={{
                    fontSize: '0.7rem', fontWeight: 600, color: '#9CA3AF',
                    letterSpacing: '0.07em', textTransform: 'uppercase', mt: 0.4,
                  }}>
                    {label}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* CTA 버튼 */}
            <Box sx={{
              display: 'flex', gap: 1.5, flexWrap: 'wrap',
              animation: `${fadeUp} 0.6s 0.55s ease both`, opacity: 0,
            }}>
              <Button
                component={Link} to="/projects"
                variant="contained" color="primary"
                sx={{
                  px: 3.5, py: 1.3,
                  fontFamily: '"Pretendard", sans-serif',
                  fontWeight: 700, fontSize: '0.9rem',
                  boxShadow: '0 4px 18px rgba(255,122,0,0.28)',
                  transition: 'all 0.28s cubic-bezier(.34,1.56,.64,1)',
                  '&:hover': { transform: 'scale(1.05) translateY(-2px)', boxShadow: '0 8px 28px rgba(255,122,0,0.38)' },
                }}
              >
                포트폴리오 보기
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
                  '&:hover': { transform: 'scale(1.05) translateY(-2px)', borderWidth: '1.5px', bgcolor: 'rgba(255,122,0,0.05)' },
                }}
              >
                나에 대해 →
              </Button>
            </Box>
          </Box>

          {/* ── RIGHT: 프로필 사진 카드 ── */}
          <Box sx={{
            flex: '1 1 38%',
            display: 'flex',
            justifyContent: { xs: 'center', md: 'flex-end' },
            animation: `${fadeIn} 0.9s 0.3s ease both`, opacity: 0,
          }}>
            <Box sx={{ position: 'relative', width: { xs: 240, sm: 290, md: 330 } }}>

              {/* 사진 카드 */}
              <Box sx={{
                borderRadius: 4, overflow: 'hidden',
                boxShadow: '0 24px 64px rgba(0,0,0,0.13)',
                border: '3px solid rgba(255,255,255,0.9)',
                aspectRatio: '3/4', bgcolor: '#F3F4F6',
              }}>
                <Box
                  component="img"
                  src={profileImg}
                  alt="황혜경 프로필"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </Box>

              {/* 플로팅 뱃지 — 우측 상단 */}
              <Box sx={{
                position: 'absolute', top: -12, right: -14,
                bgcolor: '#FF7A00', color: '#fff',
                px: 1.5, py: 0.65, borderRadius: 2,
                boxShadow: '0 4px 18px rgba(255,122,0,0.42)',
                animation: `${fadeUp} 0.5s 0.7s ease both`, opacity: 0,
              }}>
                <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.04em' }}>
                  UX/UI Designer
                </Typography>
              </Box>

              {/* 플로팅 카드 — 좌측 하단 */}
              <Box sx={{
                position: 'absolute', bottom: -18, left: -18,
                bgcolor: '#FFFFFF', borderRadius: 2.5,
                px: 2, py: 1.3,
                boxShadow: '0 8px 32px rgba(0,0,0,0.13)',
                animation: `${fadeUp} 0.5s 0.85s ease both`, opacity: 0,
                minWidth: 148,
              }}>
                <Typography sx={{
                  fontSize: '0.62rem', fontWeight: 700, color: '#9CA3AF',
                  letterSpacing: '0.09em', textTransform: 'uppercase', mb: 0.35,
                }}>
                  Education
                </Typography>
                <Typography sx={{ fontSize: '0.84rem', fontWeight: 700, color: '#111827' }}>
                  동명대학교
                </Typography>
                <Typography sx={{ fontSize: '0.72rem', color: '#6B7280', mt: 0.2 }}>
                  산업디자인전공
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* ── 스크롤 인디케이터 ── */}
        <Box sx={{
          position: 'absolute', bottom: { xs: 24, md: 32 }, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5,
          animation: `${fadeIn} 0.8s 1.2s ease both`, opacity: 0,
        }}>
          <Typography sx={{ fontSize: '0.6rem', fontWeight: 700, color: '#C4C9D4', letterSpacing: '0.18em' }}>
            SCROLL
          </Typography>
          <KeyboardArrowDownIcon sx={{
            color: '#D1D5DB', fontSize: '1.15rem',
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
          <Box sx={{ flex: 1, minWidth: 0 }}>
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
          <Box sx={{ flexShrink: 0, display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
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
        {projError ? (
          <Box sx={{ py: 8, textAlign: 'center', border: '1px dashed #E5E7EB', borderRadius: 3 }} role="alert">
            <Typography color="text.disabled" sx={{ mb: 1 }}>프로젝트를 불러오지 못했습니다.</Typography>
            <Button size="small" variant="outlined" onClick={() => { setProjError(false); setLoading(true) }}>
              다시 시도
            </Button>
          </Box>
        ) : (
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
        )}
      </Section>


      {/* ══════════════════════════════════════
          5. Contact
      ══════════════════════════════════════ */}
      <ContactSection />

    </Box>
  )
}

export default HomePage
