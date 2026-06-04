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

const App = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" sx={{ mb: 1, fontWeight: 700 }}>
          UI 컴포넌트 테스트
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          16개 UI 요소를 순차적으로 추가하는 테스트 페이지입니다.
        </Typography>
        <Divider sx={{ mb: 4 }} />

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
        {/* 다음 섹션을 아래에 순서대로 추가 */}

      </Container>
    </Box>
  )
}

export default App
