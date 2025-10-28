import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from  "./pages/Home"
import Doctors from './pages/Doctors'
import Login from './pages/Login/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import MyAppointment from './pages/MyAppointment' 
import Appointment from './pages/Appointment'
import NavBar from './components/NavBar/NavBar'
import Setting from './pages/Setting'
import { useThemeStore } from './store/useThemeStore'
import Footer from './components/Footer/Footer'
import MedGenAi from './components/Ai/MedGenAi'
import Signup from './pages/Signup/Signup'
import { useAuthStore } from './Store/useAuthStore'
import Moniter from './pages/Moniter/moniter'
import MedicineStore from './pages/MedicineStore/MedicineStore'

const App = () => {

  const {theme} = useThemeStore();
  const { user } = useAuthStore();

  return (
    <div className='min-h-screen relative w-full pt-17' data-theme={theme}>
      <NavBar />
      {user && <MedGenAi />}
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/login" element={ <Login /> } />
        <Route path="/signup" element={ <Signup /> } />
        <Route path="/doctors" element={ <Doctors /> } />
        <Route path="/doctors/:speciality" element={ <Doctors /> } />
        <Route path="/about" element={ <About /> } />
        <Route path="/store" element={ <MedicineStore /> } />
        <Route path="/contact" element={ <Contact /> } />
        <Route path="/my-profile" element={<Profile />} />
        <Route path="/my-appointment" element={ <MyAppointment /> } />
        <Route path="/appointment/:docId" element={ <Appointment /> } />
        <Route path="/setting" element={ <Setting /> } />
        <Route path="/moniter" element={ <Moniter /> } />
        <Route path="/moniter/:subpage" element={ <Moniter /> } />
      </Routes>
    </div>
  )
}

export default App