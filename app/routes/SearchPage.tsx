import axios from "axios";
import { useState } from "react";
import CardBanner from "~/components/CardBanner";

export default function SearchPage() {
  const [inputSearch, setInputSearch] = useState<any>();
  const [cardsResult, setCardsResult] = useState<any>([]);

  const onPokemonSearch = (e) => {
    e.preventDefault();

    const getPokemonCards = async () => {
      const fetchCards = await axios.get(
        `https://api.tcgdex.net/v2/en/cards?name=${inputSearch}`
      );
      setCardsResult(fetchCards.data);
      console.log(fetchCards.data);
    };

    getPokemonCards();
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form>
        <input onChange={(e) => setInputSearch(e.target.value)}></input>
        <button onClick={onPokemonSearch}>Search</button>
      </form>
      <div className="flex justify-center items-center flex-wrap">
        {cardsResult.map((card) => (
          <div>
            {card?.image && (
              <CardBanner
                cardName={card.name}
                cardImage={`${card.image}/high.jpg`}
                cardId={card.id}
                key={card.id}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
