import type { Route } from "./+types/home";
import OldTcgIcon from "../icons/oldTcgIcon.png";
import GithubIcon from "../icons/githubIcon.png";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TCG Collection" },
    { name: "description", content: "Pokemon Trading Cards" },
  ];
}

export default function Home() {
  return (
    <div>
      <header className="flex flex-col justify-center items-center mt-2">
        <div className="flex">
          <span className="text-white mr-2 font-bold italic">
            Built by joaosilva7875@gmail.com
          </span>
          <a target="_blank" href="https://github.com/Joaosilva27">
            <img src={GithubIcon} className="w-5 h-5" />
          </a>
        </div>
        <img src={OldTcgIcon} className="w-50 h-50 object-contain" />
      </header>
    </div>
  );
}
