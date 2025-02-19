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
        <span className="text-xs">See card details</span>
      </a>
    </div>
  );
}
