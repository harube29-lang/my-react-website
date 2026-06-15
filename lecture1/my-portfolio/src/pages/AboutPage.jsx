import { useState } from 'react'
import {
  Box, Typography, Divider, Card, CardContent,
  Tab, Tabs, Avatar, Chip, Stack,
} from '@mui/material'
import SchoolIcon      from '@mui/icons-material/School'
import WorkOutlineIcon from '@mui/icons-material/WorkOutlined'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import profileImg from '../assets/profile.jpg'

/* ── 데이터 ── */
const aboutMeData = {
  basicInfo: {
    name:       '황혜경',
    education:  '동명대학교',
    major:      '산업디자인전공',
    experience: '신입',
    role:       'UX/UI 디자이너',
    photo:      profileImg,
  },
  strengths: [
    {
      emoji: '🔍',
      title: '섬세한 관찰력',
      desc:  '사용자가 어디서 막히는지 먼저 읽고, 불필요한 마찰 요소를 제거합니다.',
    },
    {
      emoji: '🧭',
      title: '사용자 중심 설계',
      desc:  '흐름이 끊기지 않는, 누구나 쉽고 빠르게 이용할 수 있는 경험을 설계합니다.',
    },
    {
      emoji: '🌱',
      title: '끊임없는 성장',
      desc:  '역량에 한계를 두지 않는 자세로 사용자 문제 해결 능력을 계속 확장합니다.',
    },
  ],
  sections: [
    {
      id:         'dev-story',
      title:      '나의 개발 스토리',
      showInHome: true,
      content: `전직을 고민하던 중 UX/UI 디자인의 실제 수정 과정과 피드백을 다룬 콘텐츠를 접하게 되었습니다. 해당 영상에서는 사용자 흐름에서 발생하는 불필요한 요소를 제거하고, 정보 구조를 재정리하여 사용자의 피로도를 줄이는 과정을 중심으로 개선이 이루어졌습니다.

이 과정을 보며 단순히 시각적으로 완성된 결과물이 아니라, 데이터와 사용자 관점에 기반해 문제를 해결하는 디자인의 중요성을 명확히 이해하게 되었습니다. 특히 사용자 경험을 개선하기 위한 구조적 사고와 반복적인 개선 과정에 깊이 공감하며 UX/UI 디자인 직무에 대한 확신을 갖게 되었습니다.

이후 해당 분야로의 전향을 결정하고, 사용자 중심의 디자인 사고를 기반으로 툴 학습 및 사이드 프로젝트를 진행하며 실무 역량을 쌓고 있습니다. 현재는 "보기 좋은 디자인"이 아닌 사용자 문제를 해결하는 설계 중심의 UX/UI 디자이너를 목표로 지속적으로 성장하고 있습니다.`,
    },
    {
      id:         'philosophy',
      title:      '디자인 철학',
      showInHome: true,
      content: `미적 완성도를 중요하게 여기지만, 디자인 과정에서는 항상 유니버설 디자인 관점을 우선적으로 검토해 왔습니다. 특정한 시각적 표현보다 다양한 사용자가 직관적으로 이해하고 접근할 수 있는 경험 설계를 더 중요하게 생각합니다.

결국 좋은 디자인은 심미성과 사용성의 균형 위에서, 누구에게나 일관된 경험을 제공하는 것이라고 믿습니다.`,
    },
    {
      id:         'personal',
      title:      '개인적인 이야기',
      showInHome: false,
      content: `특별한 취미를 두기보다는, 비교적 섬세하게 사용 경험을 관찰하는 편입니다. 앱을 사용하면서 불편한 요소나 비효율적인 흐름이 있으면 자연스럽게 인지하고, 필요할 경우 개선 방향을 고민하거나 의견을 전달하기도 합니다.`,
    },
  ],
}

/* ── 탭 패널 ── */
const TabPanel = ({ children, value, index }) => (
  <Box role="tabpanel" hidden={value !== index} sx={{ pt: { xs: 4, md: 5 } }}>
    {value === index && children}
  </Box>
)

