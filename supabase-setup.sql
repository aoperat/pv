-- 바른골반 앱 - Supabase 테이블 생성 스크립트
-- Supabase 대시보드 > SQL Editor에서 실행하세요

-- 1. 프로필 테이블
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  nickname TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 사용자 루틴 테이블 (저장한 운동)
CREATE TABLE IF NOT EXISTS user_routines (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  exercise_id INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, exercise_id)
);

-- 3. 운동 기록 테이블 (캘린더 완료 기록)
CREATE TABLE IF NOT EXISTS exercise_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  exercise_ids BIGINT[],
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- 4. Row Level Security (RLS) 활성화 및 정책 설정

-- profiles 테이블 RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 기존 정책 삭제 (있는 경우)
DROP POLICY IF EXISTS "사용자는 자신의 프로필을 조회 가능" ON profiles;
DROP POLICY IF EXISTS "사용자는 자신의 프로필을 생성 가능" ON profiles;
DROP POLICY IF EXISTS "사용자는 자신의 프로필을 수정 가능" ON profiles;

CREATE POLICY "사용자는 자신의 프로필을 조회 가능"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "사용자는 자신의 프로필을 생성 가능"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "사용자는 자신의 프로필을 수정 가능"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- user_routines 테이블 RLS
ALTER TABLE user_routines ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "사용자는 자신의 루틴만 조회/생성/삭제 가능" ON user_routines;

CREATE POLICY "사용자는 자신의 루틴만 조회/생성/삭제 가능"
  ON user_routines
  FOR ALL
  USING (auth.uid() = user_id);

-- exercise_logs 테이블 RLS
ALTER TABLE exercise_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "사용자는 자신의 기록만 조회/생성/삭제 가능" ON exercise_logs;

CREATE POLICY "사용자는 자신의 기록만 조회/생성/삭제 가능"
  ON exercise_logs
  FOR ALL
  USING (auth.uid() = user_id);

