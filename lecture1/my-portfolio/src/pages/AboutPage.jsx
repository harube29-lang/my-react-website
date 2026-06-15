import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Avatar from '@mui/material/Avatar'
import SchoolIcon      from '@mui/icons-material/School'
import WorkOutlineIcon from '@mui/icons-material/WorkOutlined'
import { LuSearch, LuCompass, LuTrendingUp } from 'react-icons/lu'
import profileImg from '../assets/profile.jpg'

/* ════════════════════════════════════════
   데이터
════════════════════════════════════════ */
const aboutMeData = {
  basicInfo: {
    name:      '황혜경',
    education: '동명대학교',
    major:     '산업디자인전공',
    experience:'신입',
    role:      'UX/UI 디자이너',
    photo:     profileImg,
  },
  strengths: [
    {
      icon:  LuSearch,
      title: '섬세한 관찰력',
      desc:  '사용자가 어디서 막히는지 먼저 읽고, 불필요한 마찰 요소를 제거합니다.',
    },
    {
      icon:  LuCompass,
      title: '사용자 중심 설계',
      desc:  '흐름이 끊기지 않는, 누구나 쉽고 빠르게 이용할 수 있는 경험을 설계합니다.',
    },
    {
      icon:  LuTrendingUp,
      title: '끊임없는 성장',
      desc:  '역량에 한계를 두지 않는 자세로 사용자 문제 해결 능력을 계속 확장합니다.',
    },
  ],
  sections: [
    {
      id:    'dev-story',
      title: '나의 개발 스토리',
      content: [
        '전직을 고민하던 중 UX/UI 디자인의 실제 수정 과정과 피드백을 다룬 콘텐츠를 접하게 되었습니다. 해당 영상에서는 사용자 흐름에서 발생하는 불필요한 요소를 제거하고, 정보 구조를 재정리하여 사용자의 피로도를 줄이는 과정을 중심으로 개선이 이루어졌습니다.',
        '이 과정을 보며 **단순히 시각적으로 완성된 결과물이 아니라, 데이터와 사용자 관점에 기반해 문제를 해결하는 디자인의 중요성**을 명확히 이해하게 되었습니다. 특히 사용자 경험을 개선하기 위한 구조적 사고와 반복적인 개선 과정에 깊이 공감하며 UX/UI 디자인 직무에 대한 확신을 갖게 되었습니다.',
        '이후 해당 분야로의 전향을 결정하고, 사용자 중심의 디자인 사고를 기반으로 툴 학습 및 사이드 프로젝트를 진행하며 실무 역량을 쌓고 있습니다. 현재는 **"보기 좋은 디자인"이 아닌 사용자 문제를 해결하는 설계 중심의 UX/UI 디자이너**를 목표로 지속적으로 성장하고 있습니다.',
      ],
    },
    {
      id:    'philosophy',
      title: '개발 철학',
      content: [
        '미적 완성도를 중요하게 여기지만, 디자인 과정에서는 항상 유니버설 디자인 관점을 우선적으로 검토해 왔습니다. 특정한 시각적 표현보다 **다양한 사용자가 직관적으로 이해하고 접근할 수 있는 경험 설계**를 더 중요하게 생각합니다.',
        '결국 **좋은 디자인은 심미성과 사용성의 균형** 위에서, 누구에게나 일관된 경험을 제공하는 것이라고 믿습니다.',
      ],
    },
    {
      id:    'personal',
      title: '개인적인 이야기',
      content: [
        '특별한 취미를 두기보다는, 비교적 섬세하게 사용 경험을 관찰하는 편입니다. 앱을 사용하면서 **불편한 요소나 비효율적인 흐름이 있으면 자연스럽게 인지**하고, 필요할 경우 개선 방향을 고민하거나 의견을 전달하기도 합니다.',
      ],
    },
  ],
}

/* ════════════════════════════════════════
   **bold** 마커 → 오렌지 강조 렌더러
════════════════════════════════════════ */
const Highlight = ({ text }) => {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <Box key={i} component="strong" sx={{ color: '#FF7A00', fontWeight: 700 }}>
            {part}
          </Box>
        ) : (
          part
        )
      )}
    </>
  )
}

/* ════════════════════════════════════════
   탭 패널
════════════════════════════════════════ */
const TabPanel = ({ children, value, index }) => (
  <Box role="tabpanel" hidden={value !== index} sx={{ pt: { xs: 5, md: 6 } }}>
    {value === index && children}
  </Box>
)

