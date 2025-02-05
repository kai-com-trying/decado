import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import FrameworksPage from './pages/FrameworksPage/FrameworksPage'
import StockDetail from './pages/StockDetailPage/StockDetail'
import Root from './components/Root'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root />} >
    <Route index element={<HomePage />} />
    <Route path="frameworks" element={<FrameworksPage />} />
    {/* <Route path="stocks" element={<StocksPage />} /> */}
    <Route path='stocks/:ticker' element={<StockDetail />} />
  </Route>
))

function App() {
  
  return (

      <RouterProvider router={router} />

  )
}

export default App
