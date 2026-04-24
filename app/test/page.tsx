import React from 'react'

function Test() {
  return (
    <div className='min-w-screen bg-gray-500 min-h-screen '>
     <p className='text-4xl font-bold text-white '> Tailwind-css Container </p>
     
     {/* space-x-4 example: Ye buttons ke beech mein 1rem (16px) ka gap daal dega */}
     <div className="flex space-x-4 p-4 bg-white mb-4">
       <button className="bg-blue-500 p-2">Button 1</button>
       <button className="bg-blue-500 p-2">Button 2</button>
       <button className="bg-blue-500 p-2">Button 3</button>
     </div>

     <div className='p-6 lg:bg-white md:bg-gray-900 sm:bg-green-300 rounded-lg'>
       <p className='text-2xl  '> This content illustrate that screen size chages based on the screen size sm,md,lg breakpoints</p>
     </div>

    </div>
  )
}

export default Test