/* ── 메인 컴포넌트 ── */
const AboutPage = () => {
  const [tab, setTab] = useState(0)

  const { basicInfo, strengths, sections } = aboutMeData

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>

      {/* ── 히어로 배너 ── */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #FF7A00 0%, #F04438 100%)',
          py: { xs: 8, md: 12 },
          px: { xs: 3, sm: 5, md: 8 },
        }}
      >
        <Box
          sx={{
            maxWidth: 1100,
            mx: 'auto',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: { xs: 5, md: 10 },
          }}
        >
          {/* 텍스트 */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255,255,255,0.75)',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontSize: '0.72rem',
                display: 'block',
                mb: 2,
              }}
            >
              About Me
            </Typography>
            <Typography
              variant="h1"
              sx={{
                color: '#FFFFFF',
                fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.25rem' },
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                mb: 2,
              }}
            >
              {basicInfo.name}
            </Typography>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: { xs: '1rem', md: '1.15rem' },
                fontWeight: 500,
                mb: 3,
              }}
            >
              {basicInfo.role}
            </Typography>
            <Box sx={{ width: 48, height: 3, bgcolor: 'rgba(255,255,255,0.5)', borderRadius: 1, mb: 4 }} />

            {/* 기본 정보 배지 */}
            <Stack direction="row" spacing={1.5} flexWrap="wrap" gap={1.5}>
              <Chip
                icon={<SchoolIcon sx={{ fontSize: 15, color: '#FF7A00 !important' }} />}
                label={`${basicInfo.education} · ${basicInfo.major}`}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.95)',
                  color: '#374151',
                  fontWeight: 500,
                  fontSize: '0.8rem',
                  height: 32,
                }}
              />
              <Chip
                icon={<WorkOutlineIcon sx={{ fontSize: 15, color: '#FF7A00 !important' }} />}
                label={basicInfo.experience}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.95)',
                  color: '#374151',
                  fontWeight: 500,
                  fontSize: '0.8rem',
                  height: 32,
                }}
              />
            </Stack>
          </Box>

          {/* 프로필 사진 */}
          <Box sx={{ flexShrink: 0 }}>
            <Avatar
              src={basicInfo.photo}
              alt={basicInfo.name}
              sx={{
                width:  { xs: 140, md: 180 },
                height: { xs: 140, md: 180 },
                border: '4px solid rgba(255,255,255,0.4)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* ── 핵심 강점 3카드 ── */}
      <Box sx={{ bgcolor: '#FFFFFF', py: { xs: 7, md: 10 }, px: { xs: 3, sm: 5, md: 8 } }}>
        <Box sx={{ maxWidth: 1100, mx: 'auto' }}>

          {/* 섹션 라벨 */}
          <Box sx={{ mb: { xs: 5, md: 7 } }}>
            <Typography
              variant="caption"
              sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', fontSize: '0.72rem', display: 'block', mb: 1 }}
            >
              Core Strengths
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '1.9rem' } }}>
              나의 핵심 강점
            </Typography>
            <Box sx={{ width: 40, height: 3, bgcolor: 'primary.main', borderRadius: 1, mt: 1.5 }} />
          </Box>

          {/* 강점 카드 3개 */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {strengths.map((s, i) => (
              <Card
                key={i}
                sx={{
                  p: 0,
                  border: '1px solid',
                  borderColor: 'grey.200',
                  transition: 'transform 0.22s, box-shadow 0.22s, border-color 0.22s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 28px rgba(255,122,0,0.12)',
                    borderColor: 'primary.main',
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 3.5 } }}>
                  <Typography sx={{ fontSize: '2rem', mb: 2, lineHeight: 1 }}>{s.emoji}</Typography>
                  <Typography variant="h3" sx={{ fontSize: { xs: '1rem', md: '1.05rem' }, mb: 1.5, color: '#111827' }}>
                    {s.title}
                  </Typography>
                  <Divider sx={{ mb: 1.5, borderColor: 'grey.200' }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.75 }}>
                    {s.desc}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>

      {/* ── 콘텐츠 탭 섹션 ── */}
      <Box sx={{ bgcolor: '#F9FAFB', py: { xs: 7, md: 10 }, px: { xs: 3, sm: 5, md: 8 } }}>
        <Box sx={{ maxWidth: 1100, mx: 'auto' }}>

          {/* 섹션 라벨 */}
          <Box sx={{ mb: { xs: 5, md: 6 } }}>
            <Typography
              variant="caption"
              sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', fontSize: '0.72rem', display: 'block', mb: 1 }}
            >
              My Story
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '1.9rem' } }}>
              이야기
            </Typography>
            <Box sx={{ width: 40, height: 3, bgcolor: 'primary.main', borderRadius: 1, mt: 1.5 }} />
          </Box>

          {/* 탭 */}
          <Box
            sx={{
              bgcolor: '#FFFFFF',
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'grey.200',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ borderBottom: '1px solid', borderColor: 'grey.200', px: { xs: 2, md: 4 } }}>
              <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                textColor="primary"
                indicatorColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  '& .MuiTab-root': {
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    color: 'text.secondary',
                    py: 2.5,
                    px: { xs: 1.5, md: 2.5 },
                    minWidth: 'auto',
                    '&.Mui-selected': { fontWeight: 700, color: 'primary.main' },
                  },
                  '& .MuiTabs-indicator': {
                    height: 2.5,
                    borderRadius: '2px 2px 0 0',
                    background: 'linear-gradient(90deg, #FF7A00, #F04438)',
                  },
                }}
              >
                {sections.map((s) => (
                  <Tab
                    key={s.id}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {s.title}
                        {s.showInHome && (
                          <Box
                            component="span"
                            sx={{
                              display: { xs: 'none', sm: 'inline-block' },
                              fontSize: '0.62rem',
                              fontWeight: 600,
                              color: 'primary.main',
                              bgcolor: 'rgba(255,122,0,0.1)',
                              px: 0.8,
                              py: 0.2,
                              borderRadius: 0.75,
                              letterSpacing: '0.03em',
                            }}
                          >
                            홈 표시
                          </Box>
                        )}
                      </Box>
                    }
                  />
                ))}
              </Tabs>
            </Box>

            {/* 탭 내용 */}
            <Box sx={{ px: { xs: 3, md: 5 }, pb: { xs: 4, md: 6 } }}>
              {sections.map((s, i) => (
                <TabPanel key={s.id} value={tab} index={i}>

                  {/* 탭 헤더 */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <AccountCircleIcon sx={{ color: 'primary.main', fontSize: 22, flexShrink: 0 }} />
                    <Typography variant="h3" sx={{ fontSize: { xs: '1.05rem', md: '1.15rem' }, color: '#111827' }}>
                      {s.title}
                    </Typography>
                    {s.showInHome && (
                      <Chip
                        label="홈 표시"
                        size="small"
                        sx={{
                          bgcolor: 'rgba(255,122,0,0.08)',
                          color: 'primary.main',
                          fontWeight: 600,
                          fontSize: '0.68rem',
                          height: 22,
                          borderRadius: 1,
                        }}
                      />
                    )}
                  </Box>

                  <Divider sx={{ mb: 3.5 }} />

                  {/* 본문 — 단락 나눠서 출력 */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    {s.content.split('\n\n').map((para, pi) => (
                      <Typography
                        key={pi}
                        variant="body1"
                        sx={{
                          color: '#374151',
                          lineHeight: 2,
                          fontSize: { xs: '0.9rem', md: '0.975rem' },
                          wordBreak: 'keep-all',
                        }}
                      >
                        {para}
                      </Typography>
                    ))}
                  </Box>

                </TabPanel>
              ))}
            </Box>
          </Box>

        </Box>
      </Box>

      {/* ── 하단 인용구 ── */}
      <Box
        sx={{
          bgcolor: '#111827',
          py: { xs: 7, md: 10 },
          px: { xs: 3, sm: 5, md: 8 },
          textAlign: 'center',
        }}
      >
        <Box sx={{ maxWidth: 680, mx: 'auto' }}>
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.35)',
              fontSize: '3rem',
              lineHeight: 1,
              mb: 2,
              fontFamily: 'Georgia, serif',
            }}
          >
            "
          </Typography>
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: { xs: '1.05rem', md: '1.25rem' },
              fontWeight: 500,
              lineHeight: 1.8,
              letterSpacing: '-0.01em',
              wordBreak: 'keep-all',
              mb: 3,
            }}
          >
            보기 좋은 디자인이 아닌,<br />
            사용자 문제를 해결하는 설계 중심의 UX/UI 디자이너
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', letterSpacing: '0.08em' }}>
            — {basicInfo.name}
          </Typography>
        </Box>
      </Box>

    </Box>
  )
}

export default AboutPage
