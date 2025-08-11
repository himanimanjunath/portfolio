"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import SocialLinks from "./components/SocialLinks";

const navItems = [
  { id: "home", label: "home" },
  { id: "about", label: "about" },
  { id: "skills", label: "skills" },
  { id: "projects", label: "projects" },
  { id: "contact", label: "contact" },
];

const folderLightSrc = "/folder.png";      // Your light folder image
// const folderDarkSrc = "/folder-dark.png";  // Your darker folder image

export default function Home() {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const titles = ["Coder.", "Full-Stack Developer.", "Software Engineer."];

  useEffect(() => {
    const titles = ["Coder.", "Full-Stack Developer.", "Software Engineer."];

    const currentTitle = titles[currentIndex];
    const typingSpeed = 100;
    const pauseTime = isDeleting ? 500 : 2000;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentTitle) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % titles.length);
      } else if (isDeleting) {
        setDisplayText(currentTitle.substring(0, displayText.length - 1));
      } else {
        setDisplayText(currentTitle.substring(0, displayText.length + 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, currentIndex, isDeleting]);

  // active nav item state for highlighting
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  // update active nav based on scroll position
  useEffect(() => {
    function onScroll() {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (section) {
          const top = section.offsetTop;
          const bottom = top + section.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scroll smoothly to section when nav clicked
  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen relative">
      <SocialLinks />

      {/* Preload folder image to prevent any delay */}
      <div style={{ display: "none" }}>
        <Image src={folderLightSrc} alt="" width={70} height={70} priority />
      </div>

      {/* right side folder navbar */}
      <nav className="fixed top-83 right-6 transform -translate-y-1/2 flex flex-col items-center space-y-6 z-50 right-15 select-none">
        {navItems.map(({ id, label }) => {
          const isActive = activeSection === id;
          const isHovered = hoveredNav === id;
          //const showDark = isActive || isHovered;

          return (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              onMouseEnter={() => setHoveredNav(id)}
              onMouseLeave={() => setHoveredNav(null)}
              className={`flex flex-col items-center space-y-1 focus:outline-none
                ${
                  isActive
                    ? "text-blue-800"
                    : "text-blue-400 hover:text-blue-800 transition-colors"
                }`}
              aria-current={isActive ? "page" : undefined}
            >
              {/* 
              <Image
                src={showDark ? folderDarkSrc : folderLightSrc}
                alt={`${label} folder icon`}
                width={70}
                height={70}
                className="object-contain"
              />
              */}

              <Image
                src={folderLightSrc}
                alt={`${label} folder icon`}
                width={70}
                height={70}
                className={`object-contain transition duration-200 ${
                  isActive || isHovered ? "brightness-80 saturate-150" : ""
                }`}
                style={{ display: "block" }}
              />
              <span className="text-md font-bold text-black">{label}</span>
            </button>
          );
        })}
      </nav>

      {/* heyyy i'm himani text */}

      <main
        id="home"
        className="relative flex items-center justify-center min-h-[calc(100vh-120px)] py-70 max-w-[55rem] mx-50"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-1 gap-6 items-center pt-7 pl-3">
          <div>
            <h3
              style={{ color: "#605151" }}
              className="text-4xl font-semibold text-gray-700 dark:text-gray-300 lg:text-4xl xl:text-4xl"
            >
              Nice to meet you!
            </h3>
            <h1 className="inline-block select-none text-5xl font-bold text-gray-800 dark:text-gray-200 md:text-7xl lg:text-7xl xl:text-7xl">
              I&apos;m Himani.
            </h1>
          </div>
          <h3
            style={{ color: "#605151" }}
            className="text-4xl md:text-4xl lg:text-4xl font-bold text-gray-700 min-h-[1.2em] xl:text-4xl"
          >
            {displayText}
            <span className="cursor text-md">|</span>
          </h3>
        </div>

        {/* image of me */}
        <div
          className="absolute"
          style={{
            top: "160px",
            right: "-75px",
            width: "430px",
          }}
        >
          <Image
            src="/me.JPG"
            alt="profile photo"
            width={256}
            height={256}
            className="object-contain rounded-sm w-full h-auto"
            style={{ boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)" }}
            priority
          />
        </div>
      </main>

      {/* planned sections for rest of portfolio */}
      <section
          id="about"
          className="relative flex text-left min-h-screen px-8 py-20 bg-gray-50 text-gray-700 dark:text-gray-300"
      >
      {/* container for image + overlay text */}
      <div className="relative w-full flex justify-center right-5">
      {/* background image */}
      <Image
        src="/about.png"
        alt="about bg"
        width={950}
        height={800}
        className="object-full shadow-xl rounded-md h-auto"
        priority
      />

        {/* overlay text */}
        <div className="absolute top-50 left-140 z-10 max-w-lg">
          <h2 className="text-3xl font-bold mb-4">Get to know me!</h2>
          <p className=" text-md">
            I&apos;m currently a <span className="font-bold">sophomore</span> at <span className="font-bold">UC Davis</span>, studying <span className="font-bold">Computer Science</span>. I love using <span className="font-bold">software</span> to build things that help out the community or improve the way people work.
          </p>
          <p className="mt-4 text-md">
            Outside of coding, I enjoy badminton, visiting my friends&apos; dogs, and making coffee.
          </p>
        </div>
      </div>
    </section>

      <section
        id="skills"
        className="text-center min-h-screen px-8 py-20 bg-gray-100 text-gray-700 dark:text-gray-300"
      >
        <h2 className="text-3xl font-bold mb-4">Skills</h2>
        <p>Skills section content goes here...</p>
      </section>

      <section
        id="projects"
        className="text-center min-h-screen px-8 py-20 bg-gray-50 text-gray-700 dark:text-gray-300"
      >
        <h2 className="text-3xl font-bold mb-4">Projects</h2>
        <p>Projects section content goes here...</p>
      </section>

      <section
        id="contact"
        className="text-center min-h-screen px-8 py-20 bg-gray-50 text-gray-700 dark:text-gray-300"
      >
        <h2 className="text-3xl font-bold mb-4">Contact</h2>
        <p>Contact section content goes here...</p>
      </section>

      {/* blinking cursor style */}
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
