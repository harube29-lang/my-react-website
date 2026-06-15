import { useState, useEffect } from 'react'
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

/* ── 스킬 데이터 ── */
const SKILLS = [
  {
    type:    'react-icon',
    icon:    SiFigma,
    name:    'Figma',
    level:   '활용 가능',
    stars:   4,
    color:   '#F24E1E',
    bgColor: '#FFF1EE',
  },
  {
    type:    'adobe',
    letter:  'Ai',
    name:    'Illustrator',
    level:   '활용 가능',
    stars:   4,
    color:   '#FF9A00',
    bgColor: '#FFF8EE',
    adobeBg: '#2C0A00',
  },
  {
    type:    'adobe',
    letter:  'Ps',
    name:    'Photoshop',
    level:   '기초 가능',
    stars:   3,
    color:   '#31A8FF',
    bgColor: '#EEF7FF',
    adobeBg: '#001E36',
  },
  {
    type:    'react-icon',
    icon:    SiHtml5,
    name:    'HTML5',
    level:   '기초 가능',
    stars:   3,
    color:   '#E34F26',
    bgColor: '#FFF1EE',
  },
]

/* ── 별점 ── */
const Stars = ({ count, color }) => (
  <Box sx={{ display: 'flex', gap: 0.4 }}>
    {[1, 2, 3, 4, 5].map((n) => (
      <Box
        key={n}
        sx={{
          width: 8, height: 8, borderRadius: '50%',
          bgcolor: n <= count ? color : '#E5E7EB',
          transition: 'background 0.2s',
        }}
      />
    ))}
  </Box>
)

/* ── 스킬 카드 ── */
const SkillCard = ({ skill }) => {
  const [hovered, setHovered] = useState(false)
  const { type, icon: Icon, letter, name, level, stars, color, bgColor, adobeBg } = skill

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        gap:            1.5,
        p:              { xs: 3, md: 3.5 },
        borderRadius:   3,
        border:         '1.5px solid',
        borderColor:    hovered ? color : '#E5E7EB',
        bgcolor:        hovered ? bgColor : '#FFFFFF',
        cursor:         'default',
        transform:      hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow:      hovered ? `0 12px 32px ${color}28` : '0 1px 4px rgba(0,0,0,0.06)',
        transition:     'all 0.25s cubic-bezier(.34,1.56,.64,1)',
      }}
    >
      {type === 'react-icon' ? (
        <Icon size={52} color={hovered ? color : '#9CA3AF'} style={{ transition: 'color 0.25s' }} />
      ) : (
        <Box
          sx={{
            width: 52, height: 52,
            borderRadius: 1.5,
            bgcolor: hovered ? adobeBg : '#F3F4F6',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.25s',
          }}
        >
          <Typography
            sx={{
              color:      hovered ? color : '#9CA3AF',
              fontWeight: 700,
              fontSize:   '1.1rem',
              fontFamily: '"Arial", sans-serif',
              letterSpacing: '-0.03em',
              transition: 'color 0.25s',
            }}
          >
            {letter}
          </Typography>
        </Box>
      )}

      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          color:      hovered ? '#111827' : '#6B7280',
          fontSize:   '0.875rem',
          transition: 'color 0.2s',
        }}
      >
        {name}
      </Typography>

      <Stars count={stars} color={color} />

      <Box
        sx={{
          px: 1.2, py: 0.35,
          borderRadius: 1,
          bgcolor:    hovered ? color : '#F3F4F6',
          transition: 'background 0.25s',
        }}
      >
        <Typography
          sx={{
            fontSize:   '0.68rem',
            fontWeight: 600,
            color:      hovered ? '#FFFFFF' : '#9CA3AF',
            transition: 'color 0.25s',
          }}
        >
          {level}
        </Typography>
      </Box>
    </Box>
  )
}

