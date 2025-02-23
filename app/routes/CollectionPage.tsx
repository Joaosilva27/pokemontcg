import { useEffect, useState } from "react";
import CardBanner from "~/components/CardBanner";

export default function CollectionPage() {
  const [collection, setCollection] = useState<any[]>([]);
  const [selectedCard, setSelectedCard] = useState<any>(null);

  useEffect(() => {
    const loadDataFromLocalStorage = () => {
      try {
        const data = localStorage.getItem("pokemonCards");
        // Ensure we always return an array
        return data ? JSON.parse(data) : [];
      } catch (error) {
        console.error("Error loading data:", error);
        return [];
      }
    };

    const savedCards = loadDataFromLocalStorage();
    // Verify we have an array before setting state
    if (Array.isArray(savedCards)) {
      setCollection(savedCards);
    } else {
      // Handle invalid data format
      console.warn("Invalid data format in localStorage, resetting collection");
      localStorage.removeItem("pokemonCards");
      setCollection([]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pl-1 mt-6">
      {/* Disclaimer */}
      <p className="text-center text-gray-400 text-xs mb-4">
        Your favorite cards are saved to your device's local storage. Please do
        not use incognito mode.
      </p>
      <h1 className="text-3xl font-bold mb-8 text-center">
        Your Card Collection
      </h1>

      {collection?.length === 0 ? (
        <div className="text-center text-gray-400">
          Your collection is empty. Start adding cards from the search page!
        </div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {collection?.map((card) => (
            <div className="m-2">
              <CardBanner
                key={card?.id}
                cardName={card?.name}
                cardImage={`${card?.image}/high.jpg`}
                cardId={card?.id}
                cardData={card}
                onClick={() => setSelectedCard(card)}
                isInCollection
                onRemove={() => {
                  // Update local state to trigger re-render
                  const updated = collection.filter((c) => c.id !== card?.id);
                  setCollection(updated);
                }}
              />
            </div>
          ))}
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
                src={`${selectedCard?.image}/high.jpg`}
                className="max-h-[90vh] object-contain"
                alt={selectedCard?.name}
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
