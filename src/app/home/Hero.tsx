"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const imageDivRef = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);

    const imageArray = useMemo(
        () => [
            "https://k72.ca/uploads/teamMembers/Carl_480x640-480x640.jpg",
            "https://k72.ca/uploads/teamMembers/Olivier_480x640-480x640.jpg",
            // "https://k72.ca/uploads/teamMembers/Lawrence_480x640-480x640.jpg",
            "https://k72.ca/uploads/teamMembers/HugoJoseph_480x640-480x640.jpg",
            "https://k72.ca/uploads/teamMembers/ChantalG_480x640-480x640.jpg",
            "https://k72.ca/uploads/teamMembers/MyleneS_480x640-480x640.jpg",
            "https://k72.ca/uploads/teamMembers/SophieA_480x640-480x640.jpg",
            // "https://k72.ca/uploads/teamMembers/Claire_480x640-480x640.jpg",
            "https://k72.ca/uploads/teamMembers/Michele_480X640-480x640.jpg",
            "https://k72.ca/uploads/teamMembers/MEL_480X640-480x640.jpg",
            "https://k72.ca/uploads/teamMembers/CAMILLE_480X640_2-480x640.jpg",
            // "https://k72.ca/uploads/teamMembers/MAXIME_480X640_2-480x640.jpg",
            "https://k72.ca/uploads/teamMembers/MEGGIE_480X640_2-480x640.jpg",
            "https://k72.ca/uploads/teamMembers/joel_480X640_3-480x640.jpg",
        ],
        []
    );

    useEffect(() => {
        imageArray.forEach((src) => {
            const img = new Image();
            img.decoding = "async";
            img.loading = "eager";
            img.src = src;
        });
    }, [imageArray]);
    useGSAP(() => {
        if (!imageDivRef.current || !imageRef.current) return;

        gsap.to(imageDivRef.current, {
            scrollTrigger: {
                trigger: imageDivRef.current,
                markers: false,
                start: "top 20%",
                end: "top -130%",
                pin: true,
                pinSpacing: true,
                pinReparent: true,
                pinType: "transform",
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,

                onUpdate: (elem) => {
                    let imageIndex: number;
                    if (elem.progress < 1) {
                        imageIndex = Math.floor(elem.progress * imageArray.length);
                    } else {
                        imageIndex = imageArray.length - 1;
                    }

                    if (imageRef.current) {
                        imageRef.current.src = imageArray[imageIndex];
                    }
                },
            },
        });
    });

    return (
        <>
            <div className="relative h-screen w-full overflow-hidden focus:outline-none focus:ring-0">
                <video
                    ref={videoRef}
                    src="https://image.hm.com/content/dam/global_campaigns/season_02/women/startpage-category-entries/wk41/9102B-16x9-video.mp4"
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover border-none focus:outline-none focus:ring-0"
                />

                {/* Controls */}
                <div className="absolute bottom-4 right-4 flex gap-4 z-50">
                    <button
                        onClick={toggleMute}
                        className="cursor-pointer bg-black bg-opacity-50 text-white px-3 py-2 rounded hover:bg-opacity-70 transition"
                    >
                        <img
                            className="h-6 w-6"
                            src={isMuted ? "/mute.svg" : "/unmute.svg"}
                            alt="toggle mute"
                        />
                    </button>
                    <button
                        onClick={togglePlay}
                        className="cursor-pointer bg-black bg-opacity-50 text-white px-3 py-2 rounded hover:bg-opacity-70 transition"
                    >
                        <img
                            className="h-7 w-7"
                            src={isPlaying ? "/pause.svg" : "/play.svg"}
                            alt="toggle play"
                        />
                    </button>
                </div>
            </div>
            <div className="absolute h-[100vh] inset-0 bg-black/20">
            </div>

            <div className="section2 text-black relative mb-20 overflow-hidden">
                <div
                    ref={imageDivRef}
                    className="z-[30] absolute mt-10 h-[160px] w-[150px] max-h-[45vw] max-w-[45vw] rounded-md overflow-hidden sm:h-[200px] sm:w-[180px] lg:h-[24vw] lg:w-[20vw] top-10 sm:top-20 lg:top-0 left-4 sm:left-[10vw] lg:left-[15vw]"
                >
                    <img
                        ref={imageRef}
                        className="h-full w-full object-cover"
                        src="https://k72.ca/uploads/teamMembers/Carl_480x640-480x640.jpg"
                        alt="scrolling image"
                    />
                </div>
                <div className="relative poppins !z-40">
                    <div className="mt-16">
                        <h1 className="text-5xl sm:text-[16vw] text-center uppercase leading-[18vw] max-w-full break-words">
                            EComx <br /> Presents
                        </h1>
                        <div className="pl-4 sm:pl-[20%] lg:pl-[30%] mt-10 sm:mt-16 p-3 max-w-full">
                            <p className="text-xl sm:text-5xl lg:text-[4rem] leading-tight max-w-full">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                At EcomX, we make fashion for everyone — combining quality, comfort, and affordability. Our pieces reflect personality and story, not fleeting trends. We focus on timeless style that lasts, making fashion accessible, sustainable, and real. Style with substance, for real lives.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
