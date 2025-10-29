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
import { useCartStore } from './Store/useCartStore'
import Moniter from './pages/Moniter/moniter'
import MedicineStore from './pages/MedicineStore/MedicineStore'
import ProductDetail from './pages/MedicineStore/ProductDetail'
import Cart from './pages/MedicineStore/Cart'
import Wishlist from './pages/MedicineStore/Wishlist'
import Checkout from './pages/MedicineStore/Checkout'
import OrderConfirmation from './pages/MedicineStore/OrderConfirmation'
import { CartDrawer } from './components/CartDrawer/CartDrawer' 

const App = () => {

  const {theme} = useThemeStore();
  const { user } = useAuthStore();
  const { isCartOpen, toggleCart } = useCartStore();

  return (
    <div className='min-h-screen relative w-full pt-17' data-theme={theme}>
      <NavBar />
      {user && <MedGenAi />}
      <CartDrawer isOpen={isCartOpen} onClose={toggleCart} />
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/login" element={ <Login /> } />
        <Route path="/signup" element={ <Signup /> } />
        <Route path="/doctors" element={ <Doctors /> } />
        <Route path="/doctors/:speciality" element={ <Doctors /> } />
        <Route path="/about" element={ <About /> } />
        <Route path="/store" element={ <MedicineStore /> } />
        <Route path="/store/product/:productId" element={ <ProductDetail /> } />
        <Route path="/store/cart" element={ <Cart /> } />
        <Route path="/store/wishlist" element={ <Wishlist /> } />
        <Route path="/store/checkout" element={ <Checkout /> } />
        <Route path="/store/order-confirmation" element={ <OrderConfirmation /> } />
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