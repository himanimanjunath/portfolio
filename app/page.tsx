"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import SocialLinks from "./components/SocialLinks";
import { Source_Sans_3 } from "next/font/google";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"], 
});

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

  const skills = {
    Languages: [
      { name: "Python", icon: "" },
      { name: "TypeScript", icon: "" },
      { name: "JavaScript", icon: "" },
      { name: "C++", icon: "" },
      { name: "C", icon: "" },
      { name: "HTML", icon: "" },
      { name: "CSS", icon: "" },
    ],
    "Technologies/Frameworks": [
      { name: "React", icon: "" },
      { name: "Next.js", icon: "" },
      { name: "Tailwind", icon: "" },
    ],
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
          className="relative flex text-left min-h-screen px-8 py-13 bg-gray-50 text-gray-700 dark:text-gray-300"
      >
      {/* container for image + overlay text */}
      <div className="relative w-full flex justify-center right-5">
      {/* background image */}
      <Image
        src="/about.png"
        alt="about bg"
        width={950}
        height={800}
        className="object-full shadow-xl rounded-md border-gray-200 border-2 h-auto"
        priority
      />

      <div className="absolute"
        style={{ 
          top:140, 
          right:880
          }}>
        <Image
          src="/baby1.JPG"
          alt="baby me on laptop"
          width={210}
          height={175}
          className="object-full border-white border-10 shadow-xl rounded-md h-auto"
          priority
        />
      </div>

      <div className="absolute"
        style={{ 
          top:350, 
          right:880
          }}>
        <Image
          src="/baby2.JPG"
          alt="baby me on laptop 2"
          width={210}
          height={175}
          className="object-full shadow-xl border-white border-10  rounded-md h-auto"
          priority
        />
      </div>

        {/* overlay text */}
        <div className="absolute top-60 left-138 z-10 max-w-lg">
          <p className={`${sourceSans.className} text-sm absolute`}
           style={{ 
            top:75, 
            right:630
          }}
          >IMG_1215.JPG</p>
          <p className={`${sourceSans.className} text-sm absolute`}
           style={{ 
            top:285, 
            right:630
          }}
          >IMG_1216.JPG</p>
          <h2 className="text-3xl font-bold mb-4">Get to know me!</h2>
          <p className=" text-md">
            I&apos;m currently a <span className="font-bold">sophomore</span> at <span className="font-bold">UC Davis</span>, studying <span className="font-bold">Computer Science</span>. I love using <span className="font-bold">software</span> to build things that help out the community or improve the way people work.
          </p>
          <p className="mt-4 text-md">
            Outside of coding, I enjoy playing badminton, visiting my friends&apos; dogs, and making coffee.
          </p>
        </div>
      </div>
    </section>

    <section
    id="skills"
    className="relative flex text-center min-h-screen px-8 py-13 bg-gray-50 text-gray-700 dark:text-gray-300"
    >
    {/* container for image + overlay text */}
    <div className="relative w-full flex justify-center right-5">
      {/* background image */}
      <Image
        src="/skills.png"
        alt="skills bg"
        width={950}
        height={800}
        className="object-full shadow-xl rounded-md border-gray-200 border-2 h-auto"
        priority
    />

    <div className="absolute top-37 z-10 max-w-full w-[90vw]">
     <h2 className="text-3xl font-bold mb-10">Skills</h2> 
      
      <div className="grid grid-cols-1 md:grid-cols-1 gap-12 px-10">
        {Object.entries(skills).map(([category, skillList]) => (
          <div key={category} className="space-y-2">
            <h3
              className="font-bold text-gray-800 text-center mb-5"
              style={{ fontSize: "27px" }}
            >
              {category}
            </h3>
            <div className="m-auto flex w-full flex-nowrap gap-2 justify-center overflow-x-auto">
              {skillList.map((skill) => (
                <div
                  key={skill.name}
                  className="flex font-semibold cursor-default select-none items-center gap-2 rounded-md bg-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                  <span className={sourceSans.className}>{skill.name}</span>
                  {skill.icon}
                </div>
              ))}
            </div>
          </div>
            ))}
          </div>
        </div>
      </div>
      </section>

      <section
        id="projects"
        className="text-center min-h-screen px-8 py-13 bg-gray-50 text-gray-700 dark:text-gray-300"
      >
        <h2 className="text-3xl font-bold mb-4">What I've built</h2>
        <p>section under construction...</p>
      </section>

      <section
        id="contact"
        className="relative flex text-center min-h-screen px-8 py-13 bg-gray-50 text-gray-700 dark:text-gray-300"
      >
          <div className="relative w-full flex justify-center right-5">
          {/* background image */}
          <Image
            src="/contact.png"
            alt="contact bg"
            width={950}
            height={800}
            className="object-full shadow-xl rounded-md border-gray-200 border-2 h-auto"
            priority
          />
          </div>

          <div className="absolute top-43 items-center left-99 z-10 ">

            <h2 className="text-3xl font-bold mb-4">Contact</h2>

            <p className="text-center pb-8 font-semibold">
            <span className={sourceSans.className}>Please contact me directly at {" "} <a href="mailto:hmanjunath@ucdavis.edu" className="text-black underline">hmanjunath@ucdavis.edu</a>{" "} 
            or through this form.</span>
          </p>

          <form className="space-y-5">
            <div>
              <input
                type="email"
                placeholder="Your email"
                required
                className="w-[600px] mx-auto block px-4 py-4 bg-white/80 backdrop-blur-sm border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-transparent"
              />
            </div>

            <div>
              <textarea
                placeholder="Your message"
                rows={6}
                required
                className="w-[600px] mx-auto block px-4 py-4 bg-white/80 backdrop-blur-sm border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-transparent"
              ></textarea>
            </div>

            <button
              type="submit"
              className="group bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-full font-medium transition-all duration-200 hover:scale-110 flex items-center gap-2 mx-auto"
            >
              Submit
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </form>
        </div>
      </section>

      <footer 
      className="w-full py-7 bg-gray-50 text-center text-sm text-black dark:bg-gray-900 dark:text-gray-400 pb-20"
      >
        &copy; {new Date().getFullYear()} Himani Manjunath. All rights reserved.
      </footer>


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
