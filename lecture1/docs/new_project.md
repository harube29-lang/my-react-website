# 새 프로젝트 시작 절차

## 1단계: 템플릿 복사

`_template_settings` 폴더를 새 프로젝트 이름으로 복사합니다.

```bash
# 예시: my-new-app 이라는 프로젝트 생성
cp -r _template_settings my-new-app
```

Windows (PowerShell):
```powershell
Copy-Item -Recurse _template_settings my-new-app
```

## 2단계: 프로젝트 정보 수정

`my-new-app/package.json`에서 프로젝트명 변경:

```json
{
  "name": "my-new-app",
  ...
}
```

## 3단계: 의존성 설치

```bash
cd my-new-app
npm install
```

## 4단계: 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속 확인

## 5단계: 기본 구조 세팅

아래 폴더를 `src/` 안에 생성합니다:

```
src/
├── components/
├── pages/
├── hooks/
└── utils/
```

## 6단계: 라우터 설정 (필요 시)

`App.jsx`에 react-router-dom 라우터 추가:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

## 포함된 패키지 목록

| 패키지 | 버전 | 용도 |
|--------|------|------|
| `@mui/material` | ^9 | UI 컴포넌트 |
| `@mui/icons-material` | ^9 | 아이콘 |
| `@emotion/react` | ^11 | MUI 스타일 엔진 |
| `@emotion/styled` | ^11 | MUI 스타일 엔진 |
| `@fontsource/roboto` | ^5 | Roboto 폰트 |
| `react-router-dom` | ^7 | 페이지 라우팅 |
| `vite` | ^5 | 빌드 도구 |

## 주의사항

- `node_modules` 폴더는 복사하지 않고 반드시 `npm install`로 새로 설치
- 테마 수정은 `src/theme.js`에서만 진행
- 디자인 시스템 문서(`design-system.md`) 기준으로 색상/간격 사용
