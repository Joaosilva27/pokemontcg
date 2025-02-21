import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PriceChartingIcon from "../icons/priceCharting.png";

export default function CardDetailsPage() {
  const params = useParams();
  const [pokemonCardData, setPokemonCardData] = useState<any>([]);

  useEffect(() => {
    console.log("Params ID:", params.pokemonId);
    const fetchCardData = async () => {
      try {
        const response = await axios.get(
          `https://api.tcgdex.net/v2/en/cards/${params.pokemonId}`
        );
        setPokemonCardData(response.data);
        console.log("API Response:", response.data);
      } catch (err) {
        console.error("API Error:", err);
      }
    };

    fetchCardData();
  }, [params.pokemonId]);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center mb-12 p-6 bg-gray-900 rounded-2xl shadow-xl">
          <img
            src={`${pokemonCardData?.set?.logo}.jpg`}
            className="w-32 h-16 object-contain mr-6 bg-white p-2 rounded-lg"
          />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {pokemonCardData?.name}
          </h1>
        </div>

        {/* Main Content */}
        <div className="flex flex-wrap lg:flex-nowrap gap-8">
          {/* Card Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={`${pokemonCardData?.image}/high.jpg`}
              className="w-full max-w-md h-auto object-contain rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Card Details */}
          <div className="w-full lg:w-1/2 bg-gray-900 p-8 rounded-2xl shadow-xl">
            {/* Price Charting Section */}
            <div className="mb-8 text-center bg-gray-800 p-4 rounded-xl">
              <p className="text-lg mb-2 font-semibold text-blue-300">
                Check current market price
              </p>
              <a
                target="_blank"
                href={`https://www.pricecharting.com/search-products?q=${pokemonCardData?.set?.name} ${pokemonCardData?.name}&type=prices`}
                className="inline-block hover:scale-105 transition-transform"
              >
                <img
                  className="object-contain w-32 h-12 mx-auto"
                  src={PriceChartingIcon}
                />
                <span className="text-sm text-gray-400 mt-1 block">
                  Click to view pricing
                </span>
              </a>
            </div>

            {/* Basic Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-400">Rarity</p>
                <p className="font-bold text-purple-400">
                  {pokemonCardData?.rarity}
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-400">Type</p>
                <p className="font-bold text-blue-400">
                  {pokemonCardData?.types?.[0] || "N/A"}
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-400">Card Number</p>
                <p className="font-bold">
                  {pokemonCardData?.localId} /{" "}
                  {pokemonCardData?.set?.cardCount?.total}
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-400">Illustrator</p>
                <p className="font-bold text-green-400">
                  {pokemonCardData?.illustrator
                    ? pokemonCardData?.illustrator
                    : "Official Artwork"}
                </p>
              </div>
            </div>

            {/* Abilities Section */}
            {pokemonCardData?.abilities?.map((ability, index) => (
              <div key={index} className="mb-6 bg-gray-800 p-4 rounded-xl">
                <div className="flex items-center mb-2">
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    {ability.name}
                  </span>
                  <span className="ml-2 text-sm text-gray-400">(Ability)</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {ability.effect}
                </p>
              </div>
            ))}

            {/* Attacks Section */}
            {pokemonCardData?.attacks?.map((attack, index) => (
              <div key={index} className="mb-6 bg-gray-800 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-lg font-bold text-red-400">
                      {attack.name}
                    </span>
                    {attack.damage && (
                      <span className="ml-2 text-yellow-400">
                        ({attack.damage} Damage)
                      </span>
                    )}
                  </div>
                </div>
                {attack.effect && (
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {attack.effect}
                  </p>
                )}
              </div>
            ))}

            {/* Card Effect */}
            {pokemonCardData?.effect && (
              <div className="mt-8 bg-gray-800 p-4 rounded-xl">
                <p className="text-sm font-semibold text-gray-400 mb-2">
                  Card Effect
                </p>
                <p className="text-gray-300 text-sm italic">
                  "{pokemonCardData?.effect}"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
