import { createContext, useContext, useState, useMemo, useCallback } from 'react'
import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiFigma,
  SiVuedotjs, SiTypescript, SiAngular,
  SiNodedotjs, SiPython, SiGit, SiMongodb,
} from 'react-icons/si'
import profileImg from '../assets/profile.jpg'

/* ════════════════════════════════════════
   카테고리 색상 (외부에서도 사용)
════════════════════════════════════════ */
export const CATEGORY_COLORS = {
  Frontend:  '#3B82F6',
  Framework: '#8B5CF6',
  Design:    '#EC4899',
  Backend:   '#10B981',
  Tool:      '#F59E0B',
}

/* ════════════════════════════════════════
   기본 스킬 (5종)
════════════════════════════════════════ */
const DEFAULT_SKILLS = [
  { id: 1, Icon: SiHtml5,       name: 'HTML',       level: 80, category: 'Frontend',  desc: '웹 페이지 구조를 정의하는 마크업 언어' },
  { id: 2, Icon: SiCss,         name: 'CSS',        level: 75, category: 'Frontend',  desc: '시각적 스타일링과 반응형 레이아웃 구현' },
  { id: 3, Icon: SiJavascript,  name: 'JavaScript', level: 70, category: 'Frontend',  desc: '동적 인터랙션과 비동기 처리 구현' },
  { id: 4, Icon: SiReact,       name: 'React',      level: 60, category: 'Framework', desc: '컴포넌트 기반 SPA 개발' },
  { id: 5, Icon: SiFigma,       name: 'Figma',      level: 65, category: 'Design',    desc: 'UI/UX 디자인 및 프로토타이핑 툴' },
]

/* ════════════════════════════════════════
   추가 스킬 풀 (스킬 추가 버튼에서 사용)
════════════════════════════════════════ */
export const EXTRA_SKILLS = [
  { id: 11, Icon: SiVuedotjs,   name: 'Vue.js',     level: 40, category: 'Frontend',  desc: '점진적 채택이 가능한 JavaScript 프레임워크' },
  { id: 12, Icon: SiTypescript, name: 'TypeScript', level: 45, category: 'Frontend',  desc: '정적 타입을 지원하는 JavaScript 슈퍼셋' },
  { id: 13, Icon: SiAngular,    name: 'Angular',    level: 30, category: 'Frontend',  desc: 'Google이 개발한 TypeScript 기반 프레임워크' },
  { id: 14, Icon: SiNodedotjs,  name: 'Node.js',    level: 40, category: 'Backend',   desc: '서버사이드 JavaScript 런타임 환경' },
  { id: 15, Icon: SiPython,     name: 'Python',     level: 35, category: 'Backend',   desc: '데이터 분석 및 백엔드 개발 언어' },
  { id: 16, Icon: SiGit,        name: 'Git',        level: 65, category: 'Tool',      desc: '버전 관리 및 팀 협업 도구' },
  { id: 17, Icon: SiMongodb,    name: 'MongoDB',    level: 35, category: 'Tool',      desc: 'NoSQL 기반 도큐먼트 데이터베이스' },
]

/* ════════════════════════════════════════
   기본 정보
════════════════════════════════════════ */
export const BASIC_INFO = {
  name:      '황혜경',
  education: '동명대학교',
  major:     '산업디자인전공',
  experience:'신입',
  role:      'UX/UI 디자이너',
  photo:     profileImg,
}

/* ════════════════════════════════════════
   About 섹션 텍스트 (showInHome 플래그 포함)
════════════════════════════════════════ */
export const DEFAULT_SECTIONS = [
  {
    id: 'dev-story',
    title: '나의 개발 스토리',
    showInHome: true,
    content: [
      '전직을 고민하던 중 UX/UI 디자인의 실제 수정 과정과 피드백을 다룬 콘텐츠를 접하게 되었습니다. 해당 영상에서는 사용자 흐름에서 발생하는 불필요한 요소를 제거하고, 정보 구조를 재정리하여 사용자의 피로도를 줄이는 과정을 중심으로 개선이 이루어졌습니다.',
      '이 과정을 보며 **단순히 시각적으로 완성된 결과물이 아니라, 데이터와 사용자 관점에 기반해 문제를 해결하는 디자인의 중요성**을 명확히 이해하게 되었습니다. 특히 사용자 경험을 개선하기 위한 구조적 사고와 반복적인 개선 과정에 깊이 공감하며 UX/UI 디자인 직무에 대한 확신을 갖게 되었습니다.',
      '이후 해당 분야로의 전향을 결정하고, 사용자 중심의 디자인 사고를 기반으로 툴 학습 및 사이드 프로젝트를 진행하며 실무 역량을 쌓고 있습니다. 현재는 **"보기 좋은 디자인"이 아닌 사용자 문제를 해결하는 설계 중심의 UX/UI 디자이너**를 목표로 지속적으로 성장하고 있습니다.',
    ],
  },
  {
    id: 'philosophy',
    title: '개발 철학',
    showInHome: true,
    content: [
      '미적 완성도를 중요하게 여기지만, 디자인 과정에서는 항상 유니버설 디자인 관점을 우선적으로 검토해 왔습니다. 특정한 시각적 표현보다 **다양한 사용자가 직관적으로 이해하고 접근할 수 있는 경험 설계**를 더 중요하게 생각합니다.',
      '결국 **좋은 디자인은 심미성과 사용성의 균형** 위에서, 누구에게나 일관된 경험을 제공하는 것이라고 믿습니다.',
    ],
  },
  {
    id: 'personal',
    title: '개인적인 이야기',
    showInHome: false,
    content: [
      '특별한 취미를 두기보다는, 비교적 섬세하게 사용 경험을 관찰하는 편입니다. 앱을 사용하면서 **불편한 요소나 비효율적인 흐름이 있으면 자연스럽게 인지**하고, 필요할 경우 개선 방향을 고민하거나 의견을 전달하기도 합니다.',
    ],
  },
]

/* ════════════════════════════════════════
   Context
════════════════════════════════════════ */
const PortfolioContext = createContext(null)

export const PortfolioProvider = ({ children }) => {
  const [skills, setSkills] = useState(DEFAULT_SKILLS)

  const addSkill = useCallback((skill) => {
    setSkills(prev => prev.some(s => s.id === skill.id) ? prev : [...prev, skill])
  }, [])

  const removeSkill = useCallback((id) => {
    setSkills(prev => prev.filter(s => s.id !== id))
  }, [])

  /* 숙련도 내림차순 상위 4개 — 홈 탭 연동용 */
  const topSkills = useMemo(
    () => [...skills].sort((a, b) => b.level - a.level).slice(0, 4),
    [skills]
  )

  const value = useMemo(
    () => ({ skills, sections: DEFAULT_SECTIONS, addSkill, removeSkill, topSkills }),
    [skills, addSkill, removeSkill, topSkills]
  )

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  )
}

export const usePortfolio = () => {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error('usePortfolio는 PortfolioProvider 내부에서 사용해야 합니다')
  return ctx
}
