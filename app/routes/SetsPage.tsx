import { useEffect, useState } from "react";
import SetBanner from "~/components/SetBanner";
import axios from "axios";
import FallbackImageErrorIcon from "../icons/tcgIcon.png";
import { Link } from "react-router";

export default function SetsPage() {
  const [sets, setSets] = useState<any>([]);
  const [searchedSets, setSearchedSets] = useState<any>([]);
  const [inputSearch, setInputSearch] = useState<any>();
  const [noSetFound, setNoSetFound] = useState<boolean>(false);
  const [isUserSearching, setIsUserSearching] = useState<boolean>(false);

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

  const onSetSearch = (e) => {
    e.preventDefault();

    const getPokemonCards = async () => {
      if (inputSearch != "") {
        setIsUserSearching(false);
      }
      const fetchCards = await axios.get(
        `https://api.tcgdex.net/v2/en/sets?name=${inputSearch}`
      );
      setSearchedSets(fetchCards.data);
      setNoSetFound(false);
      setIsUserSearching(true);
      console.log(fetchCards.data);
      if (fetchCards.data.length == 0) {
        setNoSetFound(true);
      }
    };

    getPokemonCards();
    setInputSearch("");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h3 className="text-xs text-center">
        I will not add a 'filter by year' feature because that would require me
        to update the app constantly, and this is just a homework project.{" "}
        <br></br>
        The sets however, will always be updated automatically as soon as a new
        set is released (thanks to TcgDex API).
      </h3>
      <form className="flex items-center justify-center mt-3">
        <input
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          placeholder="Search for a set..."
          className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></input>
        <button
          onClick={onSetSearch}
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 ml-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Search
        </button>
      </form>
      {isUserSearching == false ? (
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
      ) : (
        <div className="flex flex-wrap m-6 justify-center items-center">
          {searchedSets.map((set) => (
            <Link to={`/sets/${set.id}`}>
              <SetBanner
                setTitle={set.name}
                cardAmount={set.cardCount.total}
                imageUrl={set.logo ? `${set.logo}.png` : FallbackImageErrorIcon}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
