import { FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa";

export default function SocialLinks() {
  return (
    
    <div className="fixed top-0 left-20 flex flex-col items-center space-y-4 z-50">
      {/* Vertical line */}
      <div className="w-1.5 h-25 bg-black rounded-b-full"></div>

      {/* Icons */}
      <a
        href="https://github.com/himanimanjunath"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-700 hover:text-gray-500 transition-colors"
      >
        <FaGithub size={24} />
      </a>

      <a
        href="https://www.linkedin.com/in/himanimanjunath/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-700 hover:text-gray-500 transition-colors"
      >
        <FaLinkedin size={24} />
      </a>

      {/* 

      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-700 hover:text-gray-500 transition-colors"
      >
        <FaFileAlt size={24} />
      </a>

      {/* 
      {/* Vertical line */}
      {/* 
      <div className="w-1.5 h-160 bg-black rounded-b-full"></div>
      */}

      
    </div>
  );
}
