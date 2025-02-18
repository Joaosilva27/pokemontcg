interface SetBannerProps {
  imageUrl: string;
  setTitle: string;
}

export default function SetBanner({ imageUrl, setTitle }: SetBannerProps) {
  return (
    <div>
      <img src={imageUrl} />
      <span>{setTitle}</span>
    </div>
  );
}
