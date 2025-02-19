import axios from "axios";
import { error } from "console";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function CardDetailsPage() {
  const params = useParams();
  const [pokemonCardData, setPokemonCardData] = useState<any>([]);

  useEffect(() => {
    console.log(params.pokemonId);
    const fetchCardData = async () => {
      try {
        const fetchData = await axios.get(
          `https://api.tcgdex.net/v2/en/cards/${params.pokemonId}`
        );
        setPokemonCardData(fetchData.data);
        console.log(fetchData.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCardData();
  }, []);

  return (
    <div>
      <h1>poj</h1>
    </div>
  );
}
