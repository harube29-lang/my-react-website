import { useState, useEffect, useRef, useCallback, memo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Slider from '@mui/material/Slider'
import SchoolIcon      from '@mui/icons-material/School'
import WorkOutlineIcon from '@mui/icons-material/WorkOutlined'
import EditIcon        from '@mui/icons-material/Edit'
import CheckIcon       from '@mui/icons-material/Check'
import { LuSearch, LuCompass, LuTrendingUp, LuPlus, LuMinus } from 'react-icons/lu'
import { alpha } from '@mui/material/styles'
import {
  usePortfolio,
  CATEGORY_COLORS,
  EXTRA_SKILLS,
  BASIC_INFO,
} from '../context/PortfolioContext'

/* ════════════════════════════════════════
   로컬 데이터
════════════════════════════════════════ */
const strengths = [
  { icon: LuSearch,    title: '섬세한 관찰력',    desc: '사용자가 어디서 막히는지 먼저 읽고, 불필요한 마찰 요소를 제거합니다.' },
  { icon: LuCompass,   title: '사용자 중심 설계',  desc: '흐름이 끊기지 않는, 누구나 쉽고 빠르게 이용할 수 있는 경험을 설계합니다.' },
  { icon: LuTrendingUp,title: '끊임없는 성장',     desc: '역량에 한계를 두지 않는 자세로 사용자 문제 해결 능력을 계속 확장합니다.' },
]

const CATEGORY_ORDER = ['Frontend', 'Framework', 'Design', 'Backend', 'Tool']

/* ════════════════════════════════════════
   **bold** 마커 → 오렌지 강조
════════════════════════════════════════ */
const Highlight = memo(({ text }) => {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <Box key={i} component="strong" sx={{ color: '#FF7A00', fontWeight: 700 }}>
            {part}
          </Box>
        ) : part
      )}
    </>
  )
})

/* ════════════════════════════════════════
   탭 패널
════════════════════════════════════════ */
const TabPanel = ({ children, value, index }) => (
  <Box
    role="tabpanel"
    id={`story-tabpanel-${index}`}
    aria-labelledby={`story-tab-${index}`}
    hidden={value !== index}
    sx={{ pt: { xs: 5, md: 6 } }}
  >
    {value === index && children}
  </Box>
)

/* ════════════════════════════════════════
   정보 태그
════════════════════════════════════════ */
const InfoTag = memo(({ icon: Icon, label }) => (
  <Box
    sx={{
      display: 'inline-flex', alignItems: 'center', gap: 1,
      border: '1px solid #E5E7EB', borderRadius: '6px',
      px: 1.8, py: 0.75, color: '#374151', fontSize: '0.8rem', fontWeight: 500,
    }}
  >
    <Icon sx={{ fontSize: 13, color: '#9CA3AF' }} aria-hidden="true" />
    {label}
  </Box>
))

/* ════════════════════════════════════════
   강점 아이템
════════════════════════════════════════ */
const StrengthItem = memo(({ icon: Icon, title, desc }) => (
  <Box>
    <Box sx={{ mb: 2.5 }} aria-hidden="true">
      <Icon size={26} color="#FF7A00" strokeWidth={1.5} />
    </Box>
    <Typography sx={{ fontWeight: 700, fontSize: '0.975rem', color: '#111827', mb: 1, letterSpacing: '-0.02em' }}>
      {title}
    </Typography>
    <Box sx={{ width: 20, height: '1.5px', bgcolor: '#E5E7EB', borderRadius: 1, mb: 1.5 }} />
    <Typography sx={{ color: '#6B7280', fontSize: '0.875rem', lineHeight: 1.85 }}>
      {desc}
    </Typography>
  </Box>
))

