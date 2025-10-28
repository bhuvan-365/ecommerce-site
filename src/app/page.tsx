
import React from 'react'
import HeroSec from './home/Hero'
import Latest from './home/LatestArrivals'
import Trending from './home/Trending'
import Brandlogo from './home/Brandlogo'


const page = () => {
  return (
    <>

      <HeroSec />
      {/* <Trendings /> */}
      <Trending />
      <Latest />
      <Brandlogo />


    </>
  )
}

export default page