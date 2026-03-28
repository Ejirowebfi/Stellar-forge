import { useState, useCallback, useRef, useEffect } from 'react'

/**
 * Hook to copy text to the clipboard with fallback for older browsers
 * @param resetDelay Time in ms after which 'copied' state resets to false (default 2000)
 * @returns { copy(text: string): void, copied: boolean }
 */
export const useClipboard = (resetDelay = 2000) => {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const fallbackCopy = (text: string) => {
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-9999px'
    textArea.style.top = '0'
    document.body.appendChild(textArea)

    textArea.focus()
    textArea.select()

    const successful = document.execCommand?.('copy')
    document.body.removeChild(textArea)

    return Boolean(successful)
  }

  const copy = useCallback(
    async (text: string) => {
      if (!text) return

      try {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }

        let copiedSuccessfully = false

        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text)
          copiedSuccessfully = true
        } else if (typeof document !== 'undefined') {
          copiedSuccessfully = fallbackCopy(text)
        }

        setCopied(copiedSuccessfully)

        timeoutRef.current = setTimeout(() => {
          setCopied(false)
          timeoutRef.current = null
        }, resetDelay)
      } catch {
        setCopied(false)
      }
    },
    [resetDelay],
  )

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return { copied, copy }
}
