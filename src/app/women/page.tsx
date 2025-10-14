import Video from '@/app/components/Video'
import React from 'react'
// import Video from '../../components/Video'
import NewIn from './NewIn'
import EssentialsRefined from '../components/EssentialsRefined'
import MoreProduct from './MoreProduct'
import Breaker from '../components/Breaker'

const women = () => {
  return (
    <>
      <Video src="https://www.asos-video.com/video/upload/f_auto,q_auto/HOMEPAGE_DESKTOP_v3_phvqkt.mp4" />
      <NewIn />
      <EssentialsRefined category="women" />
      <Breaker
        title="Beyond Basic Wears"
        description="Shop high-quality classic tees in a range of colors, fits, and fabrics."
        image="/womens/womens.jpg"
      />

      {/* <MoreProduct /> */}

    </>
  )
}

export default women