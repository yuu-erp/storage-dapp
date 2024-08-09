import React from 'react'

export default function ErrorReady() {
  return (
    <React.Fragment>
      <div
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#000',
          fontSize: '24px',
          textAlign: 'center'
        }}
      >
        Error: The app is not ready yet. Please try again later.
      </div>
    </React.Fragment>
  )
}
