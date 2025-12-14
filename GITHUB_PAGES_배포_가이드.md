# GitHub Pages 배포 가이드 - aoperat/pv

## 🎯 최종 배포 주소
배포 완료 후: `https://aoperat.github.io/pv/`

---

## 방법 1: GitHub Actions 자동 배포 (권장 ✅)

### 1단계: GitHub Secrets 설정

1. **GitHub 저장소 페이지로 이동**
   - https://github.com/aoperat/pv

2. **Settings 클릭** (저장소 상단 메뉴)

3. **왼쪽 메뉴에서 "Secrets and variables" > "Actions" 클릭**

4. **"New repository secret" 버튼 클릭**

5. **첫 번째 Secret 추가:**
   - Name: `VITE_SUPABASE_URL`
   - Secret: `.env.local` 파일의 `VITE_SUPABASE_URL` 값 복사
   - "Add secret" 클릭

6. **두 번째 Secret 추가:**
   - "New repository secret" 다시 클릭
   - Name: `VITE_SUPABASE_ANON_KEY`
   - Secret: `.env.local` 파일의 `VITE_SUPABASE_ANON_KEY` 값 복사
   - "Add secret" 클릭

### 2단계: GitHub Pages 활성화

1. **Settings > Pages** 클릭

2. **"Source" 섹션에서:**
   - "Deploy from a branch" 대신 **"GitHub Actions"** 선택
   - 저장 (이미 Actions로 설정되어 있을 수 있음)

### 3단계: 코드 푸시 및 배포

터미널에서 실행:

```bash
# 변경사항 추가
git add .

# 커밋
git commit -m "Setup GitHub Pages deployment"

# main 브랜치에 푸시
git push origin main
```

### 4단계: 배포 확인

1. **GitHub 저장소 페이지로 이동**
   - https://github.com/aoperat/pv

2. **"Actions" 탭 클릭**
   - "Deploy to GitHub Pages" 워크플로우가 실행 중인지 확인
   - 초록색 체크 표시가 나올 때까지 대기 (1-2분)

3. **배포 완료 후 접속:**
   - `https://aoperat.github.io/pv/`
   - 몇 분 더 걸릴 수 있음

---

## 방법 2: 수동 배포 (gh-pages)

더 빠르고 간단한 방법입니다.

### 1단계: 패키지 설치 (이미 했다면 스킵)

```bash
npm install
```

### 2단계: 배포 실행

```bash
npm run deploy
```

이 명령은:
- `npm run build` 실행 (`.env.local`의 환경변수 사용)
- `dist/` 폴더를 `gh-pages` 브랜치에 자동 푸시

### 3단계: GitHub Pages 설정

1. **https://github.com/aoperat/pv/settings/pages** 접속

2. **"Source" 섹션:**
   - "Deploy from a branch" 선택
   - Branch: `gh-pages` 선택
   - Folder: `/ (root)` 선택
   - "Save" 클릭

### 4단계: 배포 확인

- 몇 분 후 `https://aoperat.github.io/pv/` 접속

---

## 🔍 배포 상태 확인 방법

### GitHub Actions 방법:
1. 저장소 > Actions 탭
2. 최근 워크플로우 실행 상태 확인
3. 초록색 체크 = 성공, 빨간색 X = 실패

### 수동 배포 방법:
1. 저장소 > Settings > Pages
2. "Your site is live at..." 메시지 확인
3. 또는 저장소 오른쪽 사이드바에 "Environments" 섹션 확인

---

## ⚠️ 문제 해결

### 배포가 안 될 때:

1. **GitHub Secrets 확인:**
   - Settings > Secrets and variables > Actions
   - `VITE_SUPABASE_URL`과 `VITE_SUPABASE_ANON_KEY`가 있는지 확인

2. **Actions 로그 확인:**
   - Actions 탭 > 실패한 워크플로우 클릭 > 에러 메시지 확인

3. **Pages 설정 확인:**
   - Settings > Pages
   - Source가 올바르게 설정되었는지 확인

4. **브라우저 캐시:**
   - Ctrl + Shift + R (강력 새로고침)
   - 또는 시크릿 모드에서 접속

### 빌드 에러가 날 때:

로컬에서 먼저 테스트:
```bash
npm run build
npm run preview
```

---

## 📝 참고사항

- **첫 배포**: 5-10분 정도 소요될 수 있습니다
- **이후 업데이트**: 코드 푸시 후 1-2분 소요
- **도메인**: `https://aoperat.github.io/pv/` (소문자만 사용)
- **환경변수**: GitHub Secrets에 저장되므로 코드에 노출되지 않음

