"use client";
import Banner from '@/app/components/Banner/Banner'
import React from 'react'
import EssentialsRefined from '../components/EssentialsRefined'
import MoreProduct from '../components/MoreProduct'
import Breaker from '../components/Breaker'
import ShopNowSection from '../components/ShopNow'
import Tabs from '../components/TabLinks';

const women = () => {
  return (
    <>
      <Banner src="https://www.asos-video.com/video/upload/f_auto,q_auto/HOMEPAGE_DESKTOP_v3_phvqkt.mp4" />
      <Tabs category="kids" />
      <EssentialsRefined category="kids" />
      <Breaker
        title="Beyond Basic Wears"
        description="Shop high-quality classic tees in a range of colors, fits, and fabrics."
        image="/womens/womens.jpg"
      />

      <MoreProduct />
      <ShopNowSection category='kids' />
    </>
  )
}

export default women