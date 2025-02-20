import axios from "axios";
import { useState } from "react";
import CardBanner from "~/components/CardBanner";

export default function SearchPage() {
  const [inputSearch, setInputSearch] = useState<any>();
  const [cardsResult, setCardsResult] = useState<any>([]);
  const [selectedCard, setSelectedCard] = useState<any>(null);

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
    setInputSearch("");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form className="flex items-center justify-center">
        <input
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          placeholder="Search for a card..."
          className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></input>
        <button
          onClick={onPokemonSearch}
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 ml-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Search
        </button>
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
                onClick={() => setSelectedCard(card)}
              />
            )}
          </div>
        ))}
      </div>

      {selectedCard && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="relative max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`${selectedCard.image}/high.jpg`}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              alt={selectedCard.name}
            />
            <button
              className="absolute top-0 right-0 m-4 text-white text-2xl hover:text-gray-300"
              onClick={() => setSelectedCard(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
