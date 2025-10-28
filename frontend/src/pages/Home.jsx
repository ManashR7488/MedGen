import React from 'react'
import Header from '../components/Header/Header'
import SpecialityMenu from '../components/SpecialityMenu/SpecialityMenu'
import TopDoctors from '../components/TopDoctors/TopDoctors'
import Banner from '../components/Banner/Banner'
import Footer from '../components/Footer/Footer'

const Home = () => {
  return (
    <div className='px-10'>
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
      <Footer />
    </div>
  )
}

export default Home