/* ════════════════════════════════════════
   정보 태그 (미니멀 보더)
════════════════════════════════════════ */
const InfoTag = ({ icon: Icon, label }) => (
  <Box
    sx={{
      display: 'inline-flex', alignItems: 'center', gap: 1,
      border: '1px solid #E5E7EB',
      borderRadius: '6px',
      px: 1.8, py: 0.75,
      color: '#374151',
      fontSize: '0.8rem',
      fontWeight: 500,
      letterSpacing: '-0.01em',
    }}
  >
    <Icon sx={{ fontSize: 13, color: '#9CA3AF' }} />
    {label}
  </Box>
)

/* ════════════════════════════════════════
   강점 아이템 (카드 없는 미니멀)
════════════════════════════════════════ */
const StrengthItem = ({ icon: Icon, title, desc }) => (
  <Box>
    <Box sx={{ mb: 2.5 }}>
      <Icon size={26} color="#FF7A00" strokeWidth={1.5} />
    </Box>
    <Typography sx={{ fontWeight: 700, fontSize: '0.975rem', color: '#111827', mb: 1, letterSpacing: '-0.02em' }}>
      {title}
    </Typography>
    <Box sx={{ width: 20, height: '1.5px', bgcolor: '#E5E7EB', borderRadius: 1, mb: 1.5 }} />
    <Typography sx={{ color: '#6B7280', fontSize: '0.875rem', lineHeight: 1.85, letterSpacing: '-0.005em' }}>
      {desc}
    </Typography>
  </Box>
)

