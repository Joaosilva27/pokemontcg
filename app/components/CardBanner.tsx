interface CardBannerProps {
  cardImage: string;
  cardName: string;
}

export default function CardBanner({ cardImage, cardName }: CardBannerProps) {
  return (
    <div className="m-5 flex flex-col items-center">
      <img src={cardImage} className="w-30 h-40 object-contain" />
      <span className="text-sm max-w-30">{cardName}</span>
    </div>
  );
}
