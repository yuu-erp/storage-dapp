import { getAllWallets } from '@core/coreNative'
import ErrorReady from '@package/components/shared/ErrorReady'
import useReady from '@package/hooks/useReady'
import React, { useEffect } from 'react'

export default function App() {
  const { isReady } = useReady()
  
  const getAllWallet = async () => {
    try {
      const data = await getAllWallets()
      console.log('getAllWallet - data: ', data)
    } catch (error) {
      console.log('getAllWallet - error: ', error)
    }
  }

  useEffect(() => {
    getAllWallet()
  }, [])

  return isReady ? (
    <React.Fragment>
      <div style={{ width: '100vw', height: '100vh', background: 'white' }}>
        Home Page | App
      </div>
    </React.Fragment>
  ) : (
    <ErrorReady />
  )
}
