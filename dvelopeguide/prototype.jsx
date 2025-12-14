import React, { useState, useEffect } from "react";
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
} from "lucide-react";

const PelvicHealthApp = () => {
  const [currentView, setCurrentView] = useState("home"); // 'home', 'diagnosis', 'my_routine'
  const [activeTab, setActiveTab] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);

  // --- New Features State ---
  const [savedItems, setSavedItems] = useState([]); // ID array
  const [completedDates, setCompletedDates] = useState([]); // 'YYYY-MM-DD' array
  const [bodyMapFilter, setBodyMapFilter] = useState(null); // 'waist', 'hip', 'groin'

  // Load from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("pelvic_saved_items");
    const dates = localStorage.getItem("pelvic_completed_dates");
    if (saved) setSavedItems(JSON.parse(saved));
    if (dates) setCompletedDates(JSON.parse(dates));
  }, []);

  // Save to LocalStorage on change
  useEffect(() => {
    localStorage.setItem("pelvic_saved_items", JSON.stringify(savedItems));
  }, [savedItems]);

  useEffect(() => {
    localStorage.setItem(
      "pelvic_completed_dates",
      JSON.stringify(completedDates)
    );
  }, [completedDates]);

  // Toggle Save Function
  const toggleSave = (id, e) => {
    e?.stopPropagation();
    if (savedItems.includes(id)) {
      setSavedItems(savedItems.filter((itemId) => itemId !== id));
    } else {
      setSavedItems([...savedItems, id]);
    }
  };

  // Toggle Complete Today
  const toggleCompleteToday = () => {
    const today = new Date().toISOString().split("T")[0];
    if (completedDates.includes(today)) {
      setCompletedDates(completedDates.filter((date) => date !== today));
    } else {
      setCompletedDates([...completedDates, today]);
    }
  };

  // --- 데이터 섹션 ---
  const conditionTitles = {
    back_pain: "허리 통증 케어",
    sciatica: "좌골신경통 & 이상근 케어",
    swelling: "하체 부종 & 순환 케어",
    pelvic_imbalance: "골반 불균형 & 비대칭 교정",
    anterior_tilt: "전방경사(오리궁뎅이) 교정",
    general_maintenance: "데일리 골반 건강 관리",
  };

  const conditionExplanations = {
    back_pain:
      "장시간 앉아있는 생활로 인해 엉덩이 근육이 약해지고 허리 근육이 과도하게 긴장했을 수 있어요. 허리를 지탱하는 힘을 길러야 해요.",
    sciatica:
      "엉덩이 깊숙한 곳의 '이상근'이 신경을 누르고 있거나, 골반의 불균형으로 인해 좌골 신경이 자극받고 있을 가능성이 높아요.",
    swelling:
      "골반 주변의 림프 순환이 원활하지 않아 노폐물이 쌓이거나, 하체 근력이 부족하여 혈액을 심장으로 올려주지 못하고 있을 수 있어요.",
    pelvic_imbalance:
      "다리를 꼬거나 짝다리를 짚는 등의 평소 습관으로 인해 골반의 좌우 균형이 무너져 주변 근육 길이가 달라졌을 수 있어요.",
    anterior_tilt:
      "장요근(고관절 굴곡근)이 짧아지고 복근이 약해지면서 골반이 앞으로 쏠려, 허리가 과도하게 꺾이는 자세가 원인일 수 있어요.",
    general_maintenance:
      "현재 큰 통증은 없지만, 꾸준한 관리를 통해 건강한 골반 상태를 유지하는 것이 중요해요.",
  };

  // Added bodyPart mapping for Feature 5
  const healthData = [
    {
      id: 1,
      type: "stretching",
      category: "유연성",
      title: "나비 자세 (Baddha Konasana)",
      description:
        "골반과 고관절을 열어주어 혈액순환을 돕고 생리통 완화에 효과적인 자세입니다.",
      duration: "3분",
      difficulty: "초급",
      steps: [
        "바닥에 앉아 두 발바닥을 서로 마주 대고 끌어당깁니다.",
        "양손으로 발을 잡고 허리를 곧게 폅니다.",
        "내쉬는 숨에 상체를 천천히 앞으로 숙입니다.",
        "무리하지 않고 가능한 만큼만 내려가 30초 유지합니다.",
      ],
      caution: "무릎에 통증이 있다면 발을 몸에서 조금 멀리 두세요.",
      tags: ["#생리통완화", "#고관절이완"],
      targetCondition: ["stiff_hip", "period_pain", "general_maintenance"],
      bodyPart: "groin", // 고관절/서혜부
    },
    {
      id: 2,
      type: "stretching",
      category: "교정",
      title: "장요근 스트레칭 (Lunge Stretch)",
      description:
        "오래 앉아있는 사람들의 단축된 장요근을 늘려주어 허리 통증과 골반 전방경사를 예방합니다.",
      duration: "5분",
      difficulty: "중급",
      steps: [
        "런지 자세를 취하듯 한쪽 발을 앞으로, 반대쪽 다리는 뒤로 뻗어 무릎을 바닥에 댑니다.",
        "골반을 앞쪽 아래로 지긋이 눌러줍니다.",
        "상체는 곧게 세우고 배에 힘을 주어 허리가 꺾이지 않게 합니다.",
        "양쪽 각각 30초씩 반복합니다.",
      ],
      caution: "허리를 과도하게 젖히지 않도록 복부에 힘을 유지하세요.",
      tags: ["#허리통증", "#전방경사교정"],
      targetCondition: ["back_pain", "anterior_tilt"],
      bodyPart: "waist", // 허리/골반앞쪽
    },
    {
      id: 3,
      type: "massage",
      category: "이완",
      title: "둔근(엉덩이) 폼롤러 마사지",
      description:
        "굳어있는 엉덩이 근육을 풀어주어 좌골신경통 예방과 골반 가동성을 확보합니다.",
      duration: "5분",
      difficulty: "초급",
      steps: [
        "폼롤러 위에 엉덩이를 대고 앉습니다.",
        "한쪽 발목을 반대쪽 무릎 위에 올립니다 (4자 다리).",
        "체중을 올린 다리 쪽 엉덩이에 싣고 위아래로 롤링합니다.",
        "통증이 심한 곳(트리거 포인트)에서 잠시 멈추어 호흡합니다.",
      ],
      caution: "너무 강한 자극보다는 시원한 느낌이 들 정도로 진행하세요.",
      tags: ["#힙업", "#좌골신경통"],
      targetCondition: [
        "sciatica",
        "stiff_glutes",
        "back_pain",
        "general_maintenance",
      ],
      bodyPart: "hip", // 엉덩이
    },
    {
      id: 4,
      type: "massage",
      category: "통증케어",
      title: "천장관절 마사지볼 케어",
      description:
        "엉치뼈 주변의 천장관절 부위를 마사지볼로 이완하여 묵직한 허리 통증을 해소합니다.",
      duration: "3분",
      difficulty: "중급",
      steps: [
        "바닥에 누워 무릎을 세웁니다.",
        "엉덩이 평평한 뼈(천골) 양옆 오목한 곳에 마사지볼을 둡니다.",
        "좌우로 골반을 살랑살랑 움직이며 마사지합니다.",
        "다리를 펴거나 한쪽 다리를 가슴으로 당기면 자극이 깊어집니다.",
      ],
      caution: "뼈를 직접 누르지 않도록 근육 부위에 위치시킵니다.",
      tags: ["#천장관절", "#허리디스크"],
      targetCondition: ["si_joint_pain", "back_pain", "pelvic_imbalance"],
      bodyPart: "waist", // 허리/천골
    },
    {
      id: 5,
      type: "stretching",
      category: "교정",
      title: "비둘기 자세 (Pigeon Pose)",
      description:
        "깊은 둔근 스트레칭으로 골반의 균형을 맞추고 하체 부종을 제거합니다.",
      duration: "5분",
      difficulty: "상급",
      steps: [
        "네발 기기 자세에서 오른쪽 무릎을 오른쪽 손목 뒤로 가져옵니다.",
        "오른발은 왼쪽 골반 쪽으로 보냅니다.",
        "왼쪽 다리는 뒤로 길게 뻗습니다.",
        "골반이 틀어지지 않게 정면을 유지하며 상체를 숙입니다.",
      ],
      caution:
        "무릎 통증 시 등을 대고 누워서 하는 변형 자세(4자 다리)로 대체하세요.",
      tags: ["#하체부종", "#골반교정"],
      targetCondition: ["swelling", "pelvic_imbalance", "sciatica"],
      bodyPart: "hip", // 엉덩이/골반측면
    },
    {
      id: 6,
      type: "massage",
      category: "이완",
      title: "내전근(허벅지 안쪽) 폼롤러",
      description:
        "타이트한 허벅지 안쪽 근육을 풀어주어 다리 라인을 정리하고 골반 순환을 돕습니다.",
      duration: "4분",
      difficulty: "초급",
      steps: [
        "엎드린 자세에서 한쪽 다리를 옆으로 90도 구부립니다(개구리 자세).",
        "허벅지 안쪽에 폼롤러를 세로로 둡니다.",
        "몸을 좌우로 움직이며 허벅지 안쪽을 롤링합니다.",
        "서혜부(팬티 라인) 가까운 곳까지 꼼꼼히 풀어줍니다.",
      ],
      caution: "림프절이 있는 부위이므로 부드럽게 진행하세요.",
      tags: ["#다리부종", "#혈액순환"],
      targetCondition: ["tight_adductors", "swelling", "general_maintenance"],
      bodyPart: "groin", // 서혜부/허벅지
    },
  ];

  const youtubeRecommendations = {
    back_pain: [
      {
        title: "허리 통증 싹 사라지는 골반 교정 루틴",
        channel: "피지컬 갤러리",
        duration: "12:30",
      },
      {
        title: "누워서 하는 허리 통증 완화 스트레칭",
        channel: "자세교정연구소",
        duration: "08:45",
      },
    ],
    anterior_tilt: [
      {
        title: "오리궁뎅이(전방경사) 교정 운동 Best 3",
        channel: "재활의 신",
        duration: "10:15",
      },
      {
        title: "똥배가 아니라 골반 문제? 전방경사 자가진단",
        channel: "바른체형TV",
        duration: "05:20",
      },
    ],
    sciatica: [
      {
        title: "좌골신경통 잡는 이상근 스트레칭",
        channel: "통증제로",
        duration: "15:00",
      },
      {
        title: "엉덩이 저림 해결하는 폼롤러 사용법",
        channel: "홈트마미",
        duration: "09:30",
      },
    ],
    swelling: [
      {
        title: "하체 부종 싹 빼는 10분 요가",
        channel: "요가 소년",
        duration: "10:00",
      },
      {
        title: "다리 붓기 빼는 림프 순환 마사지",
        channel: "뷰티 인사이드",
        duration: "07:45",
      },
    ],
    pelvic_imbalance: [
      {
        title: "틀어진 골반 자가교정 운동 (100만뷰)",
        channel: "소미핏",
        duration: "12:00",
      },
      {
        title: "골반 비대칭 교정하는 데일리 루틴",
        channel: "자세요정",
        duration: "08:00",
      },
    ],
    general_maintenance: [
      {
        title: "매일 하는 골반 교정 모닝 루틴",
        channel: "데일리 요가",
        duration: "15:00",
      },
      {
        title: "굳은 골반 풀어주는 5분 스트레칭",
        channel: "스트레칭 조이",
        duration: "05:00",
      },
    ],
  };

  const diagnosisQuestions = [
    {
      id: 1,
      question: "불편함을 느끼는 증상을 모두 선택해주세요.",
      options: [
        { text: "오래 앉아있으면 허리가 뻐근하다", value: "back_pain" },
        { text: "엉덩이 깊은 곳이 저리거나 당긴다", value: "sciatica" },
        { text: "다리가 자주 붓고 무겁다", value: "swelling" },
        { text: "치마나 바지가 한쪽으로 돌아간다", value: "pelvic_imbalance" },
      ],
    },
    {
      id: 2,
      question: "해당되는 평소 자세 습관을 모두 체크해주세요.",
      options: [
        { text: "엉덩이가 뒤로 빠져 오리궁뎅이 같다", value: "anterior_tilt" },
        { text: "다리를 꼬고 앉는 습관이 있다", value: "pelvic_imbalance" },
        {
          text: "한쪽 다리에 체중을 싣고 서 있는다",
          value: "pelvic_imbalance",
        },
        { text: "특별한 자세 문제는 모르겠다", value: "general_maintenance" },
      ],
    },
  ];

  // --- Components ---

  // Feature 4: Simple Calendar Component
  const HabitCalendar = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const todayStr = today.toISOString().split("T")[0];

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
        2,
        "0"
      )}-${String(d).padStart(2, "0")}`;
      const isCompleted = completedDates.includes(dateStr);
      const isToday = dateStr === todayStr;

      days.push(
        <div
          key={d}
          className="flex flex-col items-center justify-center h-10 relative"
        >
          <span
            className={`z-10 text-sm font-medium ${
              isCompleted
                ? "text-white"
                : isToday
                ? "text-teal-600 font-bold"
                : "text-stone-600"
            }`}
          >
            {d}
          </span>
          {isCompleted && (
            <div className="absolute inset-0 m-1 bg-teal-500 rounded-full animate-fade-in"></div>
          )}
          {!isCompleted && isToday && (
            <div className="absolute inset-0 m-1 border-2 border-teal-500 rounded-full opacity-50"></div>
          )}
        </div>
      );
    }

    return (
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg text-stone-800 flex items-center gap-2">
            <CalendarIcon className="text-teal-600" size={20} />
            {currentYear}년 {currentMonth + 1}월 습관 달력
          </h3>
          <span className="text-xs text-stone-500 bg-stone-100 px-2 py-1 rounded-full">
            이번 달{" "}
            {
              completedDates.filter((d) =>
                d.startsWith(
                  `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}`
                )
              ).length
            }
            일 완료
          </span>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
            <div key={d} className="text-xs font-bold text-stone-400">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{days}</div>
        <button
          onClick={toggleCompleteToday}
          className={`w-full mt-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
            ${
              completedDates.includes(todayStr)
                ? "bg-stone-100 text-stone-500"
                : "bg-teal-600 text-white hover:bg-teal-700 shadow-md"
            }`}
        >
          {completedDates.includes(todayStr) ? (
            <>
              <CheckCircle size={20} /> 오늘 운동 완료함
            </>
          ) : (
            <>
              <CheckSquare size={20} /> 오늘 운동 완료 체크하기
            </>
          )}
        </button>
      </div>
    );
  };

  // Feature 5: Body Map Component (Simplified SVG)
  const BodyMap = () => {
    return (
      <div className="relative w-full max-w-[280px] mx-auto aspect-[3/4] bg-stone-50 rounded-3xl overflow-hidden border border-stone-100 shadow-inner">
        <svg viewBox="0 0 200 300" className="w-full h-full">
          {/* Base Body Silhouette */}
          <path
            d="M60,40 Q100,20 140,40 Q160,80 150,120 Q170,160 160,200 L150,280 L110,240 L90,240 L50,280 L40,200 Q30,160 50,120 Q40,80 60,40 Z"
            fill="#e7e5e4"
            stroke="none"
          />

          {/* Clickable Zones */}
          {/* Waist / Lumbar */}
          <g
            onClick={() =>
              setBodyMapFilter(bodyMapFilter === "waist" ? null : "waist")
            }
            className="cursor-pointer transition-all hover:opacity-80"
          >
            <path
              d="M55,110 Q100,105 145,110 L140,140 Q100,145 60,140 Z"
              fill={bodyMapFilter === "waist" ? "#f97316" : "#fdba74"}
              opacity={bodyMapFilter === "waist" ? 1 : 0.6}
            />
            <text
              x="100"
              y="128"
              textAnchor="middle"
              fontSize="10"
              fill="white"
              fontWeight="bold"
            >
              허리
            </text>
          </g>

          {/* Hips / Glutes */}
          <g
            onClick={() =>
              setBodyMapFilter(bodyMapFilter === "hip" ? null : "hip")
            }
            className="cursor-pointer transition-all hover:opacity-80"
          >
            <path
              d="M45,145 Q20,160 40,200 L60,210 L90,160 Z"
              fill={bodyMapFilter === "hip" ? "#3b82f6" : "#93c5fd"}
              opacity={bodyMapFilter === "hip" ? 1 : 0.6}
            />
            <path
              d="M155,145 Q180,160 160,200 L140,210 L110,160 Z"
              fill={bodyMapFilter === "hip" ? "#3b82f6" : "#93c5fd"}
              opacity={bodyMapFilter === "hip" ? 1 : 0.6}
            />
            <text
              x="35"
              y="180"
              textAnchor="middle"
              fontSize="10"
              fill={bodyMapFilter === "hip" ? "white" : "#1e3a8a"}
              fontWeight="bold"
            >
              엉덩이
            </text>
            <text
              x="165"
              y="180"
              textAnchor="middle"
              fontSize="10"
              fill={bodyMapFilter === "hip" ? "white" : "#1e3a8a"}
              fontWeight="bold"
            >
              엉덩이
            </text>
          </g>

          {/* Groin / Adductors */}
          <g
            onClick={() =>
              setBodyMapFilter(bodyMapFilter === "groin" ? null : "groin")
            }
            className="cursor-pointer transition-all hover:opacity-80"
          >
            <circle
              cx="100"
              cy="180"
              r="25"
              fill={bodyMapFilter === "groin" ? "#14b8a6" : "#5eead4"}
              opacity={bodyMapFilter === "groin" ? 1 : 0.6}
            />
            <text
              x="100"
              y="183"
              textAnchor="middle"
              fontSize="10"
              fill={bodyMapFilter === "groin" ? "white" : "#134e4a"}
              fontWeight="bold"
            >
              서혜부
            </text>
          </g>
        </svg>
        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-stone-400">
          부위를 클릭하여 필터링
        </div>
      </div>
    );
  };

  const ExerciseTimer = () => {
    const [timeLeft, setTimeLeft] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
      let interval = null;
      if (isActive && timeLeft > 0) {
        interval = setInterval(() => {
          setTimeLeft((timeLeft) => timeLeft - 1);
        }, 1000);
      } else if (timeLeft === 0) {
        setIsActive(false);
      }
      return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    return (
      <div className="bg-stone-900 rounded-xl p-4 text-white flex flex-col items-center justify-center shadow-inner mt-4 sm:mt-0 sm:ml-4 sm:w-64">
        <div className="text-xs text-stone-400 mb-1 font-medium tracking-wider">
          EXERCISE TIMER
        </div>
        <div className="text-4xl font-mono font-bold text-teal-400 mb-4 tracking-wider">
          {formatTime(timeLeft)}
        </div>
        <div className="flex gap-2 w-full mb-3">
          <button
            onClick={() => {
              setTimeLeft(30);
              setIsActive(false);
            }}
            className="flex-1 bg-stone-700 hover:bg-stone-600 text-xs py-1.5 rounded transition-colors"
          >
            30초
          </button>
          <button
            onClick={() => {
              setTimeLeft(60);
              setIsActive(false);
            }}
            className="flex-1 bg-stone-700 hover:bg-stone-600 text-xs py-1.5 rounded transition-colors"
          >
            1분
          </button>
        </div>
        <div className="flex gap-2 w-full">
          <button
            onClick={() => setIsActive(!isActive)}
            disabled={timeLeft === 0}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1 font-bold transition-all
              ${
                timeLeft === 0
                  ? "bg-stone-800 text-stone-600 cursor-not-allowed"
                  : isActive
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : "bg-teal-600 hover:bg-teal-500 text-white"
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
              setIsActive(false);
              setTimeLeft(0);
            }}
            className="w-10 flex items-center justify-center bg-stone-700 hover:bg-stone-600 rounded-lg text-stone-300"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
    );
  };

  const Header = () => (
    <header className="bg-teal-700 text-white shadow-md sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setCurrentView("home")}
        >
          <Activity className="w-6 h-6" />
          <h1 className="text-xl font-bold tracking-wide">PelvicCare</h1>
        </div>
        <nav className="flex gap-2 sm:gap-6 text-sm font-medium">
          <button
            onClick={() => setCurrentView("home")}
            className={`px-3 py-1 rounded-full transition ${
              currentView === "home"
                ? "bg-teal-800 text-white font-bold"
                : "text-teal-100 hover:bg-teal-600"
            }`}
          >
            홈
          </button>
          <button
            onClick={() => setCurrentView("diagnosis")}
            className={`px-3 py-1 rounded-full transition ${
              currentView === "diagnosis"
                ? "bg-teal-800 text-white font-bold"
                : "text-teal-100 hover:bg-teal-600"
            }`}
          >
            자가진단
          </button>
          <button
            onClick={() => setCurrentView("my_routine")}
            className={`px-3 py-1 rounded-full transition flex items-center gap-1 ${
              currentView === "my_routine"
                ? "bg-teal-800 text-white font-bold"
                : "text-teal-100 hover:bg-teal-600"
            }`}
          >
            <Heart
              size={14}
              className={currentView === "my_routine" ? "fill-white" : ""}
            />{" "}
            내 루틴
          </button>
        </nav>
      </div>
    </header>
  );

  const HomeView = () => {
    // Filter logic: Tab + Body Map
    const filteredData = healthData.filter((item) => {
      const matchTab = activeTab === "all" || item.type === activeTab;
      const matchBody = bodyMapFilter ? item.bodyPart === bodyMapFilter : true;
      return matchTab && matchBody;
    });

    return (
      <>
        {/* Hero Section */}
        <section className="bg-teal-50 py-12 px-4 animate-fade-in">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-teal-900 mb-4">
                건강한 골반이
                <br />
                몸의 균형을 만듭니다
              </h2>
              <p className="text-stone-600 mb-8 leading-relaxed">
                통증 완화부터 체형 교정까지.
                <br />
                오른쪽 <b>바디 맵</b>에서 불편한 부위를 눌러보세요.
              </p>
              <div className="flex justify-center md:justify-start gap-3 flex-wrap">
                {["all", "stretching", "massage"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      activeTab === tab
                        ? "bg-teal-600 text-white shadow-lg"
                        : "bg-white text-stone-600 hover:bg-stone-100"
                    }`}
                  >
                    {tab === "all"
                      ? "전체"
                      : tab === "stretching"
                      ? "스트레칭"
                      : "마사지"}
                  </button>
                ))}
              </div>
            </div>
            {/* Feature 5: Body Map Visualization */}
            <div className="flex-shrink-0">
              <BodyMap />
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <main className="max-w-4xl mx-auto px-4 py-10">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-xl font-bold text-stone-800">
              {bodyMapFilter
                ? `${
                    bodyMapFilter === "waist"
                      ? "허리"
                      : bodyMapFilter === "hip"
                      ? "엉덩이"
                      : "고관절/서혜부"
                  } 집중 케어`
                : "추천 운동 리스트"}
            </h3>
            {bodyMapFilter && (
              <button
                onClick={() => setBodyMapFilter(null)}
                className="text-xs bg-stone-200 hover:bg-stone-300 px-2 py-1 rounded-full text-stone-600 flex items-center gap-1"
              >
                <X size={12} /> 필터 해제
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all cursor-pointer border border-stone-100 overflow-hidden group relative"
              >
                {/* Heart Button on Card */}
                <button
                  onClick={(e) => toggleSave(item.id, e)}
                  className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white text-stone-400 hover:text-red-500 transition shadow-sm"
                >
                  <Heart
                    size={18}
                    className={
                      savedItems.includes(item.id)
                        ? "fill-red-500 text-red-500"
                        : ""
                    }
                  />
                </button>

                <div
                  className={`h-2 w-full ${
                    item.type === "stretching" ? "bg-orange-200" : "bg-blue-200"
                  }`}
                ></div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-md font-semibold ${
                        item.type === "stretching"
                          ? "bg-orange-50 text-orange-600"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {item.type === "stretching" ? "스트레칭" : "마사지"}
                    </span>
                    <span className="text-xs text-stone-400 font-medium flex items-center gap-1">
                      <Clock size={12} /> {item.duration}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-stone-800 mb-2 group-hover:text-teal-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-stone-500 text-sm line-clamp-2 mb-4">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center text-xs text-stone-500 mt-auto pt-4 border-t border-stone-100">
                    <div className="flex items-center gap-1">
                      <BarChart size={12} />
                      <span>{item.difficulty}</span>
                    </div>
                    <div className="flex items-center text-teal-600 font-medium">
                      자세히 보기 <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredData.length === 0 && (
              <div className="col-span-full text-center py-10 text-stone-400 bg-stone-50 rounded-xl border border-dashed border-stone-200">
                선택한 조건에 맞는 운동이 없습니다.
              </div>
            )}
          </div>
        </main>
      </>
    );
  };

  // Feature 2: My Routine View
  const MyRoutineView = () => {
    const myExercises = healthData.filter((item) =>
      savedItems.includes(item.id)
    );

    return (
      <div className="max-w-4xl mx-auto px-4 py-10 animate-fade-in">
        <div className="flex items-center gap-2 mb-8">
          <Heart className="text-red-500 fill-red-500" size={28} />
          <h2 className="text-2xl font-bold text-stone-800">
            나의 루틴 & 습관
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column: Calendar */}
          <div className="md:col-span-1">
            <HabitCalendar />
          </div>

          {/* Right Column: Saved List */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-bold text-lg text-stone-800 mb-4 flex items-center gap-2">
              <Activity size={20} className="text-teal-600" /> 저장한 운동 (
              {myExercises.length})
            </h3>

            {myExercises.length === 0 ? (
              <div className="bg-stone-50 border border-dashed border-stone-200 rounded-2xl p-8 text-center text-stone-500">
                <p className="mb-4">아직 저장된 루틴이 없습니다.</p>
                <button
                  onClick={() => setCurrentView("home")}
                  className="text-teal-600 font-bold hover:underline"
                >
                  운동 찾아보기
                </button>
              </div>
            ) : (
              myExercises.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="bg-white p-4 rounded-xl border border-stone-100 shadow-sm hover:shadow-md cursor-pointer transition flex gap-4 items-center group relative"
                >
                  <button
                    onClick={(e) => toggleSave(item.id, e)}
                    className="absolute top-2 right-2 p-1.5 text-stone-300 hover:text-red-500 transition"
                    title="저장 취소"
                  >
                    <X size={16} />
                  </button>

                  <div
                    className={`w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform ${
                      item.type === "stretching"
                        ? "bg-orange-100 text-orange-500"
                        : "bg-blue-100 text-blue-500"
                    }`}
                  >
                    <PlayCircle size={24} />
                  </div>
                  <div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.type === "stretching"
                          ? "bg-orange-50 text-orange-600"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {item.type === "stretching" ? "스트레칭" : "마사지"}
                    </span>
                    <h4 className="font-bold text-stone-800 mt-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-stone-500 mt-1">
                      {item.duration} • {item.difficulty}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  const DiagnosisView = () => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [resultData, setResultData] = useState(null);

    const toggleAnswer = (questionId, value) => {
      const currentSelection = answers[questionId] || [];
      let newSelection;
      if (currentSelection.includes(value)) {
        newSelection = currentSelection.filter((item) => item !== value);
      } else {
        newSelection = [...currentSelection, value];
      }
      setAnswers({ ...answers, [questionId]: newSelection });
    };

    const handleNext = () => {
      if (step < diagnosisQuestions.length) {
        setStep(step + 1);
      } else {
        analyzeResult(answers);
        setStep(step + 1);
      }
    };

    const analyzeResult = (finalAnswers) => {
      const allSelectedConditions = Object.values(finalAnswers).flat();
      if (allSelectedConditions.length === 0)
        allSelectedConditions.push("general_maintenance");
      const uniqueConditions = [...new Set(allSelectedConditions)];
      setResultData({ conditions: uniqueConditions });
    };

    const resetDiagnosis = () => {
      setStep(0);
      setAnswers({});
      setResultData(null);
    };

    if (step === 0) {
      return (
        <div className="max-w-2xl mx-auto px-4 py-16 text-center animate-fade-in">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-teal-100">
            <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Activity size={32} />
            </div>
            <h2 className="text-2xl font-bold text-teal-900 mb-4">
              내 골반 상태 체크하기
            </h2>
            <p className="text-stone-600 mb-8">
              현재 불편한 부위와 평소 자세 습관을 체크해주시면
              <br />
              복합적인 증상을 분석해 맞춤형 루틴을 제안합니다.
            </p>
            <button
              onClick={() => setStep(1)}
              className="bg-teal-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-teal-700 transition-all shadow-md flex items-center gap-2 mx-auto"
            >
              자가진단 시작하기 <ArrowRight size={20} />
            </button>
          </div>
        </div>
      );
    }

    if (step <= diagnosisQuestions.length) {
      const currentQuestion = diagnosisQuestions[step - 1];
      const currentSelections = answers[currentQuestion.id] || [];
      const hasSelection = currentSelections.length > 0;

      return (
        <div className="max-w-xl mx-auto px-4 py-16 animate-fade-in">
          <div className="mb-6 flex justify-between text-sm text-stone-500 font-medium">
            <span>Question {step}</span>
            <span>
              {step} / {diagnosisQuestions.length}
            </span>
          </div>
          <div className="h-2 bg-stone-100 rounded-full mb-8">
            <div
              className="h-full bg-teal-500 rounded-full transition-all duration-500"
              style={{ width: `${(step / diagnosisQuestions.length) * 100}%` }}
            ></div>
          </div>
          <h2 className="text-2xl font-bold text-stone-800 mb-2 leading-snug">
            {currentQuestion.question}
          </h2>
          <p className="text-stone-500 text-sm mb-8">
            해당되는 항목을 모두 선택해주세요.
          </p>
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = currentSelections.includes(option.value);
              return (
                <button
                  key={idx}
                  onClick={() => toggleAnswer(currentQuestion.id, option.value)}
                  className={`w-full text-left p-4 rounded-xl border transition-all group flex items-center gap-3
                    ${
                      isSelected
                        ? "border-teal-500 bg-teal-50 text-teal-900 ring-1 ring-teal-500"
                        : "border-stone-200 hover:border-teal-300 text-stone-700"
                    }`}
                >
                  <div
                    className={`flex-shrink-0 ${
                      isSelected ? "text-teal-600" : "text-stone-300"
                    }`}
                  >
                    {isSelected ? (
                      <CheckSquare size={24} />
                    ) : (
                      <Square size={24} />
                    )}
                  </div>
                  <span className="font-medium">{option.text}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              disabled={!hasSelection}
              className={`px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all
                ${
                  hasSelection
                    ? "bg-teal-600 text-white hover:bg-teal-700 shadow-md"
                    : "bg-stone-200 text-stone-400 cursor-not-allowed"
                }`}
            >
              {step === diagnosisQuestions.length ? "결과 보기" : "다음"}{" "}
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      );
    }

    if (step > diagnosisQuestions.length && resultData) {
      return (
        <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 px-4 py-1 rounded-full text-sm font-bold mb-4">
              <CheckCircle size={16} /> 진단 완료
            </div>
            <h2 className="text-3xl font-bold text-stone-800 mb-2">
              진단 결과 분석
            </h2>
            <p className="text-stone-500">
              선택하신 각 증상에 대한 원인 분석과 맞춤 솔루션입니다.
            </p>
          </div>
          <div className="space-y-12">
            {resultData.conditions.map((condition) => {
              const exercises = healthData.filter((item) =>
                item.targetCondition.includes(condition)
              );
              const videos =
                youtubeRecommendations[condition] ||
                youtubeRecommendations["general_maintenance"];
              const explanation = conditionExplanations[condition];
              const title = conditionTitles[condition] || "골반 건강 케어";

              return (
                <div
                  key={condition}
                  className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden"
                >
                  <div className="bg-teal-50/50 p-6 sm:p-8 border-b border-stone-100">
                    <h3 className="flex items-center gap-2 text-xl font-bold text-teal-800 mb-4">
                      <Stethoscope size={24} className="text-teal-600" />
                      {title}
                    </h3>
                    <div className="flex gap-4 text-stone-700 bg-white p-4 rounded-xl items-start shadow-sm border border-stone-100">
                      <div className="flex-shrink-0 w-2 h-2 bg-teal-500 rounded-full mt-2.5"></div>
                      <p className="leading-relaxed font-medium">
                        {explanation}
                      </p>
                    </div>
                  </div>
                  <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-stone-100">
                    <div className="p-6 sm:p-8">
                      <h4 className="flex items-center gap-2 text-lg font-bold text-stone-600 mb-4 pb-2">
                        <Activity className="text-teal-600" /> 추천 가이드
                      </h4>
                      <div className="space-y-4">
                        {exercises.length > 0 ? (
                          exercises.map((item) => (
                            <div
                              key={item.id}
                              onClick={() => setSelectedItem(item)}
                              className="bg-white p-4 rounded-xl border border-stone-100 shadow-sm hover:shadow-md cursor-pointer transition flex gap-4 items-center group relative"
                            >
                              <button
                                onClick={(e) => toggleSave(item.id, e)}
                                className="absolute top-2 right-2 p-1 rounded-full text-stone-300 hover:text-red-500 transition z-10"
                              >
                                <Heart
                                  size={16}
                                  className={
                                    savedItems.includes(item.id)
                                      ? "fill-red-500 text-red-500"
                                      : ""
                                  }
                                />
                              </button>
                              <div
                                className={`w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform ${
                                  item.type === "stretching"
                                    ? "bg-orange-100 text-orange-500"
                                    : "bg-blue-100 text-blue-500"
                                }`}
                              >
                                <PlayCircle size={20} />
                              </div>
                              <div>
                                <span
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                    item.type === "stretching"
                                      ? "bg-orange-50 text-orange-600"
                                      : "bg-blue-50 text-blue-600"
                                  }`}
                                >
                                  {item.type === "stretching"
                                    ? "스트레칭"
                                    : "마사지"}
                                </span>
                                <h4 className="font-bold text-stone-800 mt-1 text-sm">
                                  {item.title}
                                </h4>
                                <p className="text-xs text-stone-500 mt-1">
                                  {item.duration} • {item.difficulty}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-stone-400">
                            해당 증상에 특화된 가이드가 곧 추가될 예정입니다.
                            기본 스트레칭을 참고해주세요.
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="p-6 sm:p-8 bg-stone-50/30">
                      <h4 className="flex items-center gap-2 text-lg font-bold text-stone-600 mb-4 pb-2">
                        <Youtube className="text-red-600" /> 관련 영상
                      </h4>
                      <div className="space-y-4">
                        {videos.map((video, idx) => (
                          <div
                            key={idx}
                            className="bg-white p-4 rounded-xl border border-stone-100 shadow-sm hover:border-red-200 transition group"
                          >
                            <div className="flex gap-4">
                              <div className="w-16 h-12 bg-stone-200 rounded-lg flex-shrink-0 flex items-center justify-center group-hover:bg-red-50 transition-colors">
                                <Youtube
                                  size={20}
                                  className="text-stone-400 group-hover:text-red-500"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-stone-800 text-xs sm:text-sm line-clamp-1 leading-tight mb-1 truncate">
                                  {video.title}
                                </h4>
                                <div className="flex justify-between items-center text-[10px] sm:text-xs text-stone-500">
                                  <span className="truncate pr-2">
                                    {video.channel}
                                  </span>
                                  <span className="bg-stone-100 px-1.5 py-0.5 rounded flex-shrink-0">
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
              );
            })}
          </div>
          <div className="mt-12 text-center">
            <button
              onClick={resetDiagnosis}
              className="text-stone-500 hover:text-teal-600 font-medium flex items-center justify-center gap-2 mx-auto transition"
            >
              <RefreshCw size={16} /> 다시 진단하기
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800">
      <Header />

      {currentView === "home" && <HomeView />}
      {currentView === "diagnosis" && <DiagnosisView />}
      {currentView === "my_routine" && <MyRoutineView />}

      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors z-10"
            >
              <X size={20} className="text-stone-600" />
            </button>

            <div
              className={`h-40 w-full flex items-center justify-center relative ${
                selectedItem.type === "stretching"
                  ? "bg-orange-50"
                  : "bg-blue-50"
              }`}
            >
              <PlayCircle
                size={48}
                className={`opacity-50 ${
                  selectedItem.type === "stretching"
                    ? "text-orange-400"
                    : "text-blue-400"
                }`}
              />
              <button
                onClick={(e) => toggleSave(selectedItem.id, e)}
                className="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-stone-600 text-sm font-medium shadow transition"
              >
                <Heart
                  size={16}
                  className={
                    savedItems.includes(selectedItem.id)
                      ? "fill-red-500 text-red-500"
                      : ""
                  }
                />
                {savedItems.includes(selectedItem.id) ? "저장됨" : "루틴 저장"}
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex gap-2 mb-2">
                    {selectedItem.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs text-teal-600 bg-teal-50 px-2 py-1 rounded-md font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-bold text-stone-800 mb-2">
                    {selectedItem.title}
                  </h2>
                  <p className="text-stone-600 leading-relaxed text-sm">
                    {selectedItem.description}
                  </p>
                </div>

                <ExerciseTimer />
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="flex items-center gap-2 font-bold text-stone-800 mb-3 text-lg">
                    <Activity size={18} className="text-teal-600" /> 운동 방법
                  </h4>
                  <ol className="space-y-3">
                    {selectedItem.steps.map((step, idx) => (
                      <li
                        key={idx}
                        className="flex gap-3 text-stone-700 bg-stone-50 p-3 rounded-lg text-sm"
                      >
                        <span className="flex-shrink-0 w-5 h-5 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                  <h4 className="flex items-center gap-2 font-bold text-red-700 mb-2 text-sm">
                    <AlertCircle size={16} /> 주의사항
                  </h4>
                  <p className="text-red-600 text-sm">{selectedItem.caution}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-stone-900 text-stone-400 py-8 px-4 mt-auto">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="flex justify-center items-center gap-2 text-white font-bold text-lg">
            <Activity className="w-5 h-5" /> PelvicCare
          </div>
          <p className="text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            본 사이트에서 제공하는 정보는 일반적인 건강 증진을 위한 것이며,
            전문적인 의학적 조언을 대체할 수 없습니다. 심한 통증이나 부상이 있는
            경우 반드시 전문 의료진과 상담하세요.
          </p>
          <div className="pt-4 text-xs text-stone-600 border-t border-stone-800">
            © 2024 PelvicCare. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PelvicHealthApp;
