"use client";
import Link from 'next/link'
import React from 'react'

const MoreProduct = () => {
    return (
        <>
            <section>
                <div className='my-5 text-2xl px-5'>Best collections</div>
                <div className="parent w-[100%] h-[100vh] flex justify-center items-center gap-1">
                    <div className="relative right h-[100%] w-[50%]">
                        <img className='w-full h-full object-top object-cover' src="/mens/men2.avif" alt="EcomX" />
                        <div className='absolute top-[60%] right-[10%] flex justify-center items-center gap-2.5 w-fit h-5'>
                            <div className='h-5 w-5 border flex justify-center items-center'>
                                <div className="h-2 w-2 bg-white border"></div>
                            </div>
                            <div className='h-5 w-fit bg-zinc-300 flex justify-center items-center px-4'>Rs.5999.0</div>
                        </div>
                        <div className='flex justify-between items-center px-5 py-1 text-lg'>

                            <div className="name capitalize tracking-wide">CHECK SHIRT</div>
                            <Link href='#' className='underline text-black'> SHOP NOW</Link>
                        </div>
                    </div>
                    <div className="relative left h-[100%] w-[50%]">
                        <img className='w-full h-full object-center object-cover' src="/mens/men3.avif" alt="EcomX" />

                        <div className='absolute bottom-[30%] right-[10%] flex justify-center items-center gap-2.5 w-fit h-5'>
                            <div className='h-5 w-5 border flex justify-center items-center'>
                                <div className="h-2 w-2 bg-white border"></div>
                            </div>
                            <div className='h-5 w-fit bg-zinc-300 flex justify-center items-center px-4'>Rs.5999.0</div>
                        </div>
                        <div className='flex justify-between items-center px-5 py-1 text-lg'>

                            <div className="name capitalize tracking-wide">DENIM PANTS</div>
                            <Link href='#' className='underline text-black'> SHOP NOW</Link>
                        </div>
                    </div>
                </div>


            </section>
        </>
    )
}

export default MoreProduct