/* ── 홈 프로젝트 카드 ── */
const HomeProjectCard = ({ project }) => {
  const [imgError, setImgError] = useState(false)

  return (
    <Box
      sx={{
        flex: '1 0 280px',
        minWidth: 280,
        borderRadius: 3,
        border: '1px solid #E5E7EB',
        bgcolor: '#fff',
        overflow: 'hidden',
        transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 12px 36px rgba(255,122,0,0.14)',
          borderColor: '#FF7A00',
        },
      }}
    >
      {/* 썸네일 */}
      <Box sx={{ position: 'relative', width: '100%', paddingTop: '56.25%', overflow: 'hidden' }}>
        {imgError || !project.thumbnail_url ? (
          <Box
            sx={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, #FF7A00 0%, #F04438 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Typography sx={{ color: '#fff', fontWeight: 700, opacity: 0.85, fontSize: '0.95rem', px: 2, textAlign: 'center' }}>
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

      {/* 내용 */}
      <Box sx={{ p: 2.5 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '1rem', mb: 1, color: '#111827', lineHeight: 1.4 }}>
          {project.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.65,
          }}
        >
          {project.description}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
          {project.tech_stack?.slice(0, 3).map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              sx={{
                bgcolor: 'rgba(255,122,0,0.08)',
                color: '#FF7A00',
                fontWeight: 600,
                fontSize: '0.68rem',
                height: 22,
                borderRadius: 1,
              }}
            />
          ))}
        </Box>
        {project.detail_url && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<LaunchIcon sx={{ fontSize: 13 }} />}
            href={project.detail_url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ fontSize: '0.78rem', py: 0.8 }}
          >
            자세히 보기
          </Button>
        )}
      </Box>
    </Box>
  )
}

/* ── 프로젝트 스켈레톤 ── */
const ProjectSkeleton = () => (
  <Box sx={{ flex: '1 0 280px', minWidth: 280, borderRadius: 3, border: '1px solid #E5E7EB', overflow: 'hidden' }}>
    <Skeleton variant="rectangular" sx={{ width: '100%', paddingTop: '56.25%' }} />
    <Box sx={{ p: 2.5 }}>
      <Skeleton variant="text" width="70%" height={22} sx={{ mb: 1 }} />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="85%" sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
        <Skeleton variant="rounded" width={48} height={22} />
        <Skeleton variant="rounded" width={40} height={22} />
      </Box>
      <Skeleton variant="rounded" width={100} height={30} />
    </Box>
  </Box>
)

/* ── 섹션 래퍼 ── */
const Section = ({ id, bg, children }) => (
  <Box
    id={id}
    component="section"
    sx={{
      backgroundColor: bg || 'background.default',
      py: { xs: 10, sm: 14, md: 18 },
      px: { xs: 3, sm: 5, md: 8 },
    }}
  >
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>{children}</Box>
  </Box>
)

/* ── 섹션 레이블 ── */
const Label = ({ children }) => (
  <Typography
    variant="caption"
    sx={{
      display: 'inline-block',
      color: 'primary.main',
      fontWeight: 700,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      fontSize: '0.72rem',
      mb: 1.5,
    }}
  >
    {children}
  </Typography>
)

