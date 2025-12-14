# 바른골반 (BareunPelvic) - 골반 건강 관리 앱

Supabase + React + GitHub Pages로 구축된 골반 건강 관리 웹 애플리케이션입니다.

## 주요 기능

- ✅ 사용자 인증 (회원가입/로그인)
- ✅ 운동 루틴 저장 및 관리
- ✅ 운동 완료 달력
- ✅ 자가 진단 기능
- ✅ 바디 맵 기반 운동 필터링
- ✅ 운동 타이머

## 기술 스택

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Supabase (Auth + Database)
- **배포**: GitHub Pages
- **아이콘**: Lucide React

## 시작하기

### 1. 필수 요구사항

- Node.js 18+ 
- npm 또는 yarn
- Supabase 계정

### 2. Supabase 프로젝트 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. SQL Editor에서 테이블 생성:
   - 프로젝트 루트의 `supabase-setup.sql` 파일 내용을 복사하여 실행
   - 또는 아래 SQL 코드를 직접 실행

```sql
-- 프로필 테이블
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  nickname TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 사용자 루틴 테이블
CREATE TABLE user_routines (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  exercise_id INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, exercise_id)
);

-- 운동 기록 테이블
CREATE TABLE exercise_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  exercise_ids BIGINT[],
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);
```

3. Row Level Security (RLS) 정책 설정:

```sql
-- profiles 테이블
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "사용자는 자신의 프로필을 조회 가능"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "사용자는 자신의 프로필을 생성 가능"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "사용자는 자신의 프로필을 수정 가능"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- user_routines 테이블
ALTER TABLE user_routines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "사용자는 자신의 루틴만 조회/생성/삭제 가능"
  ON user_routines
  FOR ALL
  USING (auth.uid() = user_id);

-- exercise_logs 테이블
ALTER TABLE exercise_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "사용자는 자신의 기록만 조회/생성/삭제 가능"
  ON exercise_logs
  FOR ALL
  USING (auth.uid() = user_id);
```

### 3. 프로젝트 설치

```bash
# 의존성 설치
npm install

# .env 파일 생성 (루트 디렉토리에)
# .env.example을 참고하여 Supabase URL과 Anon Key 입력
cp .env.example .env

# .env 파일 편집
# VITE_SUPABASE_URL=your_supabase_project_url
# VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 5. 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `dist/` 폴더에 생성됩니다.

## GitHub Pages 배포

### 방법 1: gh-pages 브랜치 사용

1. `package.json`에 배포 스크립트 추가 (선택사항):

```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  },
  "devDependencies": {
    "gh-pages": "^6.0.0"
  }
}
```

2. GitHub 저장소 설정:
   - Settings > Pages > Source: `gh-pages` 브랜치 선택

3. 배포:
```bash
npm run deploy
```

### 방법 2: GitHub Actions 사용

`.github/workflows/deploy.yml` 파일 생성:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

GitHub 저장소 Settings > Secrets에 다음 추가:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 프로젝트 구조

```
bareun-pelvic-app/
├── public/
│   └── 404.html          # GitHub Pages SPA 라우팅용
├── src/
│   ├── components/
│   │   ├── Auth.jsx      # 로그인/회원가입 컴포넌트
│   │   └── BareunPelvicApp.jsx  # 메인 앱 컴포넌트 (바른골반)
│   ├── hooks/
│   │   └── useSupabaseData.js   # Supabase 데이터 훅
│   ├── App.jsx           # 앱 진입점
│   ├── main.jsx          # React 초기화
│   ├── supabaseClient.js # Supabase 클라이언트 설정
│   └── index.css         # 전역 스타일
├── .env.example          # 환경 변수 예시
├── package.json
└── vite.config.js
```

## 주의사항

- GitHub Pages는 정적 호스팅이므로 SPA 라우팅을 위해 `404.html` 파일이 필요합니다.
- Supabase RLS 정책을 올바르게 설정하지 않으면 데이터 접근 오류가 발생할 수 있습니다.
- 환경 변수는 빌드 시점에 포함되므로 GitHub Secrets에 저장해야 합니다.

## 라이선스

MIT

