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
    <div className="flex flex-col items-center p-4 bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all m-2">
      <div className="w-32 h-20 mb-3 flex items-center justify-center bg-gray-700 rounded-lg p-2">
        <img
          src={imageUrl}
          className="w-full h-full object-contain"
          alt={setTitle}
        />
      </div>
      <span className="text-sm font-medium text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        {setTitle}
      </span>
      <span className="text-xs text-gray-400 mt-1">{cardAmount} cards</span>
    </div>
  );
}
