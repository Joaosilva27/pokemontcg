import type { Route } from "./+types/home";
import PikachuCardImage from "../icons/homePagePikachuCard.png";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TCG Collection" },
    { name: "description", content: "Pokemon Trading Cards" },
  ];
}

export default function Home() {
  return (
    <div>
      <nav className="flex justify-center mb-4">
        <Link>
          <span className="bg-gray-400 rounded-lg p-2 mr-3">Search</span>
        </Link>
        <Link to="/sets">
          <span className="bg-gray-400 rounded-lg p-2 mr-3">Sets</span>
        </Link>
        <Link>
          <span className="bg-gray-400 rounded-lg p-2">All Cards</span>
        </Link>
      </nav>
      <section>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-center font-bold">
            PokeTCG Collector is a web app designed to keep track of the pokemon
            cards you have collected so far.<br></br>
            Take a look at the 'Sets' section to browse through the different
            sets made from 1996 to this day.
          </h1>
          <div className="flex mt-6 mb-3 items-center justify-center flex-wrap">
            <div className="flex flex-col">
              <img
                src={PikachuCardImage}
                className="w-70 h-70 object-contain"
              />
              <span className="text-sm italic mb-4 underline">
                Pikachu No. 3 Trainer Bronze Trophy Card (1997)
              </span>
            </div>

            <span className="text-xs text-center max-w-96 mb-3">
              This particular card could only be found at the first ever Pokémon
              Trading Card Game tournament. In the Japanese competition, the top
              three competitors in each division were rewarded for their efforts
              with these cards. The Pikachu card represented the number three
              spot, essentially doubling as a bronze medal. The most valuable
              known card was graded an 8 and sold for $300,000.{" "}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
