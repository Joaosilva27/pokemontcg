import axios from "axios";
import { useState } from "react";
import CardBanner from "~/components/CardBanner";

export default function SearchPage() {
  const [inputSearch, setInputSearch] = useState<any>();
  const [cardsResult, setCardsResult] = useState<any>([]);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [noCardFound, setNoCardFound] = useState(false);

  const onPokemonSearch = (e) => {
    e.preventDefault();

    const getPokemonCards = async () => {
      if (inputSearch != "") {
        const fetchCards = await axios.get(
          `https://api.tcgdex.net/v2/en/cards?name=${inputSearch}`
        );
        setCardsResult(fetchCards.data);
        setNoCardFound(false);
        console.log(fetchCards.data);
        if (fetchCards.data.length == 0) {
          setNoCardFound(true);
        }
      }
    };

    getPokemonCards();
    setInputSearch("");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {/* Search Form  */}
      <form className="flex items-center gap-2 md:gap-4 w-full max-w-md px-4 md:px-0">
        <input
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          placeholder="Search for a card..."
          className="flex-1 bg-gray-800 text-white rounded-xl px-4 py-3 
                border-2 border-gray-700 focus:border-purple-500 focus:ring-2
                focus:ring-purple-500 outline-none transition-all text-sm md:text-base"
        />
        <button
          onClick={onPokemonSearch}
          className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3
                rounded-xl font-bold hover:from-purple-700 hover:to-blue-700
                transition-all transform hover:scale-105 text-sm md:text-base"
        >
          Search
        </button>
      </form>

      {/* Card List  */}
      <div className="flex justify-center items-center flex-wrap">
        {cardsResult.map((card) => (
          <div className="ml-1.5 mt-2" key={card.id}>
            {card?.image && (
              <CardBanner
                cardName={card.name}
                cardImage={`${card.image}/high.jpg`}
                cardId={card.id}
                onClick={() => setSelectedCard(card)}
              />
            )}
          </div>
        ))}
        {noCardFound && (
          <div className="flex justify-center">
            <span className="mt-12 text-center font-bold">
              No results were found. Please try using fewer letters or check
              your spelling.
            </span>
          </div>
        )}
      </div>

      {/* Card Modal */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="relative bg-gradient-to-r from-purple-600 to-blue-600 p-1 rounded-2xl max-w-[95vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gray-900 rounded-2xl p-4">
              <img
                src={`${selectedCard.image}/high.jpg`}
                className="max-h-[90vh] object-contain"
                alt={selectedCard.name}
              />
              <button
                className="absolute top-2 right-2 bg-gradient-to-r from-purple-600 to-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold hover:from-purple-700 hover:to-blue-700 transition-all"
                onClick={() => setSelectedCard(null)}
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
