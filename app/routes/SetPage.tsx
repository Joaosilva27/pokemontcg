import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function SetPage() {
  const params = useParams();
  const [setCards, setSetCards] = useState<any>([]);

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
          <h1 className="text-xl font-bold">{setCards?.name}</h1>
          <span>Release date: {setCards?.releaseDate}</span>
          <span>Cards: {setCards?.cardCount?.total}</span>
        </div>
        <div className="flex flex-col">
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
      </div>
    </div>
  );
}
