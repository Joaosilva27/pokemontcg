import OldTcgIcon from "../icons/oldTcgIcon.png";
import GithubIcon from "../icons/githubIcon.png";

export default function Header() {
  return (
    <header className="flex flex-col justify-center items-center mt-2">
      <div className="flex">
        <h6 className="text-white mr-2 font-bold italic text-xs">
          Built by joaosilva7875@gmail.com
        </h6>
        <a target="_blank" href="https://github.com/Joaosilva27">
          <img src={GithubIcon} className="w-4 h-4 animate-bounce" />
        </a>
      </div>
      <img src={OldTcgIcon} className="w-50 h-50 object-contain " />
    </header>
  );
}
