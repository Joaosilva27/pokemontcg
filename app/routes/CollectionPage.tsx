import { useEffect, useState } from "react";
import CardBanner from "~/components/CardBanner";

export default function CollectionPage() {
  const [collection, setCollection] = useState<any[]>([]);

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
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Your Card Collection
      </h1>

      {collection.length === 0 ? (
        <div className="text-center text-gray-400">
          Your collection is empty. Start adding cards from the search page!
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {collection.map((card) => (
            <CardBanner
              key={card.id}
              cardName={card.name}
              cardImage={`${card.image}/high.jpg`}
              cardId={card.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
