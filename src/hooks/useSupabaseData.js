import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

// 저장한 운동 목록 관리
export const useSavedRoutines = (userId) => {
  const [savedItems, setSavedItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    loadSavedRoutines()
  }, [userId])

  const loadSavedRoutines = async () => {
    try {
      const { data, error } = await supabase
        .from('user_routines')
        .select('exercise_id')
        .eq('user_id', userId)

      if (error) {
        // PGRST205는 테이블이 없을 때 발생하는 에러
        if (error.code === 'PGRST205') {
          console.warn(
            '⚠️ user_routines 테이블이 없습니다.\n' +
            'Supabase 대시보드 > SQL Editor에서 supabase-setup.sql 파일의 내용을 실행하세요.'
          )
          return // 에러를 던지지 않고 빈 배열 반환
        }
        throw error
      }

      setSavedItems(data?.map((item) => item.exercise_id) || [])
    } catch (error) {
      console.error('Error loading saved routines:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleSave = async (exerciseId) => {
    if (!userId) return

    const isSaved = savedItems.includes(exerciseId)

    try {
      if (isSaved) {
        // 삭제
        const { error } = await supabase
          .from('user_routines')
          .delete()
          .eq('user_id', userId)
          .eq('exercise_id', exerciseId)

        if (error) throw error
        setSavedItems(savedItems.filter((id) => id !== exerciseId))
      } else {
        // 추가
        const { error } = await supabase.from('user_routines').insert([
          {
            user_id: userId,
            exercise_id: exerciseId,
            created_at: new Date().toISOString(),
          },
        ])

        if (error) throw error
        setSavedItems([...savedItems, exerciseId])
      }
    } catch (error) {
      // PGRST205는 테이블이 없을 때 발생하는 에러
      if (error.code === 'PGRST205') {
        alert(
          '⚠️ user_routines 테이블이 없습니다.\n\n' +
          'Supabase 대시보드 > SQL Editor에서 supabase-setup.sql 파일의 내용을 실행해주세요.'
        )
      } else {
        console.error('Error toggling save:', error)
        alert('운동 저장 중 오류가 발생했습니다: ' + error.message)
      }
    }
  }

  return { savedItems, loading, toggleSave, refetch: loadSavedRoutines }
}

// 완료한 날짜 관리
export const useCompletedDates = (userId) => {
  const [completedDates, setCompletedDates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    loadCompletedDates()
  }, [userId])

  const loadCompletedDates = async () => {
    try {
      const { data, error } = await supabase
        .from('exercise_logs')
        .select('date')
        .eq('user_id', userId)
        .eq('completed', true)

      if (error) {
        // PGRST205는 테이블이 없을 때 발생하는 에러
        if (error.code === 'PGRST205') {
          console.warn(
            '⚠️ exercise_logs 테이블이 없습니다.\n' +
            'Supabase 대시보드 > SQL Editor에서 supabase-setup.sql 파일의 내용을 실행하세요.'
          )
          return // 에러를 던지지 않고 빈 배열 반환
        }
        throw error
      }

      const dates = data?.map((item) => item.date) || []
      setCompletedDates(dates)
    } catch (error) {
      console.error('Error loading completed dates:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleCompleteToday = async () => {
    if (!userId) return

    const today = new Date().toISOString().split('T')[0]
    const isCompleted = completedDates.includes(today)

    try {
      if (isCompleted) {
        // 삭제
        const { error } = await supabase
          .from('exercise_logs')
          .delete()
          .eq('user_id', userId)
          .eq('date', today)

        if (error) throw error
        setCompletedDates(completedDates.filter((date) => date !== today))
      } else {
        // 추가
        const { error } = await supabase.from('exercise_logs').insert([
          {
            user_id: userId,
            date: today,
            completed: true,
            exercise_ids: [],
            created_at: new Date().toISOString(),
          },
        ])

        if (error) throw error
        setCompletedDates([...completedDates, today])
      }
    } catch (error) {
      // PGRST205는 테이블이 없을 때 발생하는 에러
      if (error.code === 'PGRST205') {
        alert(
          '⚠️ exercise_logs 테이블이 없습니다.\n\n' +
          'Supabase 대시보드 > SQL Editor에서 supabase-setup.sql 파일의 내용을 실행해주세요.'
        )
      } else {
        console.error('Error toggling complete:', error)
        alert('운동 완료 체크 중 오류가 발생했습니다: ' + error.message)
      }
    }
  }

  return {
    completedDates,
    loading,
    toggleCompleteToday,
    refetch: loadCompletedDates,
  }
}

