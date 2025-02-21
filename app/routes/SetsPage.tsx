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
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Disclaimer */}
        <p className="text-center text-gray-400 text-xs mb-4">
          I will not add a 'filter by year' feature because that would require
          me to update the app constantly, and this is just a homework project.
          The sets however, will always be updated automatically as soon as a
          new set is released. (thanks to TcgDex API)
        </p>

        {/* Search Section */}
        <div className="mb-12 px-2 md:px-6 py-4 bg-gray-900 rounded-2xl shadow-xl">
          <form className="flex items-center w-full gap-1 md:gap-3">
            <input
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
              placeholder="Search for a set..."
              className="flex-1 bg-gray-800 text-white rounded-xl px-4 py-3 md:px-6 md:py-4 
        border-2 border-gray-700 focus:border-purple-500 focus:ring-2
        focus:ring-purple-500 outline-none transition-all text-sm min-w-0"
            />
            <button
              onClick={onSetSearch}
              className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3 md:px-8 md:py-4
        rounded-xl font-bold hover:from-purple-700 hover:to-blue-700
        transition-all transform hover:scale-105 text-sm md:text-base 
        whitespace-nowrap flex-shrink-0 max-w-fit"
            >
              Search
            </button>
          </form>
        </div>

        {/* Sets Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-gray-900 rounded-2xl">
          {(isUserSearching ? searchedSets : sets).map((set) => (
            <Link
              to={`/sets/${set.id}`}
              key={set.id}
              className="hover:scale-105 transition-transform"
            >
              <SetBanner
                setTitle={set.name}
                cardAmount={set.cardCount.total}
                imageUrl={set.logo ? `${set.logo}.png` : FallbackImageErrorIcon}
              />
            </Link>
          ))}
        </div>

        {/* No Results Message */}
        {noSetFound && (
          <div className="mt-12 text-center p-6 bg-gray-900 rounded-xl">
            <span className="text-xl font-bold text-red-400">
              No sets found
            </span>
            <p className="mt-2 text-gray-400">
              Try adjusting your search terms
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
