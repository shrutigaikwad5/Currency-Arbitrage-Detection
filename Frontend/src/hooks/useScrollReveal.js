import { useEffect, useState } from 'react'

export function useScrollReveal() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), 120)
    return () => window.clearTimeout(timer)
  }, [])

  return isVisible
}
