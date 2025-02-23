import OldTcgIcon from "../icons/oldTcgIcon.png";
import GithubIcon from "../icons/githubIcon.png";
import { Link } from "react-router";

export default function Header() {
  return (
    <header className="flex flex-col justify-center items-center mt-5">
      <div className="flex">
        <h6 className="text-white mr-2 font-bold italic text-xs">
          Built by joaosilva7875@gmail.com
        </h6>
        <a target="_blank" href="https://github.com/Joaosilva27">
          <img src={GithubIcon} className="w-4 h-4 animate-bounce" />
        </a>
      </div>
      <Link to="/">
        <img src={OldTcgIcon} className="w-50 h-50 object-contain " />
      </Link>
      <nav className="flex flex-wrap justify-center gap-2 md:gap-4 p-4 md:p-6 bg-gray-900 rounded-2xl shadow-xl w-fit">
        <Link to="/search" className="hover:scale-105 transition-transform">
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 md:px-6 md:py-3 rounded-xl font-bold text-xs md:text-sm whitespace-nowrap">
            Cards
          </span>
        </Link>
        <Link to="/sets" className="hover:scale-105 transition-transform">
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 md:px-6 md:py-3 rounded-xl font-bold text-xs md:text-sm whitespace-nowrap">
            Sets
          </span>
        </Link>
        <Link to="/collection" className="hover:scale-105 transition-transform">
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 md:px-6 md:py-3 rounded-xl font-bold text-xs md:text-sm whitespace-nowrap">
            My Collection
          </span>
        </Link>
      </nav>
    </header>
  );
}
