import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Front from './Front'
import Onboarding from './Onboarding'
import { Routes, Route } from "react-router-dom"; 
import Template from './Template'
import Help from './Help'
import ATS from './ATS'
import FinaleSlide from './FinaleSlide'

function App() {
 



  return (
    <>
     <Routes>
      <Route path="/" element={<Front />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/templateinfo" element={<Template />} />
      <Route path="/help" element={<Help />} />
      <Route path="/ats" element={<ATS />} />
   
    </Routes>
     
    </>
  )
}

export default App
