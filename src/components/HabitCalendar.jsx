import React, { useState } from 'react'
import { Calendar as CalendarIcon, CheckCircle, CheckSquare, ChevronLeft, ChevronRight } from 'lucide-react'

const HabitCalendar = ({ completedDates, toggleCompleteToday }) => {
  const [displayDate, setDisplayDate] = useState(new Date())

  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]

  const currentYear = displayDate.getFullYear()
  const currentMonth = displayDate.getMonth()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDay = new Date(currentYear, currentMonth, 1).getDay()

  const goToPreviousMonth = () => {
    setDisplayDate(new Date(currentYear, currentMonth - 1, 1))
  }

  const goToNextMonth = () => {
    setDisplayDate(new Date(currentYear, currentMonth + 1, 1))
  }

  const goToToday = () => {
    setDisplayDate(new Date())
  }

  const days = []
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-10" />)
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const isCompleted = completedDates.includes(dateStr)
    const isToday = dateStr === todayStr

    days.push(
      <div
        key={d}
        className="flex flex-col items-center justify-center h-10 relative"
      >
        <span
          className={`z-10 text-sm font-medium ${
            isCompleted
              ? 'text-white'
              : isToday
              ? 'text-teal-600 font-bold'
              : 'text-stone-600'
          }`}
        >
          {d}
        </span>
        {isCompleted && (
          <div className="absolute inset-0 m-1 bg-teal-500 rounded-full animate-fade-in shadow-sm" />
        )}
        {!isCompleted && isToday && (
          <div className="absolute inset-0 m-1 border-2 border-teal-500 rounded-full opacity-30" />
        )}
      </div>
    )
  }

  const monthCompletedCount = completedDates.filter((d) =>
    d.startsWith(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`)
  ).length

  return (
    <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
      <div className="flex justify-between items-center mb-6 border-b border-stone-100 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={goToPreviousMonth}
            className="p-1 hover:bg-stone-100 rounded transition-colors"
            aria-label="이전 달"
          >
            <ChevronLeft size={18} className="text-stone-500" />
          </button>
          <h3 className="font-bold text-lg text-stone-800 flex items-center gap-2">
            <CalendarIcon className="text-teal-600" size={20} />
            {currentYear}년 {currentMonth + 1}월
          </h3>
          <button
            onClick={goToNextMonth}
            className="p-1 hover:bg-stone-100 rounded transition-colors"
            aria-label="다음 달"
          >
            <ChevronRight size={18} className="text-stone-500" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={goToToday}
            className="text-xs text-teal-600 hover:bg-teal-50 px-2 py-1 rounded transition-colors font-medium"
          >
            오늘
          </button>
          <span className="text-xs font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
            {monthCompletedCount}일 달성
          </span>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
          <div key={d} className="text-xs font-bold text-stone-400">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{days}</div>
      <button
        onClick={toggleCompleteToday}
        className={`w-full mt-6 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all border
          ${
            completedDates.includes(todayStr)
              ? 'bg-stone-50 text-stone-500 border-stone-200'
              : 'bg-teal-600 text-white border-teal-600 hover:bg-teal-700 hover:border-teal-700 shadow-md'
          }`}
      >
        {completedDates.includes(todayStr) ? (
          <>
            <CheckCircle size={20} /> 오늘 운동 완료
          </>
        ) : (
          <>
            <CheckSquare size={20} /> 오늘 운동 완료 체크
          </>
        )}
      </button>
    </div>
  )
}

export default HabitCalendar
