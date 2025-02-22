interface CardBannerProps {
  cardImage: string;
  cardName: string;
  cardId: string;
  onClick?: () => void;
  cardData: any;
}

export default function CardBanner({
  cardImage,
  cardName,
  onClick,
  cardId,
  cardData,
}: CardBannerProps) {
  // In CardBanner component
  const onSaveDataToLocalStorage = () => {
    try {
      const existingCards = JSON.parse(
        localStorage.getItem("pokemonCards") || "[]"
      );

      if (!Array.isArray(existingCards)) {
        // Handle existing invalid format
        localStorage.setItem("pokemonCards", JSON.stringify([cardData]));
        return;
      }

      const isDuplicate = existingCards.some((c: any) => c.id === cardData.id);
      if (!isDuplicate) {
        const updatedCards = [...existingCards, cardData];
        localStorage.setItem("pokemonCards", JSON.stringify(updatedCards));
      }
    } catch (error) {
      console.error("Error saving to localStorage:", error);
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
      <div className="flex items-center justify-center">
        <a
          href={`/cards/${cardId}`}
          className="mt-2 bg-gradient-to-r from-purple-600 to-blue-600 text-xs px-3 py-1 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
        >
          See details
        </a>
        <span onClick={() => onSaveDataToLocalStorage(cardData)}>Add</span>
      </div>
    </div>
  );
}
