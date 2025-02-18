import { useEffect, useState } from "react";
import SetBanner from "~/components/SetBanner";
import axios from "axios";
import TCGdex from "@tcgdex/sdk";

export default function SetsPage() {
  const [sets, setSets] = useState<any>([]);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get("https://api.tcgdex.net/v2/en/sets");
        setSets(response.data);
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
      <div>
        <SetBanner setTitle="test" />
      </div>
    </div>
  );
}
