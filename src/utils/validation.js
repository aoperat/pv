/**
 * 입력값 검증 유틸리티
 */

/**
 * 닉네임 검증
 * @param {string} nickname - 검증할 닉네임
 * @returns {{valid: boolean, error?: string, value?: string}}
 */
export const validateNickname = (nickname) => {
  if (!nickname) {
    return { valid: true } // 선택 필드
  }

  const trimmed = nickname.trim()

  if (trimmed.length < 2) {
    return { valid: false, error: '닉네임은 최소 2자 이상이어야 합니다.' }
  }

  if (trimmed.length > 20) {
    return { valid: false, error: '닉네임은 최대 20자까지 가능합니다.' }
  }

  // 한글, 영문, 숫자, 밑줄만 허용
  if (!/^[가-힣a-zA-Z0-9_\s]+$/.test(trimmed)) {
    return {
      valid: false,
      error: '닉네임은 한글, 영문, 숫자, 밑줄(_)만 사용할 수 있습니다.',
    }
  }

  return { valid: true, value: trimmed }
}

/**
 * 비밀번호 검증
 * @param {string} password - 검증할 비밀번호
 * @returns {{valid: boolean, error?: string, errors?: string[]}}
 */
export const validatePassword = (password) => {
  const errors = []

  if (!password) {
    return { valid: false, error: '비밀번호를 입력해주세요.' }
  }

  if (password.length < 8) {
    errors.push('8자 이상')
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('대문자 포함')
  }

  if (!/[a-z]/.test(password)) {
    errors.push('소문자 포함')
  }

  if (!/[0-9]/.test(password)) {
    errors.push('숫자 포함')
  }

  if (errors.length > 0) {
    return {
      valid: false,
      error: `비밀번호 조건: ${errors.join(', ')}`,
      errors,
    }
  }

  return { valid: true }
}

/**
 * 이메일 검증
 * @param {string} email - 검증할 이메일
 * @returns {{valid: boolean, error?: string}}
 */
export const validateEmail = (email) => {
  if (!email) {
    return { valid: false, error: '이메일을 입력해주세요.' }
  }

  const trimmed = email.trim().toLowerCase()

  // 기본 이메일 형식 검증
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: '올바른 이메일 형식이 아닙니다.' }
  }

  return { valid: true, value: trimmed }
}

/**
 * 운동 ID 검증
 * @param {any} id - 검증할 ID
 * @returns {{valid: boolean, error?: string, value?: number}}
 */
export const validateExerciseId = (id) => {
  const numId = parseInt(id, 10)

  if (isNaN(numId) || numId < 1 || numId > 1000) {
    return { valid: false, error: '유효하지 않은 운동 ID입니다.' }
  }

  return { valid: true, value: numId }
}

/**
 * 비밀번호 강도 계산
 * @param {string} password - 비밀번호
 * @returns {'weak' | 'medium' | 'strong'}
 */
export const getPasswordStrength = (password) => {
  if (!password) return 'weak'

  let score = 0

  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 2) return 'weak'
  if (score <= 4) return 'medium'
  return 'strong'
}
