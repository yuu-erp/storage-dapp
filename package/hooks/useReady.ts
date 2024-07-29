import { useEffect, useState } from 'react'
import { SystemCore } from '../../core/SystemCore'

export default function useReady() {
  const [isReady, setIsReady] = useState(SystemCore.isReady)
  useEffect(() => {
    const handleReady = () => setIsReady(SystemCore.isReady)
    SystemCore.on('ready', handleReady)
    return () => SystemCore.removeEventListener('ready', handleReady)
  }, [])
  return { isReady }
}
