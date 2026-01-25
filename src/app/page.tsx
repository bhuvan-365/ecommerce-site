
import React from 'react'
import HeroSec from './home/Hero'
import Latest from './home/LatestArrivals'
import Trending from './home/Trending'
import Brandlogo from './home/Brandlogo'
import Hotpick from './home/Hotpick'
import ShopNowSection from './components/ShopNow'
import EssentialsRefined from './components/EssentialsRefined'


const page = () => {
  return (
    <>

      <HeroSec />
      <Trending />
      <Hotpick />
      <EssentialsRefined category="men" />
      <ShopNowSection category={["men", "women", "kids"]} />
      <Brandlogo />


    </>
  )
}

export default page