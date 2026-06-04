# 코드 컨벤션

## 파일 및 폴더 구조

```
src/
├── components/       # 재사용 가능한 컴포넌트
│   └── ComponentName/
│       ├── index.jsx
│       └── ComponentName.jsx
├── pages/            # 라우트별 페이지 컴포넌트
├── hooks/            # 커스텀 훅
├── utils/            # 유틸리티 함수
├── assets/           # 이미지, 폰트 등 정적 파일
├── theme.js          # MUI 테마 설정
├── App.jsx
└── main.jsx
```

## 명명 규칙

### 컴포넌트
- PascalCase 사용: `UserCard`, `NavBar`, `LoginForm`
- 파일명과 컴포넌트명 일치

### 변수 / 함수
- camelCase 사용: `userName`, `handleClick`, `fetchData`
- 이벤트 핸들러는 `handle` 접두사: `handleSubmit`, `handleChange`

### 상수
- UPPER_SNAKE_CASE 사용: `API_URL`, `MAX_COUNT`

### CSS / 스타일
- MUI `sx` prop 우선 사용
- 클래스명 필요 시 camelCase

## Import 순서

```jsx
// 1. React
import React, { useState, useEffect } from 'react'

// 2. 외부 라이브러리
import { Box, Typography, Button } from '@mui/material'

// 3. 내부 컴포넌트
import UserCard from '../components/UserCard'

// 4. 유틸리티 / 훅
import { formatDate } from '../utils/date'

// 5. 스타일 / 에셋
import './styles.css'
```

## 컴포넌트 작성 규칙

```jsx
// 함수형 컴포넌트 사용 (화살표 함수)
const MyComponent = ({ title, onClick }) => {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(prev => prev + 1)
    onClick?.()
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">{title}</Typography>
      <Button onClick={handleClick}>{count}</Button>
    </Box>
  )
}

export default MyComponent
```

## MUI 사용 규칙

- 레이아웃: `Box`, `Stack`, `Grid` 사용
- 간격: `sx={{ p: 2, m: 1 }}` (MUI spacing 단위 사용)
- 색상: `color="primary"`, `color="secondary"` 등 테마 색상 우선
- 직접 픽셀값보다 테마 기반 값 사용

## 기타

- 컴포넌트당 하나의 파일
- 100줄 이상이면 분리 고려
- prop-types 또는 JSDoc으로 props 명시
