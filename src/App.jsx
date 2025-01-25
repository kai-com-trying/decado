import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'
import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom'
import HomePage from './pages/HomePage'
import FrameworksPage from './pages/FrameworksPage'
import Root from './components/Root'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root />} >
    <Route index element={<HomePage />} />
    <Route path="frameworks" element={<FrameworksPage />} />
  </Route>
))

function App() {
  
  return (

      <RouterProvider router={router} />

  )
}

export default App
