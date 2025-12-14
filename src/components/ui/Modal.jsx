import React, { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

export const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null)
  const previousFocus = useRef(null)

  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement
      modalRef.current?.focus()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
      previousFocus.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        ref={modalRef}
        tabIndex={-1}
        className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl relative outline-none"
      >
        {title && (
          <h2 id="modal-title" className="sr-only">
            {title}
          </h2>
        )}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full transition-colors z-20 backdrop-blur-md"
          aria-label="닫기"
        >
          <X size={20} className="text-stone-800" />
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
