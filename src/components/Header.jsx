import React from 'react'
import { AlignCenter, User, LogOut } from 'lucide-react'

const Header = ({ currentView, setCurrentView, onSignOut }) => {
  return (
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
            aria-label="로그아웃"
          >
            <LogOut size={16} />
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
