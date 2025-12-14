# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PelvicCare is a Korean pelvic health management web application built with React + Vite + Supabase, deployed to GitHub Pages. It provides exercise routines, self-diagnosis, and progress tracking for pelvic health.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Production build (outputs to dist/)
npm run preview      # Preview production build
```

## Architecture

### Frontend Structure
- **Entry Point**: `src/main.jsx` -> `src/App.jsx`
- **Auth Flow**: `App.jsx` manages auth state via Supabase, shows `Auth.jsx` when logged out, `PelvicHealthApp.jsx` when authenticated
- **Main Component**: `PelvicHealthApp.jsx` (1200+ lines) contains the entire app UI including:
  - Views: Home (exercise list + body map filter), Diagnosis (multi-step quiz), My Routine (saved exercises + calendar)
  - Inline components: HabitCalendar, BodyMap (SVG), ExerciseTimer
  - Exercise data defined as static arrays within the component

### Supabase Integration
- **Client**: `src/supabaseClient.js` - Creates Supabase client from env vars
- **Data Hooks**: `src/hooks/useSupabaseData.js` - Contains:
  - `useSavedRoutines(userId)` - CRUD for user_routines table
  - `useCompletedDates(userId)` - CRUD for exercise_logs table

### Database Tables (Supabase)
- `profiles` - User profiles (id, nickname, avatar_url)
- `user_routines` - Saved exercises (user_id, exercise_id)
- `exercise_logs` - Daily completion tracking (user_id, date, exercise_ids, completed)

All tables use Row Level Security (RLS) policies restricting access to authenticated user's own data.

### Environment Variables
Required in `.env` (see `env.example.txt`):
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Tech Stack
- React 18 with Vite 5
- Tailwind CSS for styling
- Lucide React for icons
- @supabase/supabase-js for backend

## Deployment Notes
- Uses `base: './'` in vite.config.js for GitHub Pages relative paths
- `public/404.html` handles SPA routing on GitHub Pages
- Build env vars must be set in GitHub Secrets for CI/CD
