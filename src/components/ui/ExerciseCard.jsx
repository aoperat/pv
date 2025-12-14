import React from 'react'
import { Heart, Clock, BarChart, ChevronRight, PlayCircle, X } from 'lucide-react'

/**
 * ExerciseCard - 재사용 가능한 운동 카드 컴포넌트
 * @param {Object} exercise - 운동 데이터 객체
 * @param {boolean} isSaved - 저장 여부
 * @param {function} onToggleSave - 저장 토글 핸들러 (id, event) => void
 * @param {function} onClick - 클릭 핸들러
 * @param {string} variant - 'grid' | 'list' | 'compact'
 */
export const ExerciseCard = ({
  exercise,
  isSaved = false,
  onToggleSave,
  onClick,
  variant = 'grid',
}) => {
  const handleSaveClick = (e) => {
    e?.stopPropagation()
    onToggleSave?.(exercise.id, e)
  }

  // Grid variant (HomeView)
  if (variant === 'grid') {
    return (
      <div
        onClick={onClick}
        className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-stone-100 overflow-hidden group relative hover:-translate-y-1"
      >
        <button
          onClick={handleSaveClick}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-stone-300 hover:text-red-500 transition shadow-sm border border-stone-100"
          aria-label={isSaved ? '저장 취소' : '저장하기'}
        >
          <Heart
            size={18}
            className={isSaved ? 'fill-red-500 text-red-500' : ''}
          />
        </button>

        <div
          className={`h-1.5 w-full ${
            exercise.type === 'stretching' ? 'bg-orange-400' : 'bg-blue-500'
          }`}
        />

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <span
              className={`text-[11px] px-2.5 py-1 rounded-md font-bold tracking-wide uppercase ${
                exercise.type === 'stretching'
                  ? 'bg-orange-50 text-orange-600 border border-orange-100'
                  : 'bg-blue-50 text-blue-600 border border-blue-100'
              }`}
            >
              {exercise.type === 'stretching' ? 'Stretching' : 'Massage'}
            </span>
            <span className="text-xs text-stone-400 font-bold flex items-center gap-1.5 bg-stone-50 px-2 py-1 rounded-full">
              <Clock size={12} /> {exercise.duration}
            </span>
          </div>

          <h3 className="text-lg font-bold text-stone-800 mb-2 group-hover:text-teal-700 transition-colors leading-snug">
            {exercise.title}
          </h3>
          <p className="text-stone-500 text-sm line-clamp-2 mb-5 leading-relaxed">
            {exercise.description}
          </p>

          <div className="flex justify-between items-center text-xs text-stone-500 mt-auto pt-4 border-t border-stone-50">
            <div className="flex items-center gap-1.5">
              <BarChart
                size={12}
                className={
                  exercise.difficulty === '상급' ? 'text-red-400' : 'text-stone-400'
                }
              />
              <span className="font-medium">{exercise.difficulty}</span>
            </div>
            <div className="flex items-center text-teal-600 font-bold text-[11px] bg-teal-50 px-2 py-1 rounded-lg group-hover:bg-teal-100 transition-colors">
              START <ChevronRight size={12} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // List variant (MyRoutineView)
  if (variant === 'list') {
    return (
      <div
        onClick={onClick}
        className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm hover:shadow-md cursor-pointer transition flex gap-4 items-center group relative"
      >
        <button
          onClick={handleSaveClick}
          className="absolute top-2 right-2 p-2 text-stone-300 hover:text-red-500 transition hover:bg-stone-50 rounded-full"
          title="저장 취소"
          aria-label="저장 취소"
        >
          <X size={16} />
        </button>

        <div
          className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform ${
            exercise.type === 'stretching'
              ? 'bg-orange-50 text-orange-500'
              : 'bg-blue-50 text-blue-500'
          }`}
        >
          <PlayCircle size={24} />
        </div>
        <div>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
              exercise.type === 'stretching'
                ? 'bg-orange-50 text-orange-600'
                : 'bg-blue-50 text-blue-600'
            }`}
          >
            {exercise.type === 'stretching' ? 'STRETCHING' : 'MASSAGE'}
          </span>
          <h4 className="font-bold text-stone-800 mt-1">{exercise.title}</h4>
          <p className="text-xs text-stone-500 mt-1 flex items-center gap-2">
            <span className="flex items-center gap-1">
              <Clock size={10} /> {exercise.duration}
            </span>
            <span className="w-px h-2 bg-stone-300" />
            <span>{exercise.difficulty}</span>
          </p>
        </div>
      </div>
    )
  }

  // Compact variant (DiagnosisView)
  if (variant === 'compact') {
    return (
      <div
        onClick={onClick}
        className="bg-white p-4 rounded-xl border border-stone-100 shadow-sm hover:shadow-md cursor-pointer transition flex gap-4 items-center group relative hover:border-teal-200"
      >
        <button
          onClick={handleSaveClick}
          className="absolute top-2 right-2 p-1.5 rounded-full text-stone-300 hover:text-red-500 transition hover:bg-stone-50 z-10"
          aria-label={isSaved ? '저장됨' : '저장하기'}
        >
          <Heart
            size={16}
            className={isSaved ? 'fill-red-500 text-red-500' : ''}
          />
        </button>
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform ${
            exercise.type === 'stretching'
              ? 'bg-orange-50 text-orange-500'
              : 'bg-blue-50 text-blue-500'
          }`}
        >
          <PlayCircle size={20} />
        </div>
        <div>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
              exercise.type === 'stretching'
                ? 'bg-orange-50 text-orange-600'
                : 'bg-blue-50 text-blue-600'
            }`}
          >
            {exercise.type === 'stretching' ? 'STRETCHING' : 'MASSAGE'}
          </span>
          <h4 className="font-bold text-stone-800 mt-1 text-sm group-hover:text-teal-700 transition-colors">
            {exercise.title}
          </h4>
          <p className="text-xs text-stone-500 mt-1 flex items-center gap-2">
            <Clock size={10} /> {exercise.duration}
          </p>
        </div>
      </div>
    )
  }

  return null
}

export default ExerciseCard
