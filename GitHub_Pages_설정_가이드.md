# GitHub Pages 설정 완벽 가이드

## 🎯 최종 목표
`https://aoperat.github.io/pv/` 에 사이트 배포

---

## ⚠️ 현재 오류 해결 방법

오류: "Get Pages site failed. Please verify that the repository has Pages enabled..."

### 해결 방법 (순서대로 진행)

#### 1단계: GitHub Pages 활성화 (필수!)

1. **GitHub 저장소 페이지로 이동**
   - https://github.com/aoperat/pv

2. **Settings 클릭** (상단 메뉴)

3. **왼쪽 메뉴에서 "Pages" 클릭**

4. **"Source" 섹션에서:**
   - **"GitHub Actions" 선택** (중요!)
   - "Deploy from a branch"가 아니라 **"GitHub Actions"**를 선택해야 합니다
   - Save 클릭

#### 2단계: 워크플로우 파일 확인

워크플로우 파일이 업데이트되었습니다. 커밋하고 푸시하세요:

```bash
git add .github/workflows/deploy.yml
git commit -m "Fix GitHub Pages deployment workflow"
git push origin main
```

#### 3단계: GitHub Secrets 설정 (환경변수)

1. **Settings > Secrets and variables > Actions**

2. **"New repository secret" 클릭**

3. **첫 번째 Secret:**
   - Name: `VITE_SUPABASE_URL`
   - Secret: `.env.local` 파일의 값 복사
   - Add secret

4. **두 번째 Secret:**
   - Name: `VITE_SUPABASE_ANON_KEY`
   - Secret: `.env.local` 파일의 값 복사
   - Add secret

#### 4단계: 워크플로우 실행 확인

1. **Actions 탭 클릭**
   - https://github.com/aoperat/pv/actions

2. **"Deploy to GitHub Pages" 워크플로우 확인**
   - 초록색 체크 표시가 나올 때까지 대기

3. **배포 완료 후:**
   - `https://aoperat.github.io/pv/` 접속

---

## 🔄 두 가지 배포 방법 비교

### 방법 1: GitHub Actions (자동 배포) - 현재 설정

**장점:**
- ✅ 코드 푸시 시 자동 배포
- ✅ 환경변수를 GitHub Secrets로 안전하게 관리
- ✅ 배포 히스토리 확인 가능

**설정:**
- Settings > Pages > Source: **GitHub Actions** 선택
- GitHub Secrets에 환경변수 저장

### 방법 2: gh-pages (수동 배포)

**장점:**
- ✅ 간단하고 빠름
- ✅ 추가 설정 불필요

**설정:**
- Settings > Pages > Source: **Deploy from a branch** 선택
- Branch: `gh-pages` 선택

**사용법:**
```bash
npm run deploy
```

---

## ✅ 체크리스트

GitHub Actions를 사용하려면:

- [ ] Settings > Pages > Source를 **"GitHub Actions"**로 설정
- [ ] GitHub Secrets에 `VITE_SUPABASE_URL` 추가
- [ ] GitHub Secrets에 `VITE_SUPABASE_ANON_KEY` 추가
- [ ] 워크플로우 파일이 커밋되어 있음
- [ ] `git push origin main` 실행
- [ ] Actions 탭에서 배포 상태 확인

---

## 🚀 즉시 배포하기

### GitHub Actions 방법 (현재 설정):

```bash
# 1. 변경사항 커밋 및 푸시
git add .
git commit -m "Fix GitHub Pages deployment"
git push origin main

# 2. GitHub에서 설정:
# - Settings > Pages > Source: "GitHub Actions" 선택
# - Settings > Secrets에 환경변수 추가

# 3. Actions 탭에서 배포 확인
```

### gh-pages 방법 (더 간단):

```bash
# 1. 배포 실행
npm run deploy

# 2. GitHub에서 설정:
# - Settings > Pages > Source: "Deploy from a branch"
# - Branch: gh-pages 선택
# - Save
```

---

## ❓ 어떤 방법을 선택해야 하나요?

**GitHub Actions 방법 사용 시:**
- 코드를 푸시할 때마다 자동으로 배포됨
- 환경변수를 Secrets로 안전하게 관리
- 더 복잡하지만 자동화됨

**gh-pages 방법 사용 시:**
- `npm run deploy` 명령으로 수동 배포
- 더 간단하고 빠름
- 환경변수는 `.env.local`에서 빌드 시 포함됨

현재 워크플로우가 설정되어 있으므로, **GitHub Actions 방법을 권장**합니다!

