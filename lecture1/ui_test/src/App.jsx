import { Box, Container, Typography, Divider } from '@mui/material'
import Section01_Button from './components/sections/Section01_Button'
import Section02_Input from './components/sections/Section02_Input'
import Section03_Navigation from './components/sections/Section03_Navigation'
import Section04_Dropdown from './components/sections/Section04_Dropdown'
import Section05_Checkbox from './components/sections/Section05_Checkbox'
import Section06_Radio from './components/sections/Section06_Radio'
import Section07_Slider from './components/sections/Section07_Slider'
import Section08_Modal from './components/sections/Section08_Modal'
import Section09_Card from './components/sections/Section09_Card'
import Section10_DragDrop from './components/sections/Section10_DragDrop'
import Section11_Scroll from './components/sections/Section11_Scroll'
import Section12_Animation from './components/sections/Section12_Animation'
import Section13_Menu from './components/sections/Section13_Menu'
import Section14_Sidebar from './components/sections/Section14_Sidebar'
import Section15_Hover from './components/sections/Section15_Hover'
import Section16_Swipe from './components/sections/Section16_Swipe'

const App = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>

      {/* ── 히어로 헤더 ── */}
      <Box
        sx={{
          bgcolor: '#2e0e07',
          color: 'white',
          py: { xs: 8, md: 12 },
          px: 3,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="caption"
            sx={{
              color: '#ecb55d',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              display: 'block',
              mb: 3,
            }}
          >
            UI Component Library
          </Typography>
          <Typography
            variant="h1"
            sx={{
              color: 'white',
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3.75rem' },
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              maxWidth: 640,
              mb: 4,
            }}
          >
            SHAPING THE<br />
            FUTURE OF<br />
            UI COMPONENTS
          </Typography>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)', mb: 4, maxWidth: 480 }} />
          <Typography
            variant="body1"
            sx={{ color: 'rgba(255,255,255,0.55)', maxWidth: 480, lineHeight: 1.8 }}
          >
            16개의 핵심 UI 요소를 순차적으로 구현한 컴포넌트 쇼케이스입니다.
            MUI 기반의 일관된 디자인 시스템으로 구성되어 있습니다.
          </Typography>
        </Container>
      </Box>

      {/* ── 섹션 인덱스 바 ── */}
      <Box sx={{ bgcolor: '#eae150', borderBottom: '1px solid #e8dbd8', py: 2, px: 3 }}>
        <Container maxWidth="lg">
          <Typography variant="caption" sx={{ color: '#6b6b6b', letterSpacing: '0.1em' }}>
            01 Button &nbsp;·&nbsp; 02 Input &nbsp;·&nbsp; 03 Navigation &nbsp;·&nbsp;
            04 Dropdown &nbsp;·&nbsp; 05 Checkbox &nbsp;·&nbsp; 06 Radio &nbsp;·&nbsp;
            07 Slider &nbsp;·&nbsp; 08 Modal &nbsp;·&nbsp; 09 Card &nbsp;·&nbsp;
            10 Drag&amp;Drop &nbsp;·&nbsp; 11 Scroll &nbsp;·&nbsp; 12 Animation &nbsp;·&nbsp;
            13 Menu &nbsp;·&nbsp; 14 Sidebar &nbsp;·&nbsp; 15 Hover &nbsp;·&nbsp; 16 Swipe
          </Typography>
        </Container>
      </Box>

      {/* ── 섹션 본문 ── */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Section01_Button />
        <Section02_Input />
        <Section03_Navigation />
        <Section04_Dropdown />
        <Section05_Checkbox />
        <Section06_Radio />
        <Section07_Slider />
        <Section08_Modal />
        <Section09_Card />
        <Section10_DragDrop />
        <Section11_Scroll />
        <Section12_Animation />
        <Section13_Menu />
        <Section14_Sidebar />
        <Section15_Hover />
        <Section16_Swipe />
      </Container>

      {/* ── 푸터 ── */}
      <Box sx={{ bgcolor: '#2e0e07', color: 'rgba(255,255,255,0.4)', py: 5, px: 3 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="caption" sx={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              UI Component Showcase
            </Typography>
            <Typography variant="caption">
              © 2026 · Built with React + MUI
            </Typography>
          </Box>
        </Container>
      </Box>

    </Box>
  )
}

export default App
