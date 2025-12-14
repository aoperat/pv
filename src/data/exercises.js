// 운동 데이터
export const exercises = [
  {
    id: 1,
    type: 'stretching',
    category: '유연성',
    title: '나비 자세 (Baddha Konasana)',
    description:
      '골반과 고관절을 열어주어 혈액순환을 돕고 생리통 완화에 효과적인 자세입니다.',
    duration: '3분',
    difficulty: '초급',
    steps: [
      '바닥에 앉아 두 발바닥을 서로 마주 대고 끌어당깁니다.',
      '양손으로 발을 잡고 척추를 위로 길게 뽑아 올리듯 폅니다.',
      '내쉬는 숨에 상체를 천천히 앞으로 숙여 고관절을 자극합니다.',
      '무리하지 않고 가능한 만큼만 내려가 30초 유지합니다.',
    ],
    caution:
      '무릎에 통증이 있다면 발을 몸에서 조금 멀리 두어 각도를 조절하세요.',
    tags: ['#순환개선', '#고관절이완'],
    targetCondition: ['stiff_hip', 'period_pain', 'general_maintenance'],
    bodyPart: 'groin',
  },
  {
    id: 2,
    type: 'stretching',
    category: '교정',
    title: '장요근 런지 스트레칭',
    description:
      '오래 앉아있는 현대인의 단축된 장요근을 늘려 골반 전방경사를 예방합니다.',
    duration: '5분',
    difficulty: '중급',
    steps: [
      '런지 자세를 취하듯 한쪽 발을 앞으로, 반대쪽 다리는 뒤로 뻗어 무릎을 바닥에 댑니다.',
      '골반을 앞쪽 아래로 지긋이 눌러 뒷다리 앞쪽을 늘려줍니다.',
      '상체는 곧게 세우고 배꼽을 등 쪽으로 당겨 허리가 꺾이지 않게 합니다.',
      '양쪽 각각 30초씩 반복하여 좌우 균형을 맞춥니다.',
    ],
    caution:
      '허리를 과도하게 젖히지 않도록 복부에 힘을 유지하는 것이 핵심입니다.',
    tags: ['#허리통증', '#전방경사교정'],
    targetCondition: ['back_pain', 'anterior_tilt'],
    bodyPart: 'waist',
  },
  {
    id: 3,
    type: 'massage',
    category: '이완',
    title: '둔근(엉덩이) 폼롤러 릴리즈',
    description:
      '굳어있는 엉덩이 근육을 풀어주어 좌골신경통 예방과 골반 가동성을 확보합니다.',
    duration: '5분',
    difficulty: '초급',
    steps: [
      '폼롤러 위에 엉덩이를 대고 앉아 중심을 잡습니다.',
      '한쪽 발목을 반대쪽 무릎 위에 올려 4자 모양을 만듭니다.',
      '체중을 올린 다리 쪽 엉덩이에 싣고 위아래로 부드럽게 롤링합니다.',
      '특히 아픈 부위(트리거 포인트)에서 10초간 정지하여 깊게 호흡합니다.',
    ],
    caution:
      '너무 강한 자극보다는 "시원하다"는 느낌이 들 정도로 강도를 조절하세요.',
    tags: ['#힙업기초', '#통증완화'],
    targetCondition: ['sciatica', 'stiff_glutes', 'back_pain', 'general_maintenance'],
    bodyPart: 'hip',
  },
  {
    id: 4,
    type: 'massage',
    category: '통증케어',
    title: '천장관절 마사지볼 케어',
    description:
      '엉치뼈 주변의 천장관절 부위를 마사지볼로 이완하여 묵직한 허리 통증을 해소합니다.',
    duration: '3분',
    difficulty: '중급',
    steps: [
      '바닥에 누워 무릎을 세우고 편안하게 호흡합니다.',
      '엉덩이 평평한 뼈(천골) 양옆 오목한 곳에 마사지볼을 위치시킵니다.',
      '골반을 좌우로 살랑살랑 움직이며 뭉친 근막을 이완합니다.',
      '다리를 펴거나 한쪽 다리를 가슴으로 당기면 더 깊은 자극을 줄 수 있습니다.',
    ],
    caution:
      '뼈를 직접 누르지 않도록 근육과 인대 부위에 정확히 위치시킵니다.',
    tags: ['#천장관절', '#허리디스크'],
    targetCondition: ['si_joint_pain', 'back_pain', 'pelvic_imbalance'],
    bodyPart: 'waist',
  },
  {
    id: 5,
    type: 'stretching',
    category: '교정',
    title: '비둘기 자세 (Pigeon Pose)',
    description:
      '깊은 둔근 스트레칭으로 골반의 균형을 맞추고 하체 부종을 효과적으로 제거합니다.',
    duration: '5분',
    difficulty: '상급',
    steps: [
      '네발 기기 자세에서 오른쪽 무릎을 오른쪽 손목 뒤로 가져옵니다.',
      '오른발은 왼쪽 골반 쪽으로 보내고, 왼쪽 다리는 뒤로 길게 뻗습니다.',
      '골반이 한쪽으로 기울지 않게 정면을 유지하며 상체를 앞으로 숙입니다.',
      '양쪽 엉덩이의 높이를 맞추는 것에 집중하며 호흡합니다.',
    ],
    caution:
      '무릎 통증 시 등을 대고 누워서 하는 변형 자세(4자 다리)로 대체하세요.',
    tags: ['#하체부종', '#골반교정'],
    targetCondition: ['swelling', 'pelvic_imbalance', 'sciatica'],
    bodyPart: 'hip',
  },
  {
    id: 6,
    type: 'massage',
    category: '이완',
    title: '내전근(허벅지 안쪽) 폼롤러',
    description:
      '타이트한 허벅지 안쪽 근육을 풀어주어 다리 라인을 정리하고 골반 순환을 돕습니다.',
    duration: '4분',
    difficulty: '초급',
    steps: [
      '엎드린 자세에서 한쪽 다리를 옆으로 90도 구부립니다(개구리 자세).',
      '허벅지 안쪽에 폼롤러를 세로로 두고 체중을 실어 누릅니다.',
      '몸을 좌우로 움직이며 무릎부터 서혜부까지 꼼꼼히 롤링합니다.',
      '서혜부(팬티 라인) 가까운 곳은 림프절이 모여있으므로 부드럽게 풀어줍니다.',
    ],
    caution: '림프절이 있는 부위이므로 멍이 들지 않게 부드럽게 진행하세요.',
    tags: ['#다리부종', '#혈액순환'],
    targetCondition: ['tight_adductors', 'swelling', 'general_maintenance'],
    bodyPart: 'groin',
  },
]
