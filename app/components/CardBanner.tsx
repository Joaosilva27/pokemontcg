import { useState } from "react";

interface CardBannerProps {
  cardImage: string;
  cardName: string;
  cardId: string;
  onClick?: () => void;
  cardData: any;
  isInCollection?: boolean;
  onRemove?: () => void;
}

export default function CardBanner({
  cardImage,
  cardName,
  onClick,
  cardId,
  cardData,
  isInCollection = false,
  onRemove,
}: CardBannerProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const onSaveDataToLocalStorage = () => {
    try {
      const existingCards = JSON.parse(
        localStorage.getItem("pokemonCards") || "[]"
      );

      if (!Array.isArray(existingCards)) {
        localStorage.setItem("pokemonCards", JSON.stringify([cardData]));
        return;
      }

      const isDuplicate = existingCards.some((c: any) => c.id === cardData.id);
      if (!isDuplicate) {
        const updatedCards = [...existingCards, cardData];
        localStorage.setItem("pokemonCards", JSON.stringify(updatedCards));
        triggerAnimation();
      }
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  const onRemoveDataFromLocalStorage = () => {
    try {
      const existingCards = JSON.parse(
        localStorage.getItem("pokemonCards") || "[]"
      );

      if (Array.isArray(existingCards)) {
        const updatedCards = existingCards.filter(
          (c: any) => c.id !== cardData.id
        );
        localStorage.setItem("pokemonCards", JSON.stringify(updatedCards));
        onRemove?.();
      }
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  };

  return (
    <div className="flex flex-col items-center mb-4 group">
      <div
        className="relative cursor-pointer transition-transform hover:scale-105 w-full flex flex-col"
        onClick={onClick}
      >
        <div className="bg-gray-800 p-2 rounded-xl shadow-lg">
          <img
            src={cardImage}
            className="w-30 h-40 object-contain mx-auto"
            alt={cardName}
          />
        </div>
        <span className="text-sm text-center mt-2 font-medium text-gray-300">
          {cardName}
        </span>
      </div>
      <div className="flex items-center justify-center gap-2">
        <a
          href={`/cards/${cardId}`}
          className="mt-2 bg-gradient-to-r from-purple-600 to-blue-600 text-xs px-3 py-1 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
        >
          See details
        </a>
        {isInCollection ? (
          <button
            onClick={onRemoveDataFromLocalStorage}
            className="mt-2 bg-gradient-to-r from-red-600 to-orange-600 text-xs px-3 py-1 rounded-lg hover:from-red-700 hover:to-orange-700 transition-all"
          >
            Remove
          </button>
        ) : (
          <button
            onClick={onSaveDataToLocalStorage}
            className={`mt-2 text-xs px-3 py-1 rounded-lg transition-all ${
              isAnimating ? "animate-[star-pop_0.5s_ease-out]" : ""
            } bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600`}
          >
            ⭐
          </button>
        )}
      </div>
    </div>
  );
}