/* ════════════════════════════════════════
   스킬 바 — 애니메이션 + 툴팁 + 레벨 편집
════════════════════════════════════════ */
const SkillBar = memo(({ skill, animated, delay, onLevelChange }) => {
  const [editing, setEditing] = useState(false)
  const [draft,   setDraft]   = useState(skill.level)

  const color  = CATEGORY_COLORS[skill.category] ?? '#6B7280'
  const Icon   = skill.Icon

  const handleCommit = useCallback(() => {
    onLevelChange(skill.id, draft)
    setEditing(false)
  }, [skill.id, draft, onLevelChange])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') handleCommit()
    if (e.key === 'Escape') { setDraft(skill.level); setEditing(false) }
  }, [handleCommit, skill.level])

  return (
    <Tooltip
      title={editing ? '' : skill.desc}
      placement="top"
      arrow
      componentsProps={{ tooltip: { sx: { fontSize: '0.78rem', bgcolor: '#111827', py: 0.8, px: 1.4 } } }}
    >
      <Box
        sx={{ cursor: 'default', transition: 'opacity 0.2s' }}
        role="group"
        aria-label={`${skill.name} 숙련도 ${skill.level}%`}
      >
        {/* 상단: 아이콘 + 이름 + 퍼센트/편집 */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.9 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Icon size={15} color={color} aria-hidden="true" />
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#111827', letterSpacing: '-0.01em' }}>
              {skill.name}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography sx={{ fontSize: '0.75rem', color: '#9CA3AF', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>
              {editing ? `${draft}%` : `${skill.level}%`}
            </Typography>
            {/* 편집 토글 버튼 */}
            <Box
              component="button"
              onClick={() => editing ? handleCommit() : setEditing(true)}
              onKeyDown={handleKeyDown}
              aria-label={editing ? '레벨 저장' : `${skill.name} 레벨 편집`}
              sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 20, height: 20, border: 'none', borderRadius: '4px',
                bgcolor: editing ? alpha(color, 0.12) : 'transparent',
                cursor: 'pointer', color: editing ? color : '#D1D5DB',
                transition: 'all 0.2s', p: 0,
                '&:hover': { bgcolor: alpha(color, 0.1), color },
                '&:focus-visible': { outline: `2px solid ${color}`, outlineOffset: 2 },
              }}
            >
              {editing ? <CheckIcon sx={{ fontSize: 13 }} /> : <EditIcon sx={{ fontSize: 12 }} />}
            </Box>
          </Box>
        </Box>

        {/* 슬라이더 (편집 모드) */}
        <Collapse in={editing} timeout={200}>
          <Box sx={{ px: 0.5, pb: 1 }}>
            <Slider
              value={draft}
              min={5} max={100} step={5}
              onChange={(_, v) => setDraft(v)}
              onKeyDown={handleKeyDown}
              aria-label={`${skill.name} 숙련도 슬라이더`}
              size="small"
              sx={{
                color,
                '& .MuiSlider-thumb': { width: 14, height: 14 },
                '& .MuiSlider-rail': { bgcolor: '#F3F4F6' },
              }}
            />
          </Box>
        </Collapse>

        {/* 프로그레스 바 */}
        <Box
          sx={{ height: 5, bgcolor: '#F3F4F6', borderRadius: 3, overflow: 'hidden' }}
          role="progressbar"
          aria-valuenow={skill.level}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${skill.name} 숙련도`}
        >
          <Box
            sx={{
              height: '100%',
              width: animated ? `${editing ? draft : skill.level}%` : '0%',
              bgcolor: color,
              borderRadius: 3,
              transition: editing
                ? 'width 0.15s ease'
                : 'width 1.1s cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDelay: editing ? '0s' : `${delay}s`,
            }}
          />
        </Box>
      </Box>
    </Tooltip>
  )
})

/* ════════════════════════════════════════
   About Page
════════════════════════════════════════ */
const AboutPage = () => {
  const [tab,       setTab]       = useState(0)
  const [animated,  setAnimated]  = useState(false)
  const [showExtra, setShowExtra] = useState(false)
  const skillsRef = useRef(null)

  const { skills, sections, addSkill, removeSkill, updateSkillLevel } = usePortfolio()

  /* 스크롤 진입 시 프로그레스 바 애니메이션 */
  useEffect(() => {
    const el = skillsRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true) },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  /* 카테고리별 그룹핑 */
  const groupedSkills = CATEGORY_ORDER.reduce((acc, cat) => {
    const items = skills.filter(s => s.category === cat)
    if (items.length) acc.push({ category: cat, items })
    return acc
  }, [])

  const addableSkills = EXTRA_SKILLS.filter(e => !skills.some(s => s.id === e.id))

  const handleTabChange = useCallback((_, v) => setTab(v), [])
  const toggleExtra     = useCallback(() => setShowExtra(p => !p), [])

  let skillIndex = 0

  return (
    <Box sx={{ bgcolor: '#FFFFFF', minHeight: '100vh' }}>

      {/* ── 1. 히어로 배너 ── */}
      <Box
        sx={{
          bgcolor: '#FFFFFF',
          backgroundImage: [
            'repeating-linear-gradient(rgba(255,122,0,0.12) 0 1px, transparent 1px 100%)',
            'repeating-linear-gradient(90deg, rgba(255,122,0,0.12) 0 1px, transparent 1px 100%)',
          ].join(', '),
          backgroundSize: '36px 36px',
          py: { xs: 11, md: 15 },
          px: { xs: 4, sm: 6, md: 10 },
        }}
      >
        <Box
          sx={{
            maxWidth: 1100, mx: 'auto',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: { xs: 8, md: 8 },
          }}
        >
          {/* ── 좌측 60% ── */}
          <Box sx={{ flex: 3, minWidth: 0 }}>
            <Typography variant="caption"
              sx={{ color: '#FF7A00', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', fontSize: '0.72rem', display: 'block', mb: 2.5 }}>
              About Me
            </Typography>
            <Typography variant="h1"
              sx={{ color: '#111827', fontSize: { xs: '2.8rem', sm: '3.5rem', md: '4.2rem' }, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.04em', mb: 1.5 }}>
              {BASIC_INFO.name}
            </Typography>
            <Typography sx={{ color: '#FF7A00', fontSize: { xs: '0.92rem', md: '1rem' }, fontWeight: 600, mb: 3.5, letterSpacing: '-0.01em' }}>
              {BASIC_INFO.role}
            </Typography>
            <Box sx={{ width: 36, height: '2px', bgcolor: '#FF7A00', borderRadius: 1, mb: 4 }} aria-hidden="true" />

            {/* 자기소개 */}
            <Typography sx={{ color: '#374151', fontSize: { xs: '0.88rem', md: '0.975rem' }, lineHeight: 1.9, mb: 4, wordBreak: 'keep-all', letterSpacing: '-0.005em' }}>
              사용하기 쉽고 기억에 오래 남을 UX/UI를 만듭니다.<br />
              사용자가 불편을 느끼는 지점을 먼저 파악하고,<br />
              데이터와 공감을 바탕으로 문제를 해결하는 설계를 지향합니다.
            </Typography>

            {/* 역량 뱃지 */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 4.5 }}>
              {['UX Research', 'UI Design', 'Prototyping', 'Wireframing'].map(tag => (
                <Box key={tag}
                  sx={{
                    px: 1.8, py: 0.7,
                    borderRadius: '6px',
                    border: '1px solid rgba(255,122,0,0.4)',
                    color: '#FF7A00',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    bgcolor: 'rgba(255,122,0,0.04)',
                  }}>
                  {tag}
                </Box>
              ))}
            </Box>

            {/* 정보 태그 */}
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              <InfoTag icon={SchoolIcon} label={`${BASIC_INFO.education} · ${BASIC_INFO.major}`} />
              <InfoTag icon={WorkOutlineIcon} label={BASIC_INFO.experience} />
            </Box>
          </Box>

          {/* ── 우측 40% — 비주얼 영역 ── */}
          <Box
            sx={{
              flex: 2,
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: { xs: 'center', md: 'stretch' },
              minHeight: { xs: 300, md: 400 },
            }}
          >
            {/* 배경 대형 타이포그래피 */}
            <Box
              aria-hidden="true"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontFamily: '"Archivo Black", sans-serif',
                fontSize: { xs: '4.8rem', md: '6.5rem' },
                fontWeight: 900,
                color: '#FF7A00',
                opacity: 0.07,
                letterSpacing: '-0.04em',
                lineHeight: 0.9,
                userSelect: 'none',
                pointerEvents: 'none',
                zIndex: 0,
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              HYE<br />KYOUNG
            </Box>

            {/* 프로필 이미지 */}
            <Box
              sx={{
                position: 'relative',
                zIndex: 1,
                width: { xs: 260, sm: 320, md: 380 },
                height: { xs: 320, sm: 400, md: 480 },
                borderRadius: '16px',
                overflow: 'hidden',
                border: '2px solid rgba(255,122,0,0.18)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06)',
              }}
            >
              <Box
                component="img"
                src={BASIC_INFO.photo}
                alt={`${BASIC_INFO.name} 프로필 사진`}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  display: 'block',
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── 2. 핵심 강점 ── */}
      <Box component="section" aria-labelledby="strengths-heading"
        sx={{ bgcolor: '#FAFAFA', py: { xs: 9, md: 13 }, px: { xs: 4, sm: 6, md: 10 } }}>
        <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
          <Typography variant="caption" sx={{ color: '#FF7A00', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', fontSize: '0.72rem', display: 'block', mb: 1.5 }}>
            Core Strengths
          </Typography>
          <Typography id="strengths-heading" variant="h2"
            sx={{ fontSize: { xs: '1.35rem', md: '1.65rem' }, color: '#111827', fontWeight: 700, letterSpacing: '-0.03em', mb: 1 }}>
            나의 핵심 강점
          </Typography>
          <Box sx={{ width: 32, height: '2px', bgcolor: '#FF7A00', borderRadius: 1, mb: { xs: 7, md: 9 } }} aria-hidden="true" />
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: { xs: 7, md: 10 } }}>
            {strengths.map((s, i) => <StrengthItem key={i} icon={s.icon} title={s.title} desc={s.desc} />)}
          </Box>
        </Box>
      </Box>

      {/* ── 3. 기술 스킬 섹션 ── */}
      <Box
        ref={skillsRef}
        component="section"
        aria-labelledby="skills-heading"
        sx={{ bgcolor: '#FFFFFF', py: { xs: 9, md: 13 }, px: { xs: 4, sm: 6, md: 10 } }}
      >
        <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
          <Typography variant="caption" sx={{ color: '#FF7A00', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', fontSize: '0.72rem', display: 'block', mb: 1.5 }}>
            Skills
          </Typography>
          <Typography id="skills-heading" variant="h2"
            sx={{ fontSize: { xs: '1.35rem', md: '1.65rem' }, color: '#111827', fontWeight: 700, letterSpacing: '-0.03em', mb: 1 }}>
            기술 스택
          </Typography>
          <Box sx={{ width: 32, height: '2px', bgcolor: '#FF7A00', borderRadius: 1, mb: 0.5 }} aria-hidden="true" />
          <Typography variant="body2" color="text.disabled" sx={{ mb: { xs: 7, md: 8 }, fontSize: '0.78rem' }}>
            ✏️ 퍼센트 옆 편집 아이콘을 눌러 숙련도를 조정할 수 있어요 · 홈 탭 주요 스킬에 실시간 반영됩니다
          </Typography>

          {/* 카테고리별 그룹 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 6, md: 7 } }}>
            {groupedSkills.map(({ category, items }) => {
              const color = CATEGORY_COLORS[category]
              return (
                <Box key={category} component="section" aria-label={`${category} 카테고리`}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 3 }}>
                    <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: color }} aria-hidden="true" />
                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {category}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: { xs: 3, md: 3.5 } }}>
                    {items.map((skill) => {
                      const delay = (skillIndex++ * 0.08).toFixed(2)
                      return (
                        <SkillBar
                          key={skill.id}
                          skill={skill}
                          animated={animated}
                          delay={Number(delay)}
                          onLevelChange={updateSkillLevel}
                        />
                      )
                    })}
                  </Box>
                </Box>
              )
            })}
          </Box>

          {/* 스킬 추가 패널 */}
          <Box sx={{ mt: { xs: 6, md: 8 } }}>
            <Button
              onClick={toggleExtra}
              variant="outlined"
              size="small"
              startIcon={showExtra ? <LuMinus size={14} aria-hidden="true" /> : <LuPlus size={14} aria-hidden="true" />}
              aria-expanded={showExtra}
              aria-controls="skill-add-panel"
              sx={{
                borderColor: '#E5E7EB', color: '#374151', fontWeight: 600, fontSize: '0.8rem',
                textTransform: 'none', borderRadius: '8px', py: 0.9, px: 2,
                '&:hover': { borderColor: '#FF7A00', color: '#FF7A00', bgcolor: 'rgba(255,122,0,0.04)' },
              }}
            >
              {showExtra ? '스킬 목록 닫기' : `스킬 추가 (+${addableSkills.length})`}
            </Button>

            <Collapse in={showExtra} id="skill-add-panel">
              <Box sx={{ border: '1px solid #F3F4F6', borderRadius: 2, p: { xs: 2.5, md: 3 }, mt: 3 }}>
                {addableSkills.length === 0 ? (
                  <Typography sx={{ color: '#9CA3AF', fontSize: '0.875rem', textAlign: 'center', py: 1 }} role="status">
                    모든 스킬이 추가되었습니다 ✓
                  </Typography>
                ) : (
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 1.5 }}>
                    {addableSkills.map(skill => {
                      const Icon  = skill.Icon
                      const color = CATEGORY_COLORS[skill.category]
                      return (
                        <Box key={skill.id}
                          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                px: 2, py: 1.5, borderRadius: 1.5,
                                bgcolor: '#FAFAFA', border: '1px solid #F3F4F6' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Icon size={18} color={color} aria-hidden="true" />
                            <Box>
                              <Typography sx={{ fontSize: '0.83rem', fontWeight: 600, color: '#111827', lineHeight: 1.3 }}>
                                {skill.name}
                              </Typography>
                              <Typography sx={{ fontSize: '0.7rem', color: '#9CA3AF' }}>
                                {skill.category} · {skill.level}%
                              </Typography>
                            </Box>
                          </Box>
                          <Box
                            component="button"
                            onClick={() => addSkill(skill)}
                            aria-label={`${skill.name} 추가`}
                            sx={{
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              width: 28, height: 28, borderRadius: '50%',
                              border: '1px solid #E5E7EB', bgcolor: 'transparent', cursor: 'pointer',
                              color: '#9CA3AF', transition: 'all 0.2s',
                              '&:hover': { borderColor: color, color, bgcolor: alpha(color, 0.06) },
                              '&:focus-visible': { outline: `2px solid ${color}`, outlineOffset: 2 },
                            }}
                          >
                            <LuPlus size={13} aria-hidden="true" />
                          </Box>
                        </Box>
                      )
                    })}
                  </Box>
                )}

                {/* 추가된 스킬 제거 */}
                {skills.length > 5 && (
                  <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #F3F4F6' }}>
                    <Typography sx={{ fontSize: '0.72rem', color: '#9CA3AF', mb: 1.5, fontWeight: 500 }}>
                      추가된 스킬
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {skills.filter(s => s.id > 10).map(skill => {
                        const Icon  = skill.Icon
                        const color = CATEGORY_COLORS[skill.category]
                        return (
                          <Box key={skill.id}
                            sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.8,
                                  px: 1.5, py: 0.6, borderRadius: 1,
                                  bgcolor: alpha(color, 0.08), border: `1px solid ${alpha(color, 0.2)}` }}>
                            <Icon size={13} color={color} aria-hidden="true" />
                            <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color }}>
                              {skill.name}
                            </Typography>
                            <Box
                              component="button"
                              onClick={() => removeSkill(skill.id)}
                              aria-label={`${skill.name} 제거`}
                              sx={{
                                display: 'flex', alignItems: 'center', ml: 0.5,
                                border: 'none', bgcolor: 'transparent', cursor: 'pointer',
                                color: alpha(color, 0.5), p: 0, fontSize: '0.8rem',
                                '&:hover': { color },
                                '&:focus-visible': { outline: `2px solid ${color}`, outlineOffset: 2 },
                              }}>
                              ×
                            </Box>
                          </Box>
                        )
                      })}
                    </Box>
                  </Box>
                )}
              </Box>
            </Collapse>
          </Box>
        </Box>
      </Box>

      {/* ── 4. 이야기 탭 섹션 ── */}
      <Box component="section" aria-labelledby="story-heading"
        sx={{ bgcolor: '#FAFAFA', py: { xs: 9, md: 13 }, px: { xs: 4, sm: 6, md: 10 } }}>
        <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
          <Typography variant="caption" sx={{ color: '#FF7A00', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', fontSize: '0.72rem', display: 'block', mb: 1.5 }}>
            My Story
          </Typography>
          <Typography id="story-heading" variant="h2"
            sx={{ fontSize: { xs: '1.35rem', md: '1.65rem' }, color: '#111827', fontWeight: 700, letterSpacing: '-0.03em', mb: 1 }}>
            이야기
          </Typography>
          <Box sx={{ width: 32, height: '2px', bgcolor: '#FF7A00', borderRadius: 1, mb: { xs: 6, md: 8 } }} aria-hidden="true" />

          <Box sx={{ borderBottom: '1px solid #E5E7EB' }}>
            <Tabs
              value={tab}
              onChange={handleTabChange}
              textColor="inherit"
              aria-label="나의 이야기 섹션 탭"
              sx={{
                minHeight: 'auto',
                '& .MuiTabs-indicator': { backgroundColor: '#FF7A00', height: '2px', borderRadius: '2px 2px 0 0' },
                '& .MuiTab-root': {
                  minHeight: 'auto', py: 2, px: { xs: 1.5, md: 2.5 },
                  fontSize: { xs: '0.82rem', md: '0.875rem' }, fontWeight: 500,
                  color: '#9CA3AF', letterSpacing: '-0.01em', textTransform: 'none', minWidth: 'auto',
                  transition: 'color 0.2s ease',
                  '&.Mui-selected': { fontWeight: 700, color: '#111827' },
                },
              }}
            >
              {sections.map((s, i) => (
                <Tab
                  key={s.id}
                  label={s.title}
                  id={`story-tab-${i}`}
                  aria-controls={`story-tabpanel-${i}`}
                  disableRipple
                />
              ))}
            </Tabs>
          </Box>

          {sections.map((s, i) => (
            <TabPanel key={s.id} value={tab} index={i}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 720 }}>
                {s.content.map((para, pi) => (
                  <Typography key={pi} sx={{ color: '#374151', lineHeight: 1.9, fontSize: { xs: '0.9rem', md: '0.975rem' }, letterSpacing: '-0.005em', wordBreak: 'keep-all' }}>
                    <Highlight text={para} />
                  </Typography>
                ))}
              </Box>
            </TabPanel>
          ))}
        </Box>
      </Box>

      {/* ── 5. 하단 인용구 ── */}
      <Box sx={{ bgcolor: '#111827', py: { xs: 8, md: 12 }, px: { xs: 4, sm: 6, md: 10 }, textAlign: 'center' }}>
        <Box sx={{ maxWidth: 680, mx: 'auto' }}>
          <Typography sx={{ color: 'rgba(255,255,255,0.15)', fontSize: '3rem', lineHeight: 1, mb: 2, fontFamily: 'Georgia, serif' }} aria-hidden="true">
            "
          </Typography>
          <Typography component="blockquote"
            sx={{ color: 'rgba(255,255,255,0.9)', fontSize: { xs: '1.05rem', md: '1.25rem' }, fontWeight: 500, lineHeight: 1.85, letterSpacing: '-0.01em', wordBreak: 'keep-all', mb: 3.5, m: 0 }}>
            보기 좋은 디자인이 아닌,<br />
            사용자 문제를 해결하는 설계 중심의 UX/UI 디자이너
          </Typography>
          <Typography component="cite"
            sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', mt: 3.5, display: 'block' }}>
            — {BASIC_INFO.name}
          </Typography>
        </Box>
      </Box>

    </Box>
  )
}

export default AboutPage
