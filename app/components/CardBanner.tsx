interface CardBannerProps {
  cardImage: string;
  cardName: string;
  cardId: string;
  onClick?: () => void;
}

export default function CardBanner({
  cardImage,
  cardName,
  onClick,
  cardId,
}: CardBannerProps) {
  return (
    <div className="flex flex-col items-center mb-2">
      <div
        className="mt-5 ml-5 mr-5 flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
        onClick={onClick}
      >
        <img src={cardImage} className="w-30 h-40 object-contain" />
        <span className="text-sm max-w-30 text-center">{cardName}</span>
      </div>
      <a href={`/cards/${cardId}`}>
        <span className="text-gray-600 bg-transparent border border-gray-300 hover:border-gray-400 focus:outline-none hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 font-medium rounded-full px-2 py-0.5 text-xs transition duration-150 ease-in-out">
          See card details
        </span>
      </a>
    </div>
  );
}
