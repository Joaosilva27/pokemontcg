import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CardBanner from "~/components/CardBanner";

export default function SetPage() {
  const params = useParams();
  const [setCards, setSetCards] = useState<any>([]);
  const [selectedCard, setSelectedCard] = useState<any>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axios.get(
          `https://api.tcgdex.net/v2/en/sets/${params.setId}`
        );
        setSetCards(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCards();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Set Header */}
        <div className="bg-gray-900 rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {setCards.logo ? (
              <img
                src={`${setCards.logo}.png`}
                className="w-40 h-20 object-contain bg-gray-800 p-2 rounded-xl"
              />
            ) : (
              <div className="w-40 h-20 bg-gray-800 animate-pulse rounded-xl" />
            )}

            <div className="space-y-3 flex-1">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {setCards?.name}
              </h1>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <span className="text-gray-400">Series:</span>{" "}
                  {setCards?.serie?.name}
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <span className="text-gray-400">Release Date:</span>{" "}
                  {setCards?.releaseDate}
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <span className="text-gray-400">Abbreviation:</span>{" "}
                  {setCards?.abbreviation?.official || "N/A"}
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <span className="text-gray-400">Total Cards:</span>{" "}
                  {setCards?.cardCount?.total}
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
              { label: "First Edition", value: setCards?.cardCount?.firstEd },
              { label: "Holo Cards", value: setCards?.cardCount?.holo },
              { label: "Normal Cards", value: setCards?.cardCount?.normal },
              { label: "Official Cards", value: setCards?.cardCount?.official },
              { label: "Reverse Cards", value: setCards?.cardCount?.reverse },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-800 p-3 rounded-lg text-sm">
                <span className="text-gray-400">{label}:</span>{" "}
                {value || "None"}
              </div>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {setCards?.cards?.map((card) => (
            <CardBanner
              key={card.id}
              cardName={card.name}
              cardImage={`${card.image}/high.jpg`}
              onClick={() => setSelectedCard(card)}
              cardId={card.id}
            />
          ))}
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
    </div>
  );
}
