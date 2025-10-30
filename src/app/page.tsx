
import React from 'react'
import HeroSec from './home/Hero'
import Latest from './home/LatestArrivals'
import Trending from './home/Trending'
import Brandlogo from './home/Brandlogo'
import Hotpick from './home/Hotpick'
import ShopNowSection from './components/ShopNow'


const page = () => {
  return (
    <>

      <HeroSec />
      {/* <Trendings /> */}
      <Trending />
      {/* <Latest /> */}
      <Hotpick />
      <ShopNowSection category={["men", "women", "kids"]} />
      <Brandlogo />


    </>
  )
}

export default page