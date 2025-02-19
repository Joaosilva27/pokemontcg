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
      <div className="flex items-center">
        <img
          src={`${setCards.logo}.png`}
          className="object-contain w-40 h-20 mr-5"
        />
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">{setCards.name}</h1>
          <span></span>
        </div>
      </div>
    </div>
  );
}
