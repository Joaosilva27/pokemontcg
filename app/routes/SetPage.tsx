import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CardBanner from "~/components/CardBanner";

export default function SetPage() {
  const params = useParams();
  const [setData, setSetData] = useState<any>({});
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [inputSearch, setInputSearch] = useState<string>("");
  const [searchedCards, setSearchedCards] = useState<any[]>([]);
  const [noCardFound, setNoCardFound] = useState<boolean>(false);
  const [isUserSearching, setIsUserSearching] = useState<boolean>(false);

  useEffect(() => {
    const fetchSetData = async () => {
      try {
        const res = await axios.get(
          `https://api.tcgdex.net/v2/en/sets/${params.setId}`
        );
        setSetData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSetData();
  }, [params.setId]);

  const onCardSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const searchCards = async () => {
      if (inputSearch.trim() === "") {
        setIsUserSearching(false);
        setNoCardFound(false);
        return;
      }

      try {
        const { data } = await axios.get(
          `https://api.tcgdex.net/v2/en/cards?name=${inputSearch}&set=${params.setId}`
        );
        setSearchedCards(data);
        setNoCardFound(data.length === 0);
        setIsUserSearching(true);
      } catch (error) {
        console.error(error);
        setNoCardFound(true);
        setSearchedCards([]);
      }
    };

    searchCards();
    setInputSearch("");
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Set Header */}
        <div className="bg-gray-900 rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {setData.logo ? (
              <img
                src={`${setData.logo}.png`}
                className="w-40 h-20 object-contain bg-gray-800 p-2 rounded-xl"
                alt={setData.name}
              />
            ) : (
              <div className="w-40 h-20 bg-gray-800 animate-pulse rounded-xl" />
            )}

            <div className="space-y-3 flex-1">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {setData?.name}
              </h1>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <span className="text-gray-400">Series:</span>{" "}
                  {setData?.serie?.name}
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <span className="text-gray-400">Release Date:</span>{" "}
                  {setData?.releaseDate}
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <span className="text-gray-400">Abbreviation:</span>{" "}
                  {setData?.abbreviation?.official || "N/A"}
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <span className="text-gray-400">Total Cards:</span>{" "}
                  {setData?.cardCount?.total}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Count Details */}
        <div className="bg-gray-900 rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Card Distribution</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { label: "First Edition", value: setData?.cardCount?.firstEd },
              { label: "Holo Cards", value: setData?.cardCount?.holo },
              { label: "Normal Cards", value: setData?.cardCount?.normal },
              { label: "Official Cards", value: setData?.cardCount?.official },
              { label: "Reverse Cards", value: setData?.cardCount?.reverse },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-800 p-3 rounded-lg text-sm">
                <span className="text-gray-400">{label}:</span>{" "}
                {value || "None"}
              </div>
            ))}
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-12 px-2 md:px-6 py-4 bg-gray-900 rounded-2xl shadow-xl">
          <form
            onSubmit={onCardSearch}
            className="flex items-center w-full gap-1 md:gap-3"
          >
            <input
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
              placeholder="Search for a card..."
              className="flex-1 bg-gray-800 text-white rounded-xl px-4 py-3 md:px-6 md:py-4 
                border-2 border-gray-700 focus:border-purple-500 focus:ring-2
                focus:ring-purple-500 outline-none transition-all text-sm min-w-0"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3 md:px-8 md:py-4
                rounded-xl font-bold hover:from-purple-700 hover:to-blue-700
                transition-all transform hover:scale-105 text-sm md:text-base 
                whitespace-nowrap flex-shrink-0 max-w-fit"
            >
              Search
            </button>
          </form>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {(isUserSearching ? searchedCards : setData?.cards)?.map((card) => (
            <CardBanner
              key={card.id}
              cardName={card.name}
              cardImage={`${card.image}/high.jpg`}
              onClick={() => setSelectedCard(card)}
              cardId={card.id}
              cardData={card}
            />
          ))}
        </div>

        {noCardFound && (
          <div className="flex justify-center mt-4">
            <span className="text-center font-bold">
              No results were found. Please try using fewer letters or check
              your spelling.
            </span>
          </div>
        )}

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
    </div>
  );
}
