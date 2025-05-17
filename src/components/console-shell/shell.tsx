import { FC, useEffect, useRef } from 'react'

export const ConsoleShell: FC = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.innerText = '> Console ready...\n'
    }
  }, [])

  return <div ref={ref} style={{ whiteSpace: 'pre-wrap' }} />
}
