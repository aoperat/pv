import { createClient } from '@supabase/supabase-js'

// 디버깅: 환경변수 확인
if (import.meta.env.DEV) {
  console.log('🔍 환경변수 확인:', {
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL ? '✅ 설정됨' : '❌ 없음',
    VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ 설정됨' : '❌ 없음',
    mode: import.meta.env.MODE,
  })
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 개발 환경에서 환경변수가 없을 때 경고만 표시 (에러 대신)
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '⚠️ Supabase 환경변수가 설정되지 않았습니다.\n' +
    '프로젝트 루트에 .env 또는 .env.local 파일을 생성하고 다음을 추가하세요:\n\n' +
    'VITE_SUPABASE_URL=your_supabase_project_url\n' +
    'VITE_SUPABASE_ANON_KEY=your_supabase_anon_key\n\n' +
    '⚠️ 중요: .env 파일을 수정한 후 개발 서버를 재시작해야 합니다!\n' +
    'Supabase 프로젝트는 https://supabase.com 에서 생성할 수 있습니다.'
  )
  
  // 개발 중에는 더미 클라이언트 생성 (에러 방지)
  // 실제 Supabase URL과 Key가 필요합니다
  if (import.meta.env.DEV) {
    console.warn('개발 모드: 더미 Supabase 클라이언트를 사용합니다.')
  }
}

// 환경변수가 없어도 클라이언트는 생성 (실제 사용 시 에러 발생)
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

