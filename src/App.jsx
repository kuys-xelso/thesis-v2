import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, RouterProvider } from 'react-router-dom'
import './App.css'


import {router} from './services/Router.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (


   <RouterProvider router={router}/>


    // <>
    //   {/* <h1 className='text-5xl text-center p-16 font-bold font-sans '> Student Billing Management System</h1>
    //   <Button variant="default">Button</Button> */}
    //   {/* <LoginPage /> */}
    //   <Dashboard />

    // </>
  )
}

export default App
 