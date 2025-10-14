"use client";
import React from 'react'
import { useRef, useState } from "react";

interface VideoProps {
    src: string;
}


const Video:React.FC<VideoProps> = ({src}) => {


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


  return (
    <>
            <div className="relative h-screen w-full overflow-hidden focus:outline-none focus:ring-0">
                <video
                    ref={videoRef}
                    src={src}
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



</>

            )
}

export default Video