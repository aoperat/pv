# Supabase 리다이렉트 URL 설정 가이드

## 🚨 문제 상황

사용자가 이메일 인증 링크를 클릭하면 로컬호스트(`http://localhost:5173`)로 리다이렉트되는 문제가 발생했습니다.

---

## ✅ 해결 방법

### 1단계: 코드 수정 (완료)

`src/components/Auth.jsx` 파일에서 `emailRedirectTo` 옵션을 추가하여 현재 URL을 자동으로 감지하도록 수정했습니다.

```javascript
const redirectTo = window.location.origin + window.location.pathname

await supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: redirectTo,  // 현재 사이트 URL로 리다이렉트
    // ...
  },
})
```

이제 로컬 개발 시에는 `http://localhost:5173`로, 배포 사이트에서는 `https://aoperat.github.io/pv/`로 자동 리다이렉트됩니다.

### 2단계: Supabase 대시보드 설정 (필수!)

Supabase 프로젝트 대시보드에서도 리다이렉트 URL을 허용해야 합니다.

#### 설정 방법:

1. **Supabase 프로젝트 대시보드 접속**
   - https://supabase.com/dashboard
   - 프로젝트 선택

2. **Authentication > URL Configuration** 메뉴로 이동**
   - 왼쪽 메뉴: Authentication
   - 하위 메뉴: URL Configuration

3. **Site URL 설정**
   - **Site URL**: `https://aoperat.github.io/pv`
     - 기본값 (개발용)

4. **Redirect URLs 추가**
   - **Redirect URLs** 섹션에 다음 URL들을 추가:
     ```
     http://localhost:5173/*
     https://aoperat.github.io/pv/*
     https://aoperat.github.io/pv
     ```
   
   **중요:**
   - `/*`는 와일드카드로, 해당 경로의 모든 하위 경로를 허용합니다
   - 각 URL을 한 줄에 하나씩 입력
   - "Add URL" 버튼 클릭하여 추가

5. **Save** 클릭

---

## 📋 설정 확인 체크리스트

- [ ] `src/components/Auth.jsx`에 `emailRedirectTo` 옵션이 추가됨
- [ ] Supabase 대시보드 > Authentication > URL Configuration 접속
- [ ] Site URL이 `https://aoperat.github.io/pv`로 설정됨
- [ ] Redirect URLs에 `http://localhost:5173/*` 추가됨
- [ ] Redirect URLs에 `https://aoperat.github.io/pv/*` 추가됨
- [ ] Save 클릭 완료
- [ ] 코드 변경사항 커밋 및 배포

---

## 🔄 배포하기

코드 수정 후 배포:

```bash
# 변경사항 커밋
git add src/components/Auth.jsx
git commit -m "Fix email redirect URL to use current site URL"

# 배포 (GitHub Actions 사용 시)
git push origin main

# 또는 수동 배포 (gh-pages 사용 시)
npm run deploy
```

---

## 🧪 테스트 방법

### 1. 로컬 테스트

```bash
npm run dev
```

1. 회원가입 진행
2. 이메일 확인 링크 클릭
3. `http://localhost:5173`로 리다이렉트되는지 확인

### 2. 프로덕션 테스트

1. 배포 완료 후 `https://aoperat.github.io/pv/` 접속
2. 회원가입 진행
3. 이메일 확인 링크 클릭
4. `https://aoperat.github.io/pv/`로 리다이렉트되는지 확인

---

## ⚠️ 주의사항

1. **Supabase 대시보드 설정은 반드시 필요합니다**
   - 코드만 수정해서는 부족합니다
   - Supabase가 허용된 URL로만 리다이렉트를 허용하기 때문입니다

2. **와일드카드 사용**
   - `/*`는 모든 하위 경로를 허용합니다
   - 예: `https://aoperat.github.io/pv/*`는 `/`, `/diagnosis`, `/my-routine` 등 모두 허용

3. **보안**
   - 허용된 URL만 추가하세요
   - 공개된 URL만 추가하는 것이 안전합니다

---

## 🔍 문제 해결

### 여전히 로컬호스트로 리다이렉트되는 경우:

1. **Supabase 대시보드 설정 확인**
   - Redirect URLs에 프로덕션 URL이 추가되었는지 확인

2. **브라우저 캐시 삭제**
   - Ctrl + Shift + R (강력 새로고침)
   - 또는 시크릿 모드에서 테스트

3. **코드 확인**
   - `emailRedirectTo` 옵션이 올바르게 설정되었는지 확인

4. **배포 확인**
   - 최신 코드가 배포되었는지 확인

---

## 📝 참고 자료

- [Supabase Auth - Email Redirect URLs](https://supabase.com/docs/guides/auth/auth-redirects)
- [Supabase Auth - Configuration](https://supabase.com/docs/guides/auth/auth-deep-dive/auth-deep-dive-jwts)

