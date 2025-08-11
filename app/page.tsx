"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import SocialLinks from "./components/SocialLinks";

export default function Home() {

  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const titles = ["Coder.", "Full-Stack Developer.", "Software Engineer."]

  useEffect(() => {
    const currentTitle = titles[currentIndex]
    const typingSpeed = 100;
    const pauseTime = isDeleting ? 500 : 2000

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentTitle) {
        // Finished typing, start deleting after pause
        setTimeout(() => setIsDeleting(true), pauseTime)
      } else if (isDeleting && displayText === "") {
        // Finished deleting, move to next title
        setIsDeleting(false)
        setCurrentIndex((prev) => (prev + 1) % titles.length)
      } else if (isDeleting) {
        // Continue deleting
        setDisplayText(currentTitle.substring(0, displayText.length - 1))
      } else {
        // Continue typing
        setDisplayText(currentTitle.substring(0, displayText.length + 1))
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [displayText, currentIndex, isDeleting, titles])

  return (
    <div className="bg-gray-50 min-h-screen">
      <SocialLinks />

      {/* heyyy i'm himani text */}

      <main id="home" className="flex items-center justify-center min-h-[calc(100vh-120px)] max-w-[55rem] mx-42">
      <div className="w-full grid grid-cols-1 lg:grid-cols-1 gap-4 items-center pt-50">
        <div>
          <h3 style={{ color: "#605151" }} className="`${inriaSerif.className} text-4xl font-semibold text-gray-700 dark:text-gray-300 lg:text-4xl xl:text-4xl">Nice to meet you!</h3>
          <h1 className="inline-block select-none text-5xl font-bold text-gray-800 dark:text-gray-200 md:text-7xl lg:text-7xl xl:text-7xl">I'm Himani.</h1>
        </div>
        <h3 style={{ color: "#605151" }} className="text-4xl md:text-4xl lg:text-4xl font-bold text-gray-700 min-h-[1.2em] xl:text-4xl">
          {displayText}
          <span 
          className="cursor text-md">|</span>
        </h3>
      </div>

      {/* image of me */}
         <div className="w-200 pt-20">
          <Image
            src="/me.JPG"
            alt="profile photo"
            width={256}
            height={256}
            className="object-contain rounded-sm w-full h-auto "
            style={{ boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)" }}
            priority
          />
        </div>

      </main>

      {/* Blinking cursor style */}
      <style jsx>{`
        .cursor {
          display: inline-block;
          margin-left: 2px;
          animation: blink 0.7s infinite;
        }
        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
