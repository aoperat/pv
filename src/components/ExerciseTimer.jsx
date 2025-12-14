import React, { useState, useEffect } from 'react'
import { Clock, Play, Pause, RotateCcw } from 'lucide-react'

const ExerciseTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval = null
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)
    }
    return () => clearInterval(interval)
  }, [isActive, timeLeft])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  return (
    <div className="bg-stone-800 rounded-xl p-5 text-white flex flex-col items-center justify-center shadow-lg mt-4 sm:mt-0 sm:ml-6 sm:w-64 border border-stone-700">
      <div className="text-[10px] text-teal-400 mb-2 font-bold tracking-widest uppercase flex items-center gap-1">
        <Clock size={12} /> Timer
      </div>
      <div className="text-5xl font-mono font-bold text-white mb-5 tracking-wider tabular-nums">
        {formatTime(timeLeft)}
      </div>
      <div className="flex gap-2 w-full mb-3">
        <button
          onClick={() => {
            setTimeLeft(30)
            setIsActive(false)
          }}
          className="flex-1 bg-stone-700 hover:bg-stone-600 text-xs font-bold py-2 rounded transition-colors"
        >
          30초
        </button>
        <button
          onClick={() => {
            setTimeLeft(60)
            setIsActive(false)
          }}
          className="flex-1 bg-stone-700 hover:bg-stone-600 text-xs font-bold py-2 rounded transition-colors"
        >
          1분
        </button>
      </div>
      <div className="flex gap-2 w-full">
        <button
          onClick={() => setIsActive(!isActive)}
          disabled={timeLeft === 0}
          className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-1.5 font-bold transition-all
            ${
              timeLeft === 0
                ? 'bg-stone-700 text-stone-500 cursor-not-allowed'
                : isActive
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-teal-600 hover:bg-teal-500 text-white'
            }`}
        >
          {isActive ? (
            <>
              <Pause size={16} /> 정지
            </>
          ) : (
            <>
              <Play size={16} /> 시작
            </>
          )}
        </button>
        <button
          onClick={() => {
            setIsActive(false)
            setTimeLeft(0)
          }}
          className="w-12 flex items-center justify-center bg-stone-700 hover:bg-stone-600 rounded-lg text-stone-300 transition-colors"
          aria-label="초기화"
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  )
}

export default ExerciseTimer
