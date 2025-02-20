interface SetBannerProps {
  imageUrl: string;
  setTitle: string;
  cardAmount: string;
}

export default function SetBanner({
  imageUrl,
  setTitle,
  cardAmount,
}: SetBannerProps) {
  return (
    <div className="flex flex-col justify-center items-center m-5">
      <img src={imageUrl} className="w-26 h-15 object-contain" />
      <span className="text-sm">{setTitle}</span>
      <span className="text-xs">{cardAmount} cards</span>
    </div>
  );
}
