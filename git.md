# 🚀 다른 PC에서 프로젝트 시작하기

## 📁 프로젝트 정보
- **프로젝트명**: hplankr-tools
- **설명**: Next.js 기반 다국어 계산기 도구
- **GitHub**: https://github.com/NewSoHeeChoi/hplankr-tools
- **기능**: 나이, BMI, 복리, 환율, 대출, 퍼센트 계산기
- **언어**: 한국어/영어 지원

## 🎯 빠른 시작 가이드

### 1. 저장소 복제
```bash
git clone https://github.com/NewSoHeeChoi/hplankr-tools.git
cd hplankr-tools
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 브라우저에서 확인
- (http://localhost:3000) 접속
- 다국어 계산기 도구 사용 가능

## 🔧 개발 환경 설정

### 필수 요구사항
- **Node.js**: 18.0 이상
- **npm**: 8.0 이상
- **Git**: 최신 버전

### 사용 기술
- **Framework**: Next.js 15.4.5
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Internationalization**: next-intl 4.3.4
- **Linting**: ESLint 9

## 📋 사용 가능한 스크립트

```bash
# 개발 서버 시작 (Turbopack 사용)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 시작
npm run start

# 코드 린팅
npm run lint
```

## 🌐 협업 워크플로우

### 일반적인 작업 흐름
```bash
# 1. 최신 변경사항 가져오기
git pull origin main

# 2. 작업 진행 (코드 수정, 기능 추가 등)

# 3. 변경사항 확인
git status
git diff

# 4. 변경사항 스테이징
git add .

# 5. 커밋 생성
git commit -m "작업 내용 설명"

# 6. 원격 저장소에 푸시
git push origin main
```

### 브랜치 작업 (권장)
```bash
# 새 기능 브랜치 생성
git checkout -b feature/새기능명

# 작업 후 커밋
git add .
git commit -m "새 기능: 기능 설명"

# 원격에 브랜치 푸시
git push -u origin feature/새기능명

# GitHub에서 Pull Request 생성 후 리뷰
# 승인 후 main 브랜치로 병합
```

## 🎨 프로젝트 구조

```
hplankr-tools/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # 다국어 페이지
│   │   │   ├── age/           # 나이 계산기
│   │   │   ├── bmi/           # BMI 계산기
│   │   │   ├── compound/      # 복리 계산기
│   │   │   ├── converter/     # 환율/단위 변환기
│   │   │   ├── loan/          # 대출 계산기
│   │   │   └── percent/       # 퍼센트 계산기
│   │   ├── globals.css        # 전역 스타일
│   │   └── layout.tsx         # 루트 레이아웃
│   ├── components/            # 재사용 컴포넌트
│   │   ├── shared/           # 공통 컴포넌트
│   │   └── LanguageSwitcher.tsx
│   ├── hooks/                # 커스텀 훅
│   ├── i18n/                 # 국제화 설정
│   └── lib/                  # 유틸리티 함수
├── messages/                 # 번역 파일
│   ├── en.json              # 영어
│   └── ko.json              # 한국어
├── public/                  # 정적 파일
└── package.json            # 프로젝트 설정
```

## 🔧 주요 개발 팁

### 1. 새 계산기 추가하기
```bash
# 1. 새 페이지 생성
mkdir src/app/[locale]/새계산기명
touch src/app/[locale]/새계산기명/page.tsx

# 2. 번역 파일 업데이트
# messages/ko.json, messages/en.json에 번역 추가

# 3. 네비게이션 추가 (필요시)
# Header.tsx 또는 관련 컴포넌트 수정
```

### 2. 스타일링
- **Tailwind CSS 사용**: 유틸리티 클래스 활용
- **반응형 디자인**: 모바일 우선 접근법
- **다크 모드**: 시스템 설정 따름

### 3. 번역 추가
```typescript
// 컴포넌트에서 번역 사용
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('MyComponent');
  
  return <h1>{t('title')}</h1>;
}
```

## 🚨 문제 해결

### 일반적인 문제들

#### 1. npm install 실패
```bash
# 캐시 정리 후 재시도
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### 2. Git 충돌 해결
```bash
# 충돌 발생 시
git status                    # 충돌 파일 확인
# 수동으로 충돌 해결 후
git add .
git commit -m "충돌 해결"
```

#### 3. 포트 충돌
```bash
# 다른 포트로 실행
npm run dev -- -p 3001
```

## 📞 지원

### 문제 발생 시
1. **에러 메시지 확인**: 콘솔 출력 검토
2. **GitHub Issues**: 버그 리포트 작성
3. **개발자 도구**: 브라우저 DevTools 활용
4. **로그 확인**: 서버 및 클라이언트 로그 검토

### 유용한 링크
- [Next.js 문서](https://nextjs.org/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [next-intl 문서](https://next-intl.dev/)
- [TypeScript 문서](https://www.typescriptlang.org/docs/)

---

**📝 마지막 업데이트**: 2025-08-01  
**👨‍💻 생성**: Claude Code SuperClaude 시스템  
**🤖 Generated with [Claude Code](https://claude.ai/code)**