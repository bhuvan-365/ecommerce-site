
import React from 'react'
import HeroSec from './home/Hero'
import Latest from './home/LatestArrivals'
import Trending from './home/Trending'
import Brandlogo from './home/Brandlogo'
import LenisProvider from './components/LenisProvider'


const page = () => {
  return (
    <>
      <LenisProvider>
      <HeroSec />
      {/* <Trendings /> */}
      <Trending />
      <Latest />
      <Brandlogo />
      </LenisProvider>

    </>
  )
}

export default page