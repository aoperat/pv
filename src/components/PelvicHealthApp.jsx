import React, { useState } from 'react'
import {
  Activity,
  Clock,
  BarChart,
  X,
  Heart,
  ChevronRight,
  PlayCircle,
  AlertCircle,
  Youtube,
  CheckCircle,
  ArrowRight,
  RefreshCw,
  CheckSquare,
  Square,
  Stethoscope,
  Play,
  Pause,
  RotateCcw,
  Calendar as CalendarIcon,
  MapPin,
  User,
  AlignCenter,
  Layout,
  LogOut,
} from 'lucide-react'
import { useSavedRoutines, useCompletedDates } from '../hooks/useSupabaseData'
import {
  exercises as healthData,
  conditionTitles,
  conditionExplanations,
  youtubeRecommendations,
  diagnosisQuestions,
} from '../data'

const PelvicHealthApp = ({ user, onSignOut }) => {
  const [currentView, setCurrentView] = useState('home')
  const [activeTab, setActiveTab] = useState('all')
  const [selectedItem, setSelectedItem] = useState(null)
  const [bodyMapFilter, setBodyMapFilter] = useState(null)

  // Supabase hooks
  const { savedItems, toggleSave } = useSavedRoutines(user?.id)
  const { completedDates, toggleCompleteToday } = useCompletedDates(user?.id)

  // 수정된 toggleSave - 이벤트 처리 포함
  const handleToggleSave = (id, e) => {
    e?.stopPropagation()
    toggleSave(id)
  }

  // HabitCalendar 컴포넌트
  const HabitCalendar = () => {
    const today = new Date()
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDay = new Date(currentYear, currentMonth, 1).getDay()
    const todayStr = today.toISOString().split('T')[0]

    const days = []
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>)
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
        2,
        '0'
      )}-${String(d).padStart(2, '0')}`
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
            <div className="absolute inset-0 m-1 bg-teal-500 rounded-full animate-fade-in shadow-sm"></div>
          )}
          {!isCompleted && isToday && (
            <div className="absolute inset-0 m-1 border-2 border-teal-500 rounded-full opacity-30"></div>
          )}
        </div>
      )
    }

    return (
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <div className="flex justify-between items-center mb-6 border-b border-stone-100 pb-4">
          <h3 className="font-bold text-lg text-stone-800 flex items-center gap-2">
            <CalendarIcon className="text-teal-600" size={20} />
            {currentYear}년 {currentMonth + 1}월
          </h3>
          <span className="text-xs font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
            {
              completedDates.filter((d) =>
                d.startsWith(
                  `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`
                )
              ).length
            }
            일 달성
          </span>
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

  // BodyMap 컴포넌트
  const BodyMap = () => {
    return (
      <div className="relative w-full max-w-[280px] mx-auto aspect-[3/4] bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm">
        <div className="absolute top-4 left-0 right-0 text-center z-10">
          <p className="text-xs font-bold text-stone-400 tracking-widest uppercase">
            Select Area
          </p>
        </div>
        <svg viewBox="0 0 200 300" className="w-full h-full p-4">
          <path
            d="M60,40 Q100,20 140,40 Q160,80 150,120 Q170,160 160,200 L150,280 L110,240 L90,240 L50,280 L40,200 Q30,160 50,120 Q40,80 60,40 Z"
            fill="#f5f5f4"
            stroke="#e7e5e4"
            strokeWidth="1"
          />

          <g
            onClick={() =>
              setBodyMapFilter(bodyMapFilter === 'waist' ? null : 'waist')
            }
            className="cursor-pointer transition-all hover:opacity-90"
          >
            <path
              d="M55,110 Q100,105 145,110 L140,140 Q100,145 60,140 Z"
              fill={bodyMapFilter === 'waist' ? '#0d9488' : '#ccfbf1'}
              stroke={bodyMapFilter === 'waist' ? '#115e59' : '#99f6e4'}
              strokeWidth="1"
            />
            {bodyMapFilter === 'waist' && (
              <circle
                cx="100"
                cy="125"
                r="3"
                fill="white"
                className="animate-pulse"
              />
            )}
            <text
              x="100"
              y="128"
              textAnchor="middle"
              fontSize="10"
              fill={bodyMapFilter === 'waist' ? 'white' : '#0f766e'}
              fontWeight="bold"
              style={{ pointerEvents: 'none' }}
            >
              허리
            </text>
          </g>

          <g
            onClick={() =>
              setBodyMapFilter(bodyMapFilter === 'hip' ? null : 'hip')
            }
            className="cursor-pointer transition-all hover:opacity-90"
          >
            <path
              d="M45,145 Q20,160 40,200 L60,210 L90,160 Z"
              fill={bodyMapFilter === 'hip' ? '#0d9488' : '#ccfbf1'}
              stroke={bodyMapFilter === 'hip' ? '#115e59' : '#99f6e4'}
              strokeWidth="1"
            />
            <path
              d="M155,145 Q180,160 160,200 L140,210 L110,160 Z"
              fill={bodyMapFilter === 'hip' ? '#0d9488' : '#ccfbf1'}
              stroke={bodyMapFilter === 'hip' ? '#115e59' : '#99f6e4'}
              strokeWidth="1"
            />
            {bodyMapFilter === 'hip' && (
              <>
                <circle
                  cx="35"
                  cy="175"
                  r="3"
                  fill="white"
                  className="animate-pulse"
                />
                <circle
                  cx="165"
                  cy="175"
                  r="3"
                  fill="white"
                  className="animate-pulse"
                />
              </>
            )}
            <text
              x="35"
              y="180"
              textAnchor="middle"
              fontSize="10"
              fill={bodyMapFilter === 'hip' ? 'white' : '#0f766e'}
              fontWeight="bold"
              style={{ pointerEvents: 'none' }}
            >
              둔근
            </text>
            <text
              x="165"
              y="180"
              textAnchor="middle"
              fontSize="10"
              fill={bodyMapFilter === 'hip' ? 'white' : '#0f766e'}
              fontWeight="bold"
              style={{ pointerEvents: 'none' }}
            >
              둔근
            </text>
          </g>

          <g
            onClick={() =>
              setBodyMapFilter(bodyMapFilter === 'groin' ? null : 'groin')
            }
            className="cursor-pointer transition-all hover:opacity-90"
          >
            <circle
              cx="100"
              cy="180"
              r="25"
              fill={bodyMapFilter === 'groin' ? '#0d9488' : '#ccfbf1'}
              stroke={bodyMapFilter === 'groin' ? '#115e59' : '#99f6e4'}
              strokeWidth="1"
            />
            {bodyMapFilter === 'groin' && (
              <circle
                cx="100"
                cy="165"
                r="3"
                fill="white"
                className="animate-pulse"
              />
            )}
            <text
              x="100"
              y="185"
              textAnchor="middle"
              fontSize="10"
              fill={bodyMapFilter === 'groin' ? 'white' : '#0f766e'}
              fontWeight="bold"
              style={{ pointerEvents: 'none' }}
            >
              고관절
            </text>
          </g>
        </svg>
        <div className="absolute bottom-0 left-0 right-0 bg-stone-50 p-3 text-center border-t border-stone-100">
          <p className="text-xs text-stone-500 font-medium flex justify-center items-center gap-1">
            <MapPin size={12} /> 불편한 부위 터치
          </p>
        </div>
      </div>
    )
  }

  const ExerciseTimer = () => {
    const [timeLeft, setTimeLeft] = useState(0)
    const [isActive, setIsActive] = useState(false)

    React.useEffect(() => {
      let interval = null
      if (isActive && timeLeft > 0) {
        interval = setInterval(() => {
          setTimeLeft((timeLeft) => timeLeft - 1)
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
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
    )
  }

  const Header = () => (
    <header className="bg-white/80 backdrop-blur-md text-stone-800 sticky top-0 z-30 border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setCurrentView('home')}
        >
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white shadow-sm group-hover:bg-teal-700 transition-colors">
            <AlignCenter size={20} />
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-stone-800 leading-none">
              바른골반
            </h1>
            <span className="text-[10px] text-teal-600 font-bold tracking-wider">
              BareunPelvic
            </span>
          </div>
        </div>
        <nav className="flex gap-1 sm:gap-2 text-sm font-medium items-center">
          <button
            onClick={() => setCurrentView('home')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              currentView === 'home'
                ? 'bg-stone-100 text-stone-900 font-bold'
                : 'text-stone-500 hover:bg-stone-50 hover:text-stone-700'
            }`}
          >
            홈
          </button>
          <button
            onClick={() => setCurrentView('diagnosis')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              currentView === 'diagnosis'
                ? 'bg-stone-100 text-stone-900 font-bold'
                : 'text-stone-500 hover:bg-stone-50 hover:text-stone-700'
            }`}
          >
            자가진단
          </button>
          <button
            onClick={() => setCurrentView('my_routine')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              currentView === 'my_routine'
                ? 'bg-stone-100 text-stone-900 font-bold'
                : 'text-stone-500 hover:bg-stone-50 hover:text-stone-700'
            }`}
          >
            <User size={16} /> 내 루틴
          </button>
          <button
            onClick={onSignOut}
            className="px-3 py-1.5 rounded-lg transition-all text-stone-500 hover:bg-stone-50 hover:text-stone-700 flex items-center gap-1.5"
            title="로그아웃"
          >
            <LogOut size={16} />
          </button>
        </nav>
      </div>
    </header>
  )

  const HomeView = () => {
    const filteredData = healthData.filter((item) => {
      const matchTab = activeTab === 'all' || item.type === activeTab
      const matchBody = bodyMapFilter ? item.bodyPart === bodyMapFilter : true
      return matchTab && matchBody
    })

    return (
      <>
        <section className="bg-gradient-to-b from-teal-50 to-white py-12 px-4 animate-fade-in border-b border-stone-100">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-center md:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/50 text-teal-700 text-xs font-bold border border-teal-100">
                <CheckCircle size={12} /> 하루 10분, 나를 위한 바른 습관
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-800 leading-tight">
                틀어진 균형을
                <br />
                <span className="text-teal-600">바르게</span> 되찾는 시간
              </h2>
              <p className="text-stone-500 leading-relaxed text-sm sm:text-base max-w-md mx-auto md:mx-0">
                통증의 원인을 찾고, 바른 자세로 교정하세요.
                <br />
                오른쪽 <b>바디 맵</b>에서 불편한 부위를 선택하면 맞춤 운동을
                추천해드립니다.
              </p>

              <div className="flex justify-center md:justify-start gap-2 pt-2">
                {['all', 'stretching', 'massage'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                      activeTab === tab
                        ? 'bg-stone-800 text-white border-stone-800 shadow-lg scale-105'
                        : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400 hover:bg-stone-50'
                    }`}
                  >
                    {tab === 'all'
                      ? '전체 보기'
                      : tab === 'stretching'
                      ? '스트레칭'
                      : '마사지'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-shrink-0 relative group">
              <div className="absolute -inset-4 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-all duration-500"></div>
              <BodyMap />
            </div>
          </div>
        </section>

        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-100">
            <h3 className="text-xl font-extrabold text-stone-800 flex items-center gap-2">
              <Layout size={24} className="text-teal-600" />
              {bodyMapFilter
                ? `${
                    bodyMapFilter === 'waist'
                      ? '허리'
                      : bodyMapFilter === 'hip'
                      ? '엉덩이/둔근'
                      : '고관절/서혜부'
                  } 집중 케어`
                : '추천 가이드 리스트'}
            </h3>
            {bodyMapFilter && (
              <button
                onClick={() => setBodyMapFilter(null)}
                className="text-xs bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-full text-stone-600 flex items-center gap-1.5 font-bold transition-colors"
              >
                <RefreshCw size={12} /> 전체 보기
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-stone-100 overflow-hidden group relative hover:-translate-y-1"
              >
                <button
                  onClick={(e) => handleToggleSave(item.id, e)}
                  className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-stone-300 hover:text-red-500 transition shadow-sm border border-stone-100"
                >
                  <Heart
                    size={18}
                    className={
                      savedItems.includes(item.id)
                        ? 'fill-red-500 text-red-500'
                        : ''
                    }
                  />
                </button>

                <div
                  className={`h-1.5 w-full ${
                    item.type === 'stretching' ? 'bg-orange-400' : 'bg-blue-500'
                  }`}
                ></div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className={`text-[11px] px-2.5 py-1 rounded-md font-bold tracking-wide uppercase ${
                        item.type === 'stretching'
                          ? 'bg-orange-50 text-orange-600 border border-orange-100'
                          : 'bg-blue-50 text-blue-600 border border-blue-100'
                      }`}
                    >
                      {item.type === 'stretching' ? 'Stretching' : 'Massage'}
                    </span>
                    <span className="text-xs text-stone-400 font-bold flex items-center gap-1.5 bg-stone-50 px-2 py-1 rounded-full">
                      <Clock size={12} /> {item.duration}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-800 mb-2 group-hover:text-teal-700 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-stone-500 text-sm line-clamp-2 mb-5 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex justify-between items-center text-xs text-stone-500 mt-auto pt-4 border-t border-stone-50">
                    <div className="flex items-center gap-1.5">
                      <BarChart
                        size={12}
                        className={
                          item.difficulty === '상급'
                            ? 'text-red-400'
                            : 'text-stone-400'
                        }
                      />
                      <span className="font-medium">{item.difficulty}</span>
                    </div>
                    <div className="flex items-center text-teal-600 font-bold text-[11px] bg-teal-50 px-2 py-1 rounded-lg group-hover:bg-teal-100 transition-colors">
                      START <ChevronRight size={12} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredData.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-stone-400 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                <AlertCircle size={32} className="mb-2 opacity-50" />
                <p>선택한 조건에 맞는 가이드가 없습니다.</p>
                <button
                  onClick={() => setBodyMapFilter(null)}
                  className="mt-4 text-teal-600 font-bold text-sm hover:underline"
                >
                  필터 초기화
                </button>
              </div>
            )}
          </div>
        </main>
      </>
    )
  }

  const MyRoutineView = () => {
    const myExercises = healthData.filter((item) =>
      savedItems.includes(item.id)
    )

    return (
      <div className="max-w-4xl mx-auto px-4 py-10 animate-fade-in">
        <div className="flex items-center gap-3 mb-8 border-b border-stone-100 pb-4">
          <div className="p-2 bg-red-50 rounded-xl">
            <Heart className="text-red-500 fill-red-500" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-stone-800">
              나의 루틴 & 습관
            </h2>
            <p className="text-sm text-stone-500">
              저장한 운동과 월간 달성률을 확인하세요.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <HabitCalendar />
          </div>

          <div className="md:col-span-2 space-y-5">
            <h3 className="font-bold text-lg text-stone-800 flex items-center gap-2">
              <Activity size={20} className="text-teal-600" /> 저장한 가이드 (
              {myExercises.length})
            </h3>

            {myExercises.length === 0 ? (
              <div className="bg-stone-50 border border-dashed border-stone-200 rounded-2xl p-10 text-center text-stone-500 flex flex-col items-center">
                <Heart size={32} className="text-stone-300 mb-3" />
                <p className="mb-4 font-medium">아직 저장된 루틴이 없습니다.</p>
                <button
                  onClick={() => setCurrentView('home')}
                  className="bg-white border border-stone-300 px-4 py-2 rounded-lg text-sm font-bold text-stone-600 hover:bg-stone-50 hover:text-teal-600 transition-colors"
                >
                  가이드 찾아보기
                </button>
              </div>
            ) : (
              myExercises.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm hover:shadow-md cursor-pointer transition flex gap-4 items-center group relative"
                >
                  <button
                    onClick={(e) => handleToggleSave(item.id, e)}
                    className="absolute top-2 right-2 p-2 text-stone-300 hover:text-red-500 transition hover:bg-stone-50 rounded-full"
                    title="저장 취소"
                  >
                    <X size={16} />
                  </button>

                  <div
                    className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform ${
                      item.type === 'stretching'
                        ? 'bg-orange-50 text-orange-500'
                        : 'bg-blue-50 text-blue-500'
                    }`}
                  >
                    <PlayCircle size={24} />
                  </div>
                  <div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.type === 'stretching'
                          ? 'bg-orange-50 text-orange-600'
                          : 'bg-blue-50 text-blue-600'
                      }`}
                    >
                      {item.type === 'stretching' ? 'STRETCHING' : 'MASSAGE'}
                    </span>
                    <h4 className="font-bold text-stone-800 mt-1">{item.title}</h4>
                    <p className="text-xs text-stone-500 mt-1 flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <Clock size={10} /> {item.duration}
                      </span>
                      <span className="w-px h-2 bg-stone-300"></span>
                      <span>{item.difficulty}</span>
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    )
  }

  const DiagnosisView = () => {
    const [step, setStep] = useState(0)
    const [answers, setAnswers] = useState({})
    const [resultData, setResultData] = useState(null)

    const toggleAnswer = (questionId, value) => {
      const currentSelection = answers[questionId] || []
      let newSelection
      if (currentSelection.includes(value)) {
        newSelection = currentSelection.filter((item) => item !== value)
      } else {
        newSelection = [...currentSelection, value]
      }
      setAnswers({ ...answers, [questionId]: newSelection })
    }

    const handleNext = () => {
      if (step < diagnosisQuestions.length) {
        setStep(step + 1)
      } else {
        analyzeResult(answers)
        setStep(step + 1)
      }
    }

    const analyzeResult = (finalAnswers) => {
      const allSelectedConditions = Object.values(finalAnswers).flat()
      if (allSelectedConditions.length === 0)
        allSelectedConditions.push('general_maintenance')
      const uniqueConditions = [...new Set(allSelectedConditions)]
      setResultData({ conditions: uniqueConditions })
    }

    const resetDiagnosis = () => {
      setStep(0)
      setAnswers({})
      setResultData(null)
    }

    if (step === 0) {
      return (
        <div className="max-w-xl mx-auto px-4 py-16 text-center animate-fade-in">
          <div className="bg-white p-10 rounded-3xl shadow-lg border border-teal-100">
            <div className="w-20 h-20 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Stethoscope size={40} />
            </div>
            <h2 className="text-3xl font-extrabold text-stone-800 mb-4">
              골반 정렬 체크
            </h2>
            <p className="text-stone-600 mb-10 leading-relaxed">
              현재 불편한 부위와 평소 자세 습관을 알려주시면
              <br />
              <span className="text-teal-600 font-bold">바른골반 AI</span>가
              맞춤형 교정 루틴을 설계해드립니다.
            </p>
            <button
              onClick={() => setStep(1)}
              className="bg-stone-800 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-stone-700 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-3 mx-auto"
            >
              자가진단 시작하기 <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )
    }

    if (step <= diagnosisQuestions.length) {
      const currentQuestion = diagnosisQuestions[step - 1]
      const currentSelections = answers[currentQuestion.id] || []
      const hasSelection = currentSelections.length > 0

      return (
        <div className="max-w-xl mx-auto px-4 py-16 animate-fade-in">
          <div className="mb-8">
            <div className="flex justify-between text-xs font-bold text-stone-400 mb-2 uppercase tracking-wider">
              <span>Step {step}</span>
              <span>
                {step} / {diagnosisQuestions.length}
              </span>
            </div>
            <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-600 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${(step / diagnosisQuestions.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-stone-800 mb-3 leading-snug">
            {currentQuestion.question}
          </h2>
          <p className="text-stone-500 text-sm mb-8 font-medium">
            해당되는 항목을 모두 선택해주세요 (복수 선택 가능)
          </p>

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = currentSelections.includes(option.value)
              return (
                <button
                  key={idx}
                  onClick={() => toggleAnswer(currentQuestion.id, option.value)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all group flex items-center gap-4
                    ${
                      isSelected
                        ? 'border-teal-500 bg-teal-50/50 text-teal-900 shadow-md'
                        : 'border-stone-100 bg-white hover:border-stone-300 text-stone-600'
                    }`}
                >
                  <div
                    className={`flex-shrink-0 transition-colors ${
                      isSelected ? 'text-teal-600' : 'text-stone-300'
                    }`}
                  >
                    {isSelected ? <CheckSquare size={24} /> : <Square size={24} />}
                  </div>
                  <span className="font-bold text-lg">{option.text}</span>
                </button>
              )
            })}
          </div>
          <div className="mt-10 flex justify-end">
            <button
              onClick={handleNext}
              disabled={!hasSelection}
              className={`px-10 py-4 rounded-xl font-bold flex items-center gap-2 transition-all text-lg
                ${
                  hasSelection
                    ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-lg hover:-translate-y-0.5'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
            >
              {step === diagnosisQuestions.length
                ? '결과 분석하기'
                : '다음 단계'}{' '}
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )
    }

    if (step > diagnosisQuestions.length && resultData) {
      return (
        <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-teal-600 text-white px-5 py-1.5 rounded-full text-sm font-bold mb-6 shadow-md">
              <CheckCircle size={16} /> 분석 완료
            </div>
            <h2 className="text-3xl font-extrabold text-stone-800 mb-3">
              맞춤형 교정 리포트
            </h2>
            <p className="text-stone-500 max-w-lg mx-auto leading-relaxed">
              회원님의 증상을 분석하여 가장 시급한 교정 루틴을 선별했습니다.
              <br />
              아래 가이드를 따라 꾸준히 관리해보세요.
            </p>
          </div>
          <div className="space-y-8">
            {resultData.conditions.map((condition) => {
              const exercises = healthData.filter((item) =>
                item.targetCondition.includes(condition)
              )
              const videos =
                youtubeRecommendations[condition] ||
                youtubeRecommendations['general_maintenance']
              const explanation = conditionExplanations[condition]
              const title = conditionTitles[condition] || '골반 건강 케어'

              return (
                <div
                  key={condition}
                  className="bg-white rounded-3xl border border-stone-200 shadow-lg overflow-hidden"
                >
                  <div className="bg-stone-50 p-6 sm:p-8 border-b border-stone-100">
                    <h3 className="flex items-center gap-2.5 text-xl font-extrabold text-stone-800 mb-4">
                      <Activity size={24} className="text-teal-600" />
                      {title}
                    </h3>
                    <div className="flex gap-4 text-stone-700 bg-white p-5 rounded-2xl items-start shadow-sm border border-stone-100">
                      <div className="flex-shrink-0 w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5"></div>
                      <p className="leading-relaxed font-medium">{explanation}</p>
                    </div>
                  </div>
                  <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-stone-100">
                    <div className="p-6 sm:p-8">
                      <h4 className="flex items-center gap-2 text-lg font-bold text-stone-800 mb-6">
                        <PlayCircle size={20} className="text-teal-600" /> 추천
                        운동 가이드
                      </h4>
                      <div className="space-y-4">
                        {exercises.length > 0 ? (
                          exercises.map((item) => (
                            <div
                              key={item.id}
                              onClick={() => setSelectedItem(item)}
                              className="bg-white p-4 rounded-xl border border-stone-100 shadow-sm hover:shadow-md cursor-pointer transition flex gap-4 items-center group relative hover:border-teal-200"
                            >
                              <button
                                onClick={(e) => handleToggleSave(item.id, e)}
                                className="absolute top-2 right-2 p-1.5 rounded-full text-stone-300 hover:text-red-500 transition hover:bg-stone-50 z-10"
                              >
                                <Heart
                                  size={16}
                                  className={
                                    savedItems.includes(item.id)
                                      ? 'fill-red-500 text-red-500'
                                      : ''
                                  }
                                />
                              </button>
                              <div
                                className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform ${
                                  item.type === 'stretching'
                                    ? 'bg-orange-50 text-orange-500'
                                    : 'bg-blue-50 text-blue-500'
                                }`}
                              >
                                <PlayCircle size={20} />
                              </div>
                              <div>
                                <span
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                    item.type === 'stretching'
                                      ? 'bg-orange-50 text-orange-600'
                                      : 'bg-blue-50 text-blue-600'
                                  }`}
                                >
                                  {item.type === 'stretching' ? 'STRETCHING' : 'MASSAGE'}
                                </span>
                                <h4 className="font-bold text-stone-800 mt-1 text-sm group-hover:text-teal-700 transition-colors">
                                  {item.title}
                                </h4>
                                <p className="text-xs text-stone-500 mt-1 flex items-center gap-2">
                                  <Clock size={10} /> {item.duration}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-stone-400 bg-stone-50 p-4 rounded-lg text-center">
                            해당 증상에 특화된 가이드가 곧 추가될 예정입니다. 기본
                            스트레칭을 참고해주세요.
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="p-6 sm:p-8 bg-stone-50/50">
                      <h4 className="flex items-center gap-2 text-lg font-bold text-stone-800 mb-6">
                        <Youtube size={20} className="text-red-600" /> 참고 영상
                      </h4>
                      <div className="space-y-4">
                        {videos.map((video, idx) => (
                          <div
                            key={idx}
                            className="bg-white p-4 rounded-xl border border-stone-100 shadow-sm hover:border-red-200 transition group hover:-translate-y-0.5"
                          >
                            <div className="flex gap-4">
                              <div className="w-20 h-14 bg-stone-200 rounded-lg flex-shrink-0 flex items-center justify-center group-hover:bg-red-50 transition-colors">
                                <Youtube
                                  size={24}
                                  className="text-stone-400 group-hover:text-red-500"
                                />
                              </div>
                              <div className="flex-1 min-w-0 flex flex-col justify-center">
                                <h4 className="font-bold text-stone-800 text-sm line-clamp-1 leading-tight mb-1 truncate">
                                  {video.title}
                                </h4>
                                <div className="flex justify-between items-center text-xs text-stone-500">
                                  <span className="truncate pr-2 font-medium">
                                    {video.channel}
                                  </span>
                                  <span className="bg-stone-100 px-1.5 py-0.5 rounded flex-shrink-0 font-bold">
                                    {video.duration}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-16 text-center">
            <button
              onClick={resetDiagnosis}
              className="text-stone-500 hover:text-teal-600 font-bold flex items-center justify-center gap-2 mx-auto transition bg-white px-6 py-3 rounded-full shadow-sm hover:shadow border border-stone-200"
            >
              <RefreshCw size={16} /> 처음부터 다시 진단하기
            </button>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 selection:bg-teal-100 selection:text-teal-900">
      <Header />

      {currentView === 'home' && <HomeView />}
      {currentView === 'diagnosis' && <DiagnosisView />}
      {currentView === 'my_routine' && <MyRoutineView />}

      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full transition-colors z-20 backdrop-blur-md"
            >
              <X size={20} className="text-stone-800" />
            </button>

            <div
              className={`h-48 w-full flex items-center justify-center relative ${
                selectedItem.type === 'stretching'
                  ? 'bg-orange-50'
                  : 'bg-blue-50'
              }`}
            >
              <PlayCircle
                size={64}
                className={`opacity-80 drop-shadow-lg ${
                  selectedItem.type === 'stretching'
                    ? 'text-orange-400'
                    : 'text-blue-400'
                }`}
              />
              <button
                onClick={(e) => handleToggleSave(selectedItem.id, e)}
                className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full bg-white text-stone-600 text-sm font-bold shadow-md hover:scale-105 transition"
              >
                <Heart
                  size={18}
                  className={
                    savedItems.includes(selectedItem.id)
                      ? 'fill-red-500 text-red-500'
                      : ''
                  }
                />
                {savedItems.includes(selectedItem.id) ? '저장됨' : '루틴 저장'}
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedItem.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs text-teal-700 bg-teal-50 border border-teal-100 px-2 py-1 rounded-md font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-extrabold text-stone-800 mb-3 leading-tight">
                    {selectedItem.title}
                  </h2>
                  <p className="text-stone-600 leading-relaxed text-sm border-l-2 border-stone-200 pl-3">
                    {selectedItem.description}
                  </p>
                </div>

                <ExerciseTimer />
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="flex items-center gap-2 font-bold text-stone-800 mb-4 text-lg border-b border-stone-100 pb-2">
                    <Activity size={20} className="text-teal-600" /> 운동 순서
                  </h4>
                  <ol className="space-y-4">
                    {selectedItem.steps.map((step, idx) => (
                      <li key={idx} className="flex gap-4 text-stone-700">
                        <span className="flex-shrink-0 w-6 h-6 bg-stone-800 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5 shadow-sm">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed font-medium">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="bg-red-50/50 border border-red-100 rounded-2xl p-5 flex gap-4 items-start">
                  <AlertCircle
                    size={24}
                    className="text-red-500 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <h4 className="font-bold text-red-700 mb-1 text-sm">주의사항</h4>
                    <p className="text-red-600 text-sm leading-relaxed">
                      {selectedItem.caution}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-white border-t border-stone-200 py-10 px-4 mt-auto">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="flex justify-center items-center gap-2 text-stone-800 font-extrabold text-xl">
            <AlignCenter className="w-6 h-6 text-teal-600" /> 바른골반
          </div>
          <p className="text-xs sm:text-sm text-stone-500 max-w-xl mx-auto leading-relaxed">
            바른골반이 제공하는 정보는 일반적인 건강 증진을 위한 가이드이며,
            <br className="hidden sm:block" />
            의학적 진단을 대신할 수 없습니다. 심한 통증은 전문의와 상담하세요.
          </p>
          <div className="pt-6 text-xs text-stone-400 font-medium">
            © 2024 BareunPelvic. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PelvicHealthApp
