import { useEffect, useState } from "react";
import SetBanner from "~/components/SetBanner";
import axios from "axios";
import FallbackImageErrorIcon from "../icons/tcgIcon.png";
import { Link } from "react-router";

export default function SetsPage() {
  const [sets, setSets] = useState<any>([]);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get("https://api.tcgdex.net/v2/en/sets");
        setSets(response.data.reverse());
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching card:", error);
      }
    };

    fetchCard();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="mb-6">Browse through all the sets</h2>
      <div className="flex flex-wrap m-6 justify-center items-center">
        {sets.map((set) => (
          <Link to={`/sets/${set.id}`}>
            <SetBanner
              setTitle={set.name}
              cardAmount={set.cardCount.total}
              imageUrl={set.logo ? `${set.logo}.png` : FallbackImageErrorIcon}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
