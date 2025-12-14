# Supabase 로컬호스트 3000 리다이렉트 문제 해결 가이드

## 🚨 문제 상황

배포된 페이지(`https://aoperat.github.io/pv/`)에서 회원가입 후 이메일 인증 링크를 클릭하면 `http://localhost:3000`으로 리다이렉트되는 문제가 발생했습니다.

---

## ✅ 해결 방법

### 1단계: 코드 수정 (완료)

`src/components/Auth.jsx` 파일을 수정하여 프로덕션 환경에서는 명시적으로 프로덕션 URL을 사용하도록 했습니다.

```javascript
// 프로덕션 환경에서는 명시적으로 프로덕션 URL 사용
const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
const redirectTo = isProduction 
  ? 'https://aoperat.github.io/pv/'
  : window.location.origin + window.location.pathname
```

이제:
- **로컬 개발**: `http://localhost:5173` (또는 실행 중인 포트)
- **프로덕션**: `https://aoperat.github.io/pv/` (고정)

### 2단계: Supabase 대시보드 설정 (중요!)

Supabase 대시보드에서 Site URL을 프로덕션 URL로 설정해야 합니다.

#### 설정 방법:

1. **Supabase 프로젝트 대시보드 접속**
   - https://supabase.com/dashboard
   - 프로젝트 선택

2. **Authentication > URL Configuration** 메뉴로 이동**
   - 왼쪽 메뉴: Authentication
   - 하위 메뉴: URL Configuration

3. **Site URL 변경**
   - **Site URL**: `https://aoperat.github.io/pv`
     - ⚠️ **반드시 프로덕션 URL로 변경**
     - 기본값이나 localhost:3000이 아닌 프로덕션 URL로 설정

4. **Redirect URLs 확인 및 추가**
   - **Redirect URLs** 섹션에 다음 URL들이 있는지 확인:
     ```
     http://localhost:5173/*
     https://aoperat.github.io/pv/*
     https://aoperat.github.io/pv
     ```
   
   - `http://localhost:3000/*` 같은 잘못된 URL이 있다면 제거
   - 필요한 URL만 남기기

5. **Save** 클릭

### 3단계: 재배포

코드 변경 후 반드시 재배포해야 합니다.

```bash
git add src/components/Auth.jsx
git commit -m "Fix email redirect to use production URL in production environment"
git push origin main
```

---

## 🔍 문제 원인

이 문제가 발생한 주요 원인:

1. **Supabase Site URL 설정**
   - Supabase 대시보드의 Site URL이 `http://localhost:3000`으로 설정되어 있었을 가능성
   - 또는 이전에 다른 프로젝트에서 사용한 설정이 남아있음

2. **이전 회원가입 시점의 설정**
   - 이전에 회원가입할 때 사용한 리다이렉트 URL이 이메일 링크에 포함되어 있음
   - 새로운 회원가입부터는 수정된 코드가 적용됨

---

## 📋 확인 체크리스트

- [ ] 코드에서 프로덕션 URL을 명시적으로 사용하도록 수정됨
- [ ] Supabase 대시보드 > Authentication > URL Configuration 접속
- [ ] **Site URL이 `https://aoperat.github.io/pv`로 설정됨** (가장 중요!)
- [ ] Redirect URLs에 `https://aoperat.github.io/pv/*` 추가됨
- [ ] `http://localhost:3000/*` 같은 잘못된 URL 제거됨
- [ ] Save 클릭 완료
- [ ] 코드 변경사항 커밋 및 배포 완료

---

## 🧪 테스트 방법

### 새로 회원가입 테스트

1. **배포 사이트 접속**
   - https://aoperat.github.io/pv/

2. **새로운 이메일로 회원가입**
   - 이전에 사용한 이메일이 아닌 새로운 이메일 사용
   - 기존 이메일은 이미 이전 설정이 포함된 링크일 수 있음

3. **이메일 확인 링크 클릭**
   - 이메일에서 확인 링크 클릭
   - `https://aoperat.github.io/pv/`로 리다이렉트되는지 확인

### 기존 사용자 테스트

기존에 회원가입한 사용자의 경우:
- 이메일 링크가 이미 `localhost:3000`을 포함하고 있을 수 있음
- 새로운 회원가입부터는 수정된 코드가 적용됨
- 또는 Supabase 대시보드에서 Site URL만 수정해도 일부 해결될 수 있음

---

## ⚠️ 중요 사항

1. **Site URL 설정이 가장 중요합니다**
   - 코드만 수정해서는 부족할 수 있습니다
   - Supabase 대시보드의 Site URL이 프로덕션 URL로 설정되어 있어야 합니다

2. **기존 이메일 링크**
   - 이미 발송된 이메일 링크는 변경할 수 없습니다
   - 새로운 회원가입부터 수정된 설정이 적용됩니다

3. **테스트용 이메일**
   - 테스트 시 새로운 이메일 주소를 사용하는 것을 권장합니다
   - 기존 이메일로 테스트하면 이전 설정이 포함된 링크일 수 있습니다

---

## 🔧 추가 디버깅

코드에 디버깅 로그가 추가되어 있습니다. 브라우저 콘솔에서 확인할 수 있습니다:

```
📧 이메일 리다이렉트 URL: https://aoperat.github.io/pv/
```

이 로그를 통해 실제로 어떤 URL이 사용되는지 확인할 수 있습니다.

---

## 📝 참고

- Supabase Auth는 Site URL을 기본값으로 사용합니다
- `emailRedirectTo` 옵션으로 명시적으로 지정할 수 있습니다
- 하지만 Supabase 대시보드의 Redirect URLs에 허용된 URL만 사용 가능합니다
- 따라서 두 설정 모두 올바르게 되어 있어야 합니다

