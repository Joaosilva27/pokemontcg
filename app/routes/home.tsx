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
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Navigation */}

        {/* Main Content */}
        <section className="bg-gray-900 rounded-2xl shadow-xl p-8">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-xl mb-8 max-w-3xl leading-relaxed">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                PokeTCG Collector
              </span>{" "}
              is a web app designed to keep track of the pokemon cards you have
              collected. Browse through decades of cards in the{" "}
              <span className="text-blue-300">Sets</span> section.
            </h1>

            <div className="flex flex-col lg:flex-row items-center gap-8 w-full max-w-4xl">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="bg-gray-800 pt-6 pb-6 rounded-2xl shadow-lg">
                  <img
                    src={PikachuCardImage}
                    className="w-50 h-50 object-contain md:w-[300px] md:h-[300px] transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <span className="text-sm italic mt-4 text-gray-400 max-w-md">
                  Pikachu No. 3 Trainer Bronze Trophy Card (1997)
                </span>
              </div>

              <div className="bg-gray-800 p-6 rounded-2xl shadow-lg max-w-2xl">
                <p className="text-gray-300 leading-relaxed">
                  This particular card could only be found at the first ever
                  Pokémon Trading Card Game tournament. In the Japanese
                  competition, the top three competitors in each division were
                  rewarded with these cards. The Pikachu card represented the
                  number three spot, essentially doubling as a bronze medal. The
                  most valuable known card was graded an 8 and sold for{" "}
                  <span className="text-green-400 font-bold">$300,000</span>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
