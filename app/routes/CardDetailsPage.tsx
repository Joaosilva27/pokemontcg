import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

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
    <div className="flex flex-col justify-center items-center">
      <div className="flex items-center">
        <img
          src={`${pokemonCardData?.set?.logo}.jpg`}
          className="w-40 h-20 object-contain mr-6"
        />
        <h1 className="text-xl font-bold">{pokemonCardData?.name}</h1>
      </div>
      <div className="flex items-center">
        <img
          src={`${pokemonCardData?.image}/high.jpg`}
          className="w-50 h-100 object-contain"
        />
        <div className="flex flex-col ml-4">
          <span>Rarity: {pokemonCardData?.rarity}</span>
          <span>
            {pokemonCardData?.types?.[0] && (
              <span>Types: {pokemonCardData?.types?.[0]}</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
