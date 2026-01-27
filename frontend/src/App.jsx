
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>PULSI Dashboard</h1>} />
        <Route path="/mentions" element={<h1>Mentions</h1>} />
        <Route path="/csr" element={<h1>CSR Tracker</h1>} />
      </Routes>
    </BrowserRouter>
  )
}