const HomePage = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('projects')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
      .limit(3)
      .then(({ data }) => {
        if (data) setProjects(data)
        setLoading(false)
      })
  }, [])

  return (
    <Box>

      {/* ── 1. Hero ── */}
      <Box
        id="hero"
        component="section"
        sx={{
          background: 'linear-gradient(135deg, #FF7A00 0%, #F04438 100%)',
          py: { xs: 14, sm: 18, md: 24 },
          px: { xs: 3, sm: 5, md: 8 },
        }}
      >
        <Box
          sx={{
            maxWidth: 1200,
            mx: 'auto',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: { xs: 6, md: 10 },
          }}
        >
          {/* 텍스트 */}
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                display: 'inline-block',
                bgcolor: 'rgba(255,255,255,0.18)',
                color: '#fff',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                px: 1.5,
                py: 0.6,
                borderRadius: 1,
                mb: 3,
              }}
            >
              UX/UI Designer
            </Box>
            <Typography
              variant="h1"
              sx={{
                color: '#FFFFFF',
                fontSize: { xs: '2.25rem', sm: '3rem', md: '3.75rem' },
                fontWeight: 800,
                lineHeight: 1.1,
                mb: 3,
                wordBreak: 'keep-all',
                letterSpacing: '-0.02em',
              }}
            >
              사용자의 흐름을<br />설계합니다.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.82)',
                maxWidth: 500,
                lineHeight: 1.8,
                mb: 5,
                fontSize: { xs: '1rem', md: '1.05rem' },
                wordBreak: 'keep-all',
              }}
            >
              섬세함으로 불편함을 읽고,<br />심플함으로 해결합니다.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                component={Link}
                to="/projects"
                size="large"
                sx={{
                  bgcolor: '#FFFFFF',
                  color: '#FF7A00',
                  fontWeight: 700,
                  px: 3.5,
                  py: 1.4,
                  background: '#FFFFFF',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.14)',
                  '&:hover': { bgcolor: '#F3F4F6', background: '#F3F4F6', boxShadow: '0 4px 20px rgba(0,0,0,0.18)' },
                }}
              >
                작업물 보기
              </Button>
              <Button
                variant="outlined"
                component={Link}
                to="/about"
                size="large"
                sx={{
                  borderColor: 'rgba(255,255,255,0.6)',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  px: 3.5,
                  py: 1.4,
                  borderWidth: '1.5px',
                  '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)', borderWidth: '1.5px' },
                }}
              >
                About Me
              </Button>
            </Box>
          </Box>

          {/* 프로필 이미지 */}
          <Box sx={{ flexShrink: 0 }}>
            <Box
              component="img"
              src={profileImg}
              alt="황혜경 프로필"
              sx={{
                width: { xs: 180, sm: 220, md: 280 },
                height: { xs: 180, sm: 220, md: 280 },
                objectFit: 'cover',
                borderRadius: '50%',
                border: '4px solid rgba(255,255,255,0.35)',
                boxShadow: '0 16px 48px rgba(0,0,0,0.22)',
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* ── 2. About Me ── */}
      <Section id="about" bg="#FFFFFF">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: { xs: 5, md: 10 },
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Label>About Me</Label>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.6rem', sm: '2rem', md: '2.25rem' }, mb: 1.5, wordBreak: 'keep-all' }}
            >
              안녕하세요,<br />황혜경입니다.
            </Typography>
            <Box sx={{ width: 40, height: 3, bgcolor: 'primary.main', borderRadius: 1, mb: 3 }} />
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', lineHeight: 1.9, mb: 4, wordBreak: 'keep-all' }}
            >
              동명대학교 산업디자인전공을 졸업하고, UX/UI 디자이너로 전향한 신입입니다.<br />
              전직을 고민하던 중 실제 UX 개선 과정을 접하며 데이터와 사용자 관점 기반의
              문제 해결 디자인의 중요성을 이해했습니다.<br /><br />
              보기 좋은 디자인이 아닌, 사용자 문제를 해결하는 설계 중심의 UX/UI 디자이너를
              목표로 성장 중입니다.
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/about" size="large" sx={{ px: 3.5, py: 1.4 }}>
              더 알아보기
            </Button>
          </Box>
          <Box sx={{ flexShrink: 0, display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
            <Box
              component="img"
              src={profileImg}
              alt="황혜경 프로필"
              sx={{
                width:  { xs: 160, sm: 200, md: 240 },
                height: { xs: 160, sm: 200, md: 240 },
                borderRadius: 3,
                objectFit: 'cover',
                boxShadow: '0 8px 28px rgba(0,0,0,0.12)',
                display: 'block',
              }}
            />
          </Box>
        </Box>
      </Section>

      {/* ── 3. Skills ── */}
      <Section id="skills" bg="#F9FAFB">
        <Box sx={{ mb: { xs: 5, md: 7 } }}>
          <Label>Skills</Label>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.6rem', sm: '2rem', md: '2.25rem' }, wordBreak: 'keep-all' }}>
            사용 도구
          </Typography>
          <Box sx={{ width: 40, height: 3, bgcolor: 'primary.main', borderRadius: 1, mt: 1.5 }} />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            아이콘에 마우스를 올려보세요
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
            gap: { xs: 2, md: 2.5 },
          }}
        >
          {SKILLS.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </Box>
      </Section>

      {/* ── 4. Projects ── */}
      <Section id="projects" bg="#FFFFFF">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: { xs: 5, md: 7 }, flexWrap: 'wrap', gap: 3 }}>
          <Box>
            <Label>Projects</Label>
            <Typography variant="h2" sx={{ fontSize: { xs: '1.6rem', sm: '2rem', md: '2.25rem' }, wordBreak: 'keep-all' }}>
              주요 프로젝트
            </Typography>
            <Box sx={{ width: 40, height: 3, bgcolor: 'primary.main', borderRadius: 1, mt: 1.5 }} />
          </Box>
          <Button variant="outlined" color="primary" component={Link} to="/projects" sx={{ px: 2.5, py: 1 }}>
            전체 보기 →
          </Button>
        </Box>
        <Box sx={{ display: 'flex', gap: { xs: 2, md: 3 }, overflowX: 'auto', pb: 1, '&::-webkit-scrollbar': { height: 4 }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#D1D5DB', borderRadius: 2 } }}>
          {loading
            ? [1, 2, 3].map((n) => <ProjectSkeleton key={n} />)
            : projects.length > 0
              ? projects.map((p) => <HomeProjectCard key={p.id} project={p} />)
              : [1, 2, 3].map((n) => (
                  <Box key={n} sx={{ flex: '1 0 280px', minWidth: 280, minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 3, border: '1px dashed #E5E7EB' }}>
                    <Typography variant="body2" color="text.disabled">준비 중입니다</Typography>
                  </Box>
                ))
          }
        </Box>
      </Section>

      {/* ── 5. Contact ── */}
      <ContactSection />

    </Box>
  )
}

export default HomePage