/* ════════════════════════════════════════
   About Page
════════════════════════════════════════ */
const AboutPage = () => {
  const [tab, setTab] = useState(0)
  const { basicInfo, strengths, sections } = aboutMeData

  return (
    <Box sx={{ bgcolor: '#FFFFFF', minHeight: '100vh' }}>

      {/* ── 1. 히어로 배너 — 그리드 + 다크 텍스트 ── */}
      <Box
        sx={{
          bgcolor: '#FFFFFF',
          backgroundImage: [
            'repeating-linear-gradient(rgba(255,122,0,0.12) 0 1px, transparent 1px 100%)',
            'repeating-linear-gradient(90deg, rgba(255,122,0,0.12) 0 1px, transparent 1px 100%)',
          ].join(', '),
          backgroundSize: '36px 36px',
          py: { xs: 13, md: 18 },
          px: { xs: 4, sm: 6, md: 10 },
        }}
      >
        <Box
          sx={{
            maxWidth: 1100, mx: 'auto',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: { xs: 7, md: 14 },
          }}
        >
          {/* 텍스트 */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="caption"
              sx={{ color: '#FF7A00', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', fontSize: '0.72rem', display: 'block', mb: 2.5 }}
            >
              About Me
            </Typography>

            {/* 이름 — 큰 타이포그래피 */}
            <Typography
              variant="h1"
              sx={{
                color: '#111827',
                fontSize: { xs: '3rem', sm: '3.8rem', md: '5rem' },
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: '-0.04em',
                mb: 1.5,
              }}
            >
              {basicInfo.name}
            </Typography>

            {/* 직함 — 얇은 보조 텍스트 */}
            <Typography
              sx={{
                color: '#6B7280',
                fontSize: { xs: '0.95rem', md: '1.05rem' },
                fontWeight: 400,
                letterSpacing: '-0.01em',
                mb: 4,
              }}
            >
              {basicInfo.role}
            </Typography>

            <Box sx={{ width: 36, height: '2px', bgcolor: '#FF7A00', borderRadius: 1, mb: 4 }} />

            {/* 미니멀 정보 태그 */}
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              <InfoTag icon={SchoolIcon} label={`${basicInfo.education} · ${basicInfo.major}`} />
              <InfoTag icon={WorkOutlineIcon} label={basicInfo.experience} />
            </Box>
          </Box>

          {/* 프로필 사진 */}
          <Box sx={{ flexShrink: 0 }}>
            <Avatar
              src={basicInfo.photo}
              alt={basicInfo.name}
              sx={{
                width:  { xs: 120, md: 160 },
                height: { xs: 120, md: 160 },
                border: '2px solid rgba(255,122,0,0.15)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* ── 2. 핵심 강점 — 카드 없는 미니멀 그리드 ── */}
      <Box sx={{ bgcolor: '#FAFAFA', py: { xs: 9, md: 13 }, px: { xs: 4, sm: 6, md: 10 } }}>
        <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
          <Typography variant="caption"
            sx={{ color: '#FF7A00', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', fontSize: '0.72rem', display: 'block', mb: 1.5 }}>
            Core Strengths
          </Typography>
          <Typography variant="h2"
            sx={{ fontSize: { xs: '1.35rem', md: '1.65rem' }, color: '#111827', fontWeight: 700, letterSpacing: '-0.03em', mb: 1 }}>
            나의 핵심 강점
          </Typography>
          <Box sx={{ width: 32, height: '2px', bgcolor: '#FF7A00', borderRadius: 1, mb: { xs: 7, md: 9 } }} />

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
              gap: { xs: 7, md: 10 },
            }}
          >
            {strengths.map((s, i) => (
              <StrengthItem key={i} icon={s.icon} title={s.title} desc={s.desc} />
            ))}
          </Box>
        </Box>
      </Box>

      {/* ── 3. 이야기 탭 섹션 ── */}
      <Box sx={{ bgcolor: '#FFFFFF', py: { xs: 9, md: 13 }, px: { xs: 4, sm: 6, md: 10 } }}>
        <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
          <Typography variant="caption"
            sx={{ color: '#FF7A00', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', fontSize: '0.72rem', display: 'block', mb: 1.5 }}>
            My Story
          </Typography>
          <Typography variant="h2"
            sx={{ fontSize: { xs: '1.35rem', md: '1.65rem' }, color: '#111827', fontWeight: 700, letterSpacing: '-0.03em', mb: 1 }}>
            이야기
          </Typography>
          <Box sx={{ width: 32, height: '2px', bgcolor: '#FF7A00', borderRadius: 1, mb: { xs: 6, md: 8 } }} />

          {/* 탭 — 플랫 + 오렌지 언더라인만 */}
          <Box sx={{ borderBottom: '1px solid #F3F4F6' }}>
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              textColor="inherit"
              sx={{
                minHeight: 'auto',
                '& .MuiTabs-indicator': {
                  backgroundColor: '#FF7A00',
                  height: '2px',
                  borderRadius: '2px 2px 0 0',
                },
                '& .MuiTab-root': {
                  minHeight: 'auto',
                  py: 2,
                  px: { xs: 1.5, md: 2.5 },
                  fontSize: { xs: '0.82rem', md: '0.875rem' },
                  fontWeight: 500,
                  color: '#9CA3AF',
                  letterSpacing: '-0.01em',
                  textTransform: 'none',
                  minWidth: 'auto',
                  transition: 'color 0.2s ease',
                  '&.Mui-selected': {
                    fontWeight: 700,
                    color: '#111827',
                  },
                },
              }}
            >
              {sections.map((s) => (
                <Tab key={s.id} label={s.title} disableRipple />
              ))}
            </Tabs>
          </Box>

          {/* 탭 본문 */}
          {sections.map((s, i) => (
            <TabPanel key={s.id} value={tab} index={i}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 720 }}>
                {s.content.map((para, pi) => (
                  <Typography
                    key={pi}
                    sx={{
                      color: '#374151',
                      lineHeight: 1.9,
                      fontSize: { xs: '0.9rem', md: '0.975rem' },
                      letterSpacing: '-0.005em',
                      wordBreak: 'keep-all',
                    }}
                  >
                    <Highlight text={para} />
                  </Typography>
                ))}
              </Box>
            </TabPanel>
          ))}
        </Box>
      </Box>

      {/* ── 4. 하단 인용구 ── */}
      <Box
        sx={{
          bgcolor: '#111827',
          py: { xs: 8, md: 12 },
          px: { xs: 4, sm: 6, md: 10 },
          textAlign: 'center',
        }}
      >
        <Box sx={{ maxWidth: 680, mx: 'auto' }}>
          <Typography
            sx={{ color: 'rgba(255,255,255,0.15)', fontSize: '3rem', lineHeight: 1, mb: 2, fontFamily: 'Georgia, serif' }}
          >
            "
          </Typography>
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: { xs: '1.05rem', md: '1.25rem' },
              fontWeight: 500,
              lineHeight: 1.85,
              letterSpacing: '-0.01em',
              wordBreak: 'keep-all',
              mb: 3.5,
            }}
          >
            보기 좋은 디자인이 아닌,<br />
            사용자 문제를 해결하는 설계 중심의 UX/UI 디자이너
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            — {basicInfo.name}
          </Typography>
        </Box>
      </Box>

    </Box>
  )
}

export default AboutPage
