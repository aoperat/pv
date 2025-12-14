# GitHub Pages 배포 가이드

## 방법 1: 수동 배포 (gh-pages) - 간단하고 빠름 ⚡

### 1단계: GitHub 저장소 생성 및 연결

```bash
# Git 저장소 초기화 (아직 안했다면)
git init

# GitHub에 저장소를 만들고 연결
git remote add origin https://github.com/your-username/your-repo-name.git

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit"

# main 브랜치에 푸시
git branch -M main
git push -u origin main
```

### 2단계: 패키지 설치

```bash
npm install
```

### 3단계: 배포 실행

```bash
npm run deploy
```

이 명령은:
1. `npm run build` 실행 (환경변수는 `.env.local`에서 읽음)
2. `dist/` 폴더를 `gh-pages` 브랜치에 푸시
3. GitHub Pages가 자동으로 배포

### 4단계: GitHub Pages 설정

1. GitHub 저장소 페이지로 이동
2. Settings > Pages 클릭
3. Source를 `gh-pages` 브랜치로 설정
4. Save 클릭

### 5단계: 접속 확인

- 배포 완료 후 몇 분 후 접속: `https://your-username.github.io/your-repo-name/`

---

## 방법 2: 자동 배포 (GitHub Actions) - 권장 ✅

### 1단계: GitHub Secrets 설정

1. GitHub 저장소 > Settings > Secrets and variables > Actions
2. New repository secret 클릭
3. 다음 두 개의 Secret 추가:

   **Secret 1:**
   - Name: `VITE_SUPABASE_URL`
   - Value: Supabase 프로젝트 URL (`.env.local`에서 복사)

   **Secret 2:**
   - Name: `VITE_SUPABASE_ANON_KEY`
   - Value: Supabase anon key (`.env.local`에서 복사)

### 2단계: 코드 푸시

```bash
# 변경사항 커밋
git add .
git commit -m "Setup for deployment"

# main 브랜치에 푸시
git push origin main
```

### 3단계: 자동 배포 확인

1. GitHub 저장소 > Actions 탭 클릭
2. "Deploy to GitHub Pages" 워크플로우 확인
3. 빌드 완료까지 기다림 (보통 1-2분)

### 4단계: GitHub Pages 활성화

1. Settings > Pages 클릭
2. Source를 `GitHub Actions`로 설정
3. 저장

### 5단계: 접속 확인

- 배포 완료 후: `https://your-username.github.io/your-repo-name/`

---

## 중요 참고사항

### 환경변수 처리

- **로컬 개발**: `.env.local` 파일 사용
- **배포 (방법 1)**: `.env.local`의 값이 빌드 시 포함됨
- **배포 (방법 2)**: GitHub Secrets의 값 사용

### 빌드 확인

로컬에서 빌드 테스트:
```bash
npm run build
npm run preview  # 빌드 결과 미리보기
```

### SPA 라우팅

`public/404.html` 파일이 있어서 GitHub Pages에서 SPA 라우팅이 정상 작동합니다.

### 문제 해결

- 배포 후 페이지가 안 보이면: Settings > Pages에서 Source 확인
- 빌드 실패 시: Actions 탭에서 에러 로그 확인
- 환경변수 에러: GitHub Secrets가 올바르게 설정되었는지 확인

