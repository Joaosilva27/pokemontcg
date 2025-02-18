interface SetBannerProps {
  imageUrl: string;
  setTitle: string;
}

export default function SetBanner({ imageUrl, setTitle }: SetBannerProps) {
  return (
    <div>
      <img src={imageUrl} className="w-30 h-15 object-contain" />
      <span>{setTitle}</span>
    </div>
  );
}
