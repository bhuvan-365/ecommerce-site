import React from 'react'
import HeroSec from './home/Hero'
import Latest from './home/LatestArrivals'
import Trendings from './home/Trendings'
import Trending from './home/Trending'

const page = () => {
  return (
    <>
      <HeroSec />
      {/* <Trendings /> */}

      <Trending />
      <Latest />

    </>
  )
}

export default page