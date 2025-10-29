
import React from 'react'
import HeroSec from './home/Hero'
import Latest from './home/LatestArrivals'
import Trending from './home/Trending'
import Brandlogo from './home/Brandlogo'
import Hotpick from './home/Hotpick'


const page = () => {
  return (
    <>

      <HeroSec />
      {/* <Trendings /> */}
      <Trending />
      {/* <Latest /> */}
      {/* <Hotpick /> */}
      <Brandlogo />


    </>
  )
}

export default page