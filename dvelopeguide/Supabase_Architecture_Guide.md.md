GitHub Pages + Supabase 아키텍처 가이드

1. 작동 원리 (Architecture)

기존에는 "클라이언트(React) ↔️ 백엔드 서버(API) ↔️ 데이터베이스" 구조가 필요했지만, Supabase를 사용하면 백엔드 서버 없이 클라이언트가 데이터베이스와 직접 소통합니다.

GitHub Pages: 리액트 앱(HTML/CSS/JS) 파일만 사용자 브라우저로 전송합니다.

Supabase Client: 브라우저에서 실행되는 JS가 Supabase의 인증 및 데이터베이스 API를 직접 호출합니다.

보안(RLS): "백엔드가 없으면 DB가 위험하지 않나요?" -> Supabase의 Row Level Security(RLS) 기능을 통해, "작성자 본인만 수정 가능", "로그인한 사람만 글쓰기 가능" 등의 규칙을 DB 수준에서 강제할 수 있어 안전합니다.

2. 구현 가능한 기능 범위

질문하신 모든 기능이 구현 가능합니다.

회원가입 / 로그인:

Supabase Auth를 사용합니다.

이메일/비밀번호 로그인은 물론 구글, 카카오톡 소셜 로그인도 설정만 하면 바로 연동됩니다.

로그인 세션 관리(새로고침 해도 로그인 유지)를 SDK가 알아서 처리해줍니다.

본인 기록 저장 (나만의 루틴, 캘린더):

현재 localStorage에 저장하던 데이터를 Supabase DB의 테이블(user_routines, logs 등)로 옮깁니다.

테이블에 user_id 컬럼을 만들고, 조회할 때 select * from logs where user_id = current_user 형태로 쿼리하면, 어느 기기에서 접속하든 내 기록을 불러올 수 있습니다.

커뮤니티 (게시판):

posts, comments 테이블을 만듭니다.

조회: 누구나 가능하게 설정 (Public)

작성/수정/삭제: 로그인한 유저만, 그리고 본인이 쓴 글만 가능하게 RLS 설정.

실시간 기능: Supabase의 Realtime 기능을 켜면, 누가 댓글을 달았을 때 새로고침 없이 바로 화면에 뜨게 할 수도 있습니다.

3. 데이터베이스 설계 예시 (Schema Suggestion)

Supabase 대시보드에서 Table을 생성할 때 참고하세요.

A. 사용자 프로필 (profiles)

Supabase는 기본적으로 auth.users에 로그인 정보를 관리하지만, 닉네임이나 프로필 사진을 저장하려면 별도 테이블이 필요합니다.

id (uuid, auth.users의 id와 연결)

nickname (text)

avatar_url (text)

created_at (timestamp)

B. 운동 기록 (exercise_logs)

캘린더와 루틴 기록용

id (int8)

user_id (uuid, 작성자 식별)

date (date, 운동 날짜 '2024-05-20')

exercise_ids (int8[], 수행한 운동 ID 배열)

completed (boolean)

C. 커뮤니티 게시글 (posts)

id (int8)

user_id (uuid)

title (text)

content (text)

category (text, '질문', '후기' 등)

created_at (timestamp)

4. GitHub Pages 배포 시 주의사항 (SPA Routing)

GitHub Pages는 정적 호스팅이라 SPA(Single Page Application)의 라우팅을 이해하지 못합니다. 예를 들어 user.github.io/community로 직접 접속하면 404 에러가 뜰 수 있습니다.

해결 방법:

HashRouter 사용: URL에 #이 들어갑니다. (예: user.github.io/#/community). 설정이 가장 쉽고 에러가 없습니다.

404.html 트릭: 404 에러 발생 시 index.html로 리다이렉트 시키는 스크립트를 넣어서 BrowserRouter를 사용할 수 있게 하는 방법입니다.

5. 시작하는 순서 (Roadmap)

Supabase 프로젝트 생성: supabase.com 가입 및 프로젝트 생성.

패키지 설치: 리액트 프로젝트에서 npm install @supabase/supabase-js 설치.

환경변수 설정: .env 파일에 Supabase URL과 Anon Key 저장.

Supabase Client 생성: 리액트 앱 내에 supabaseClient.js 파일을 만들어 연결.

기능 이식:

localStorage 로직을 -> supabase.from('table').select() / .insert() 로 변경.

로그인 페이지 UI 구현.

배포: GitHub Pages 배포.