import React from 'react'
import './App.css'
import { TableBase } from 'package/components'

// Define the structure of columns, which will dictate the keys of the data.

// Define the data structure that follows the keys specified in the columns.

const App: React.FC = () => {
  return (
    <div className='p-4 bg-red-200'>
      <h1 className='text-2xl font-bold mb-4'>Custom Table Example</h1>
      <TableBase columns={[]} data={[]} />
    </div>
  )
}

export default App
