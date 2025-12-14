import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../supabaseClient'

// 저장한 운동 목록 관리
export const useSavedRoutines = (userId) => {
  const [savedItems, setSavedItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const loadSavedRoutines = useCallback(async () => {
    if (!userId) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { data, error: fetchError } = await supabase
        .from('user_routines')
        .select('exercise_id')
        .eq('user_id', userId)

      if (fetchError) {
        if (fetchError.code === 'PGRST205') {
          console.warn(
            '⚠️ user_routines 테이블이 없습니다.\n' +
            'Supabase 대시보드 > SQL Editor에서 supabase-setup.sql 파일의 내용을 실행하세요.'
          )
          return
        }
        throw fetchError
      }

      setSavedItems(data?.map((item) => item.exercise_id) || [])
    } catch (err) {
      console.error('Error loading saved routines:', err)
      setError(err.message || '저장된 루틴을 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    loadSavedRoutines()
  }, [loadSavedRoutines])

  const toggleSave = async (exerciseId) => {
    if (!userId || saving) return

    const isSaved = savedItems.includes(exerciseId)
    const previousItems = [...savedItems]

    // 낙관적 업데이트
    setSaving(true)
    setError(null)

    if (isSaved) {
      setSavedItems(savedItems.filter((id) => id !== exerciseId))
    } else {
      setSavedItems([...savedItems, exerciseId])
    }

    try {
      if (isSaved) {
        const { error: deleteError } = await supabase
          .from('user_routines')
          .delete()
          .eq('user_id', userId)
          .eq('exercise_id', exerciseId)

        if (deleteError) throw deleteError
      } else {
        const { error: insertError } = await supabase.from('user_routines').insert([
          {
            user_id: userId,
            exercise_id: exerciseId,
            created_at: new Date().toISOString(),
          },
        ])

        if (insertError) throw insertError
      }
    } catch (err) {
      // 롤백
      setSavedItems(previousItems)

      if (err.code === 'PGRST205') {
        setError('테이블이 설정되지 않았습니다. 관리자에게 문의하세요.')
        console.error(
          '⚠️ user_routines 테이블이 없습니다.\n' +
          'Supabase 대시보드 > SQL Editor에서 supabase-setup.sql 파일의 내용을 실행해주세요.'
        )
      } else {
        setError(err.message || '저장 중 오류가 발생했습니다.')
        console.error('Error toggling save:', err)
      }
    } finally {
      setSaving(false)
    }
  }

  return {
    savedItems,
    loading,
    saving,
    error,
    toggleSave,
    refetch: loadSavedRoutines,
    clearError: () => setError(null)
  }
}

// 완료한 날짜 관리
export const useCompletedDates = (userId) => {
  const [completedDates, setCompletedDates] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const loadCompletedDates = useCallback(async () => {
    if (!userId) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { data, error: fetchError } = await supabase
        .from('exercise_logs')
        .select('date')
        .eq('user_id', userId)
        .eq('completed', true)

      if (fetchError) {
        if (fetchError.code === 'PGRST205') {
          console.warn(
            '⚠️ exercise_logs 테이블이 없습니다.\n' +
            'Supabase 대시보드 > SQL Editor에서 supabase-setup.sql 파일의 내용을 실행하세요.'
          )
          return
        }
        throw fetchError
      }

      setCompletedDates(data?.map((item) => item.date) || [])
    } catch (err) {
      console.error('Error loading completed dates:', err)
      setError(err.message || '완료 기록을 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    loadCompletedDates()
  }, [loadCompletedDates])

  const toggleCompleteToday = async () => {
    if (!userId || saving) return

    const today = new Date().toISOString().split('T')[0]
    const isCompleted = completedDates.includes(today)
    const previousDates = [...completedDates]

    // 낙관적 업데이트
    setSaving(true)
    setError(null)

    if (isCompleted) {
      setCompletedDates(completedDates.filter((date) => date !== today))
    } else {
      setCompletedDates([...completedDates, today])
    }

    try {
      if (isCompleted) {
        const { error: deleteError } = await supabase
          .from('exercise_logs')
          .delete()
          .eq('user_id', userId)
          .eq('date', today)

        if (deleteError) throw deleteError
      } else {
        const { error: insertError } = await supabase.from('exercise_logs').insert([
          {
            user_id: userId,
            date: today,
            completed: true,
            exercise_ids: [],
            created_at: new Date().toISOString(),
          },
        ])

        if (insertError) throw insertError
      }
    } catch (err) {
      // 롤백
      setCompletedDates(previousDates)

      if (err.code === 'PGRST205') {
        setError('테이블이 설정되지 않았습니다. 관리자에게 문의하세요.')
        console.error(
          '⚠️ exercise_logs 테이블이 없습니다.\n' +
          'Supabase 대시보드 > SQL Editor에서 supabase-setup.sql 파일의 내용을 실행해주세요.'
        )
      } else {
        setError(err.message || '완료 체크 중 오류가 발생했습니다.')
        console.error('Error toggling complete:', err)
      }
    } finally {
      setSaving(false)
    }
  }

  return {
    completedDates,
    loading,
    saving,
    error,
    toggleCompleteToday,
    refetch: loadCompletedDates,
    clearError: () => setError(null)
  }
}
