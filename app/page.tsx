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

const folderLightSrc = "/folder.png";      
// const folderDarkSrc = "/folder-dark.png";  

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
    <div className="bg-gray-50 min-h-screen relative pl-[5rem] pr-[6rem] md:pl-[6rem] md:pr-[8rem]">
      <SocialLinks />

      {/* preloading folder images to prevent delays */}
      <div style={{ display: "none" }}>
        <Image src={folderLightSrc} alt="" width={70} height={70} priority />
      </div>

      {/* right side folder navbar */}
      <nav className="fixed top-83 right-6 transform -translate-y-1/2 flex flex-col items-center space-y-6 z-50 right-15 select-none">
        {navItems.map(({ id, label }) => {
          const isActive = activeSection === id;
          const isHovered = hoveredNav === id;

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
        className="relative flex flex-col md:flex-row items-center justify-center min-h-screen px-6 sm:px-12 lg:px-20 pr-4 md:pr-[calc(70px+2rem)] gap-17"
      >
        {/* text content */}
        <div className="flex flex-col items-start max-w-xl text-center md:text-left md:-ml-5">
          <h3 className="text-3xl sm:text-4xl mb-2 font-semibold text-gray-700">
            Nice to meet you!
          </h3>
          <h1 className="text-6xl sm:text-7xl font-bold mb-4 text-gray-800">
            I&apos;m Himani.
          </h1>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-700 min-h-[1.2em]">
            {displayText}
            <span className="cursor text-md">|</span>
          </h3>
        </div>

        {/* pfp image */}
        <div className="w-[60vw] max-w-[420px] min-w-[200px] md:relative md:right-0">
          <Image
            src="/me.jpg"
            alt="profile photo"
            width={400}
            height={400}
            className="w-full h-auto object-contain border-gray-300 border-1 rounded-sm shadow-2xl"
            priority
          />
        </div>
      </main>

      {/* planned sections for rest of portfolio */}
      <section
        id="about"
        className="flex justify-center items-center min-h-screen px-6 py-10 bg-gray-50 text-gray-700 pr-4 md:pr-[calc(30px+2rem)]"
      >
        <div
          className="relative w-full max-w-[57rem] border-gray-200 border-2 shadow-xl rounded-md aspect-[950/609] bg-no-repeat bg-contain bg-center"
          style={{ backgroundImage: "url('/about.png')" }}
        >
          {/* baby pic 1 */}
          <div className="absolute top-[20%] left-[10%]">
            <Image
              src="/baby1.JPG"
              alt="baby me on laptop"
              width={210}
              height={175}
              className="w-[60%] h-auto border-white border-8 shadow-xl rounded-md"
            />
            <p className={`${sourceSans.className} text-center pr-32 text-sm mt-3`}>IMG_1215.JPG</p>
          </div>

          {/* baby pic 2 */}
          <div className="absolute top-[55%] left-[10%]">
            <Image
              src="/baby2.JPG"
              alt="baby me on laptop 2"
              width={210}
              height={175}
              className="w-[60%] h-auto border-white border-8 shadow-xl rounded-md"
            />
            <p className={`${sourceSans.className} text-sm text-center pr-32 mt-3`}>IMG_1216.JPG</p>
          </div>

          {/* text */}
          <div className="absolute top-[28%] right-[5%] p-7 w-[59%]">
            <h2 className="text-3xl font-bold mb-4">Get to know me!</h2>
            <p className="text-lg">
              I&apos;m currently a <span className="font-bold">sophomore</span> at{" "}
              <span className="font-bold">UC Davis</span>, studying{" "}
              <span className="font-bold">Computer Science</span>. I love using{" "}
              <span className="font-bold">software</span> to build things that help out the community or improve the way people work.
            </p>
            <p className="mt-4 text-lg">
              Outside of coding, I enjoy playing badminton, visiting my friends&apos; dogs, and making coffee.
            </p>
          </div>
        </div>
      </section>

      <section
      id="skills"
      className="flex justify-center items-center min-h-screen px-6 py-10 bg-gray-50 text-gray-700 pr-4 md:pr-[calc(30px+2rem)]"
    >
      <div
        className="relative w-full max-w-[57rem] border-gray-200 border-2 shadow-xl rounded-md aspect-[950/609] bg-no-repeat bg-contain bg-center"
        style={{ backgroundImage: "url('/skills.png')" }}
      >
      <div className="max-w-full mt-33">
        <h2 className="text-3xl font-bold mb-10 text-center">Skills</h2>

        {/* skills categories container */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-12 max-w-full">
          {Object.entries(skills).map(([category, skillList]) => (
            <div key={category} className="space-y-4">
              <h3
                className="font-bold text-gray-800 dark:text-gray-200 text-center text-2xl md:text-3xl"
              >
                {category}
              </h3>
              <div className="flex flex-wrap justify-center gap-3 overflow-x-auto py-2">
                {skillList.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex font-semibold cursor-default select-none items-center gap-2 rounded-md bg-gray-200 px-4 py-2 text-md text-gray-600 transition hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 whitespace-nowrap"
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
        className="flex justify-center items-center min-h-screen px-6 py-10 bg-gray-50 text-gray-700 pr-4 md:pr-[calc(30px+2rem)]"
      >
        <div
    className="relative w-full max-w-[57rem] border-gray-200 border-2 shadow-xl rounded-md aspect-[950/609] bg-no-repeat bg-contain bg-center"
    style={{ backgroundImage: "url('/projects.png')" }}
  >
    <div className="max-w-full max-w-xl mx-auto text-center mt-30">
      <h2 className="text-3xl font-bold mb-5">What I&apos;ve built</h2>

<a
  href="https://github.com/himanimanjunath/simplify"
  target="_blank"
  rel="noopener noreferrer"
  className="block"
>

<div className="bg-gray-100 hover:bg-gray-200 text-left transition-colors duration-300 rounded-md p-6 md:p-8 mx-auto max-w-[100%]">
  <div className={`${sourceSans.className} grid grid-cols-[1fr_1.2fr] gap-6 items-center`}>
    
    {/* text side*/}
    <div className="space-y-2">
      <h3 className="text-xl font-bold text-gray-800">simplify</h3>
      <p className="text-gray-700 text-md md mb-5">
        I worked with 2 others to create a Chrome Extension that helps neurodivergent users by visually simplifying websites.
      </p>
      <div className="flex flex-wrap gap-2">
        <div className="px-3 py-1 bg-gray-600 text-white rounded-full text-xs">HTML</div>
        <div className="px-3 py-1 bg-gray-600 text-white rounded-full text-xs">CSS</div>
        <div className="px-3 py-1 bg-gray-600 text-white rounded-full text-xs">JavaScript</div>
        <div className="px-3 py-1 bg-gray-600 text-white rounded-full text-xs">Chrome Extensions API</div>
      </div>
    </div>

    

    {/* image side */}
    <Image
      src="/sim.png"
      alt="Simplify project screenshot"
      width={550} 
      height={550}
      className="w-full h-auto object-contain"
      priority
    />
  </div>
</div>

</a>

      </div>
      </div>
      </section>


      <section
  id="contact"
  className="flex justify-center items-center min-h-screen px-6 py-10 bg-gray-50 text-gray-700 pr-4 md:pr-[calc(30px+2rem)]"
>
  <div
    className="relative w-full max-w-[57rem] border-gray-200 border-2 shadow-xl rounded-md aspect-[950/609] bg-no-repeat bg-contain bg-center"
    style={{ backgroundImage: "url('/contact.png')" }}
  >
    <div className="max-w-full max-w-xl mx-auto text-center mt-27">
      <h2 className="text-3xl font-bold mb-5">Contact</h2>
      <p className={`${sourceSans.className} font-semibold mb-7`}>
        Please contact me directly at{" "}
        <a
          href="mailto:hmanjunath@ucdavis.edu"
          className="text-black underline"
        >
          hmanjunath@ucdavis.edu
        </a>{" "}
        or through this form.
      </p>

      <form className="space-y-4">
        <input
          type="email"
          placeholder="Your email"
          required
          className="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-transparent"
        />
        <textarea
          placeholder="Your message"
          rows={6}
          required
          className="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-transparent"
        />
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
  </div>
</section>
      <footer
        className="w-full py-7 bg-gray-50 text-center text-sm text-black dark:bg-gray-900 dark:text-gray-400 pb-20"
      >
        &copy; {new Date().getFullYear()}, designed and built with love by Himani 
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
