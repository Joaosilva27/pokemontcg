import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CardBanner from "~/components/CardBanner";

export default function SetPage() {
  const params = useParams();
  const [setCards, setSetCards] = useState<any>([]);
  const [selectedCard, setSelectedCard] = useState<any>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axios.get(
          `https://api.tcgdex.net/v2/en/sets/${params.setId}`
        );
        setSetCards(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCards();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="flex items-center flex-wrap justify-center">
        {setCards.logo ? (
          <img
            src={`${setCards.logo}.png`}
            className="object-contain w-40 h-20 mr-5"
          />
        ) : (
          <span>Loading...</span>
        )}

        <div className="flex flex-col m-3">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">{setCards?.name}</h1>
            <span className="text-xs">
              (From {setCards?.serie?.name} series.)
            </span>
          </div>
          <span>
            Abbreviation:{" "}
            {setCards?.abbreviation?.official
              ? setCards?.abbreviation?.official
              : "No abbreviation available"}
          </span>
          <span>Release date: {setCards?.releaseDate}</span>
          <span>Cards: {setCards?.cardCount?.total}</span>
        </div>
        <div className="flex flex-col m-3">
          <span>
            First Ed. Cards:{" "}
            {setCards?.cardCount?.firstEd != 0
              ? setCards?.cardCount?.firstEd
              : "None"}
          </span>
          <span>
            Holo Cards:{" "}
            {setCards?.cardCount?.holo != 0
              ? setCards?.cardCount?.holo
              : "None"}
          </span>
          <span>
            Normal Cards:{" "}
            {setCards?.cardCount?.normal != 0
              ? setCards?.cardCount?.normal
              : "None"}
          </span>
          <span>
            Official Cards:{" "}
            {setCards?.cardCount?.official != 0
              ? setCards?.cardCount?.official
              : "None"}
          </span>
          <span>
            Reverse Cards:{" "}
            {setCards?.cardCount?.reverse != 0
              ? setCards?.cardCount?.reverse
              : "None"}
          </span>
        </div>
        <div className="flex flex-wrap justify-center">
          {setCards?.cards?.map((card) => {
            return (
              <CardBanner
                cardName={card.name}
                cardImage={`${card.image}/high.jpg`}
                onClick={() => setSelectedCard(card)}
                cardId={card.id}
                key={card.id}
              />
            );
          })}
        </div>
      </div>

      {/* Modal overlay */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="relative max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`${selectedCard.image}/high.jpg`}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              alt={selectedCard.name}
            />
            <button
              className="absolute top-0 right-0 m-4 text-white text-2xl hover:text-gray-300"
              onClick={() => setSelectedCard(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
