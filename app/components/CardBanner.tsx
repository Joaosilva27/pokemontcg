interface CardBannerProps {
  cardImage: string;
  cardName: string;
  onClick?: () => void;
}

export default function CardBanner({
  cardImage,
  cardName,
  onClick,
}: CardBannerProps) {
  return (
    <div
      className="m-5 flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
      onClick={onClick}
    >
      <img src={cardImage} className="w-30 h-40 object-contain" />
      <span className="text-sm max-w-30 text-center">{cardName}</span>
    </div>
  );
}
