import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Link } from 'react-router-dom'
import { SiFigma, SiHtml5 } from 'react-icons/si'
import appleImg from '../assets/apple.jpg'
import profileImg from '../assets/profile.jpg'
import ContactSection from '../components/Contact/ContactSection'

/* ── 스킬 데이터 ── */
const SKILLS = [
  {
    type:    'react-icon',
    icon:    SiFigma,
    name:    'Figma',
    level:   '학습 중',
    stars:   2,
    color:   '#F24E1E',
    bgColor: '#FFF1EE',
  },
  {
    type:    'adobe',
    letter:  'Ai',
    name:    'Illustrator',
    level:   '학습 중',
    stars:   2,
    color:   '#FF9A00',
    bgColor: '#FFF8EE',
    adobeBg: '#2C0A00',
  },
  {
    type:    'adobe',
    letter:  'Ps',
    name:    'Photoshop',
    level:   '학습 중',
    stars:   2,
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
      {/* 아이콘 */}
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

      {/* 이름 */}
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

      {/* 별점 */}
      <Stars count={stars} color={color} />

      {/* 레벨 배지 */}
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

const HomePage = () => (
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
            Portfolio
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
            Hello,<br />I'm a Developer.
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
            메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
            포트폴리오의 첫 인상을 결정하는 가장 중요한 공간입니다.
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
              프로젝트 보기
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
            src={appleImg}
            alt="프로필"
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
            여기는 About Me 섹션입니다.
          </Typography>
          <Box sx={{ width: 40, height: 3, bgcolor: 'primary.main', borderRadius: 1, mb: 3 }} />
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', lineHeight: 1.9, mb: 4, wordBreak: 'keep-all' }}
          >
            간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다.
            개발자로서의 경험, 관심사, 목표 등을 이 공간에 담을 예정입니다.
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
        {[1, 2, 3].map((n) => (
          <Card key={n} sx={{ flex: '1 0 280px', minWidth: 280, minHeight: { xs: 200, md: 260 }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.disabled">프로젝트 {n} 썸네일</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Section>

    {/* ── 5. Contact ── */}
    <ContactSection />

  </Box>
)

export default HomePage
