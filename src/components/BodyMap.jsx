import React from 'react'
import { MapPin } from 'lucide-react'

const BodyMap = ({ bodyMapFilter, setBodyMapFilter }) => {
  const handleKeyDown = (e, part) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setBodyMapFilter(bodyMapFilter === part ? null : part)
    }
  }

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

        {/* 허리 영역 */}
        <g
          role="button"
          tabIndex={0}
          aria-label="허리 부위 선택"
          aria-pressed={bodyMapFilter === 'waist'}
          onClick={() => setBodyMapFilter(bodyMapFilter === 'waist' ? null : 'waist')}
          onKeyDown={(e) => handleKeyDown(e, 'waist')}
          className="cursor-pointer transition-all hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
        >
          <path
            d="M55,110 Q100,105 145,110 L140,140 Q100,145 60,140 Z"
            fill={bodyMapFilter === 'waist' ? '#0d9488' : '#ccfbf1'}
            stroke={bodyMapFilter === 'waist' ? '#115e59' : '#99f6e4'}
            strokeWidth="1"
          />
          {bodyMapFilter === 'waist' && (
            <circle cx="100" cy="125" r="3" fill="white" className="animate-pulse" />
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

        {/* 엉덩이/둔근 영역 */}
        <g
          role="button"
          tabIndex={0}
          aria-label="엉덩이 부위 선택"
          aria-pressed={bodyMapFilter === 'hip'}
          onClick={() => setBodyMapFilter(bodyMapFilter === 'hip' ? null : 'hip')}
          onKeyDown={(e) => handleKeyDown(e, 'hip')}
          className="cursor-pointer transition-all hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
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
              <circle cx="35" cy="175" r="3" fill="white" className="animate-pulse" />
              <circle cx="165" cy="175" r="3" fill="white" className="animate-pulse" />
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

        {/* 고관절/서혜부 영역 */}
        <g
          role="button"
          tabIndex={0}
          aria-label="고관절 부위 선택"
          aria-pressed={bodyMapFilter === 'groin'}
          onClick={() => setBodyMapFilter(bodyMapFilter === 'groin' ? null : 'groin')}
          onKeyDown={(e) => handleKeyDown(e, 'groin')}
          className="cursor-pointer transition-all hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
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
            <circle cx="100" cy="165" r="3" fill="white" className="animate-pulse" />
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

export default BodyMap
