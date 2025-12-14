// 자가진단 질문
export const diagnosisQuestions = [
  {
    id: 1,
    question: '가장 불편한 증상을 선택해주세요.',
    options: [
      { text: '오래 앉아있으면 허리가 뻐근하다', value: 'back_pain' },
      { text: '엉덩이 깊은 곳이 저리거나 당긴다', value: 'sciatica' },
      { text: '다리가 자주 붓고 무겁다', value: 'swelling' },
      { text: '치마나 바지가 한쪽으로 돌아간다', value: 'pelvic_imbalance' },
    ],
  },
  {
    id: 2,
    question: '평소 자세 습관을 체크해주세요.',
    options: [
      { text: '엉덩이가 뒤로 빠져 오리궁뎅이 같다', value: 'anterior_tilt' },
      { text: '다리를 꼬고 앉는 습관이 있다', value: 'pelvic_imbalance' },
      {
        text: '한쪽 다리에 체중을 싣고 서 있는다',
        value: 'pelvic_imbalance',
      },
      { text: '특별한 자세 문제는 모르겠다', value: 'general_maintenance' },
    ],
  },
]
