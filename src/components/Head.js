import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import store from "../utils/store";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchCache = useSelector((store) => store.search);
  // console.log("searchCache", searchCache);

  const dispatch = useDispatch();

  /**
   * searchCache = {
   *   "iphone": ["iphone 11", "iphone 12", "iphone 13"],
   * }
   * searchQuery = "iphone"
   */

  useEffect(() => {
    // Api Call

    // make an api call afer every key press
    // but if the difference between 2 api call is < 200ms
    // decline the api call

    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestion();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestion = async () => {
    // console.log("searchQuery", searchQuery);
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    // console.log("print json", json[1]);
    setSuggestions(json[1]);

    // update cache
    dispatch(cacheResults({
      [searchQuery]: json[1],
      // "iphone": [1,2,3]
      
    }))
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-8 cursor-pointer"
          alt="menu"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALoAAACUCAMAAAATdsOFAAAAaVBMVEX///8iICEkHyEOCwyop6jc3NxjYmPs6+tNS0wSDw98e3wDAAAXFBXw7/DNzMwhGx4PBAi5ubl2dXbU1NQWDxL5+fnk5OSXlpeMjIyioqIwLi+ysrImJCQ1NDWCgoIdGhs/Pj/Dw8NaWVp0m0awAAABpklEQVR4nO3b3W6CQBCGYYcVFBd1wR+s2m7b+7/IFhoUUqy2mcxJ3yceTMYNfhrWk2EnEwAAAAAAAACwszSnFHxXLjJjVakTvnbeGfPFYaeQfFMUYi7Km0L0OtgnF/FPCtGfvEiSJNbRpwrRU8nto+fHlUL0yemcb7fb3NTzVGObfm7Uw8LYYaWTHAAAAAAAAAAA/MVuZkxrMLB/yUMzzAwhXAabw/pe2z3S7tdFlWok32U+rjsi8VrKerxej9WDJfHGkq6KPtsrRC9DO3xsNcO1G/VYOxmUv2iLuJNC9Nr1rp4M6m9tGW8/+DWutdLI9+S7YWbSvrr6Mkptwj7e7l9luET6s1mv8asv5z6OfuhIfaMt3Z301b4fPfq5yj7dZPll9wcXRv4eXK9s6/DjktC/yvWd3uoi03i64dMsXRlLZzrJAQAAAAAAAADAHyzLqbFSaTSwOjpv7bXUSD47uyjW3OtGIfrUmQcXpfOmzci3N/a0iq4x8n0L0f6obAwqN3vlXbEtTOWuUjmNv6zf58bea40HMxr71JhWcAAAAAAAAAD4Nz4A2d9GQzdIFWEAAAAASUVORK5CYII="
        />
        <a href="/">
          <img
            className="h-8 mx-2"
            alt="youtube-logo"
            src="https://t4.ftcdn.net/jpg/07/32/01/31/360_F_732013128_4w36WRSEpuF1oT9nK0Bd31GT353WqFYi.jpg"
          />
        </a>
      </div>
      <div className="col-span-10 px-10">
        <div>
          <input
            className="w-1/2 border border-gray-400 p-2 rounded-l-full"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={(e) => setShowSuggestions(true)}
            onBlur={(e) => setShowSuggestions(false)}
          />
          <button className="border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100">
            🔍
          </button>
        </div>
        {suggestions?.length > 0 && showSuggestions && (
          <div className="fixed bg-white py-2 px-2 w-[30rem] shadow-lg rounded-lg border border-gray-100">
            <ul>
              {suggestions.map((s) => (
                <li key={s} className="py-2 px-3 shadow-sm hover:bg-gray-100">
                  🔍 {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="col-span-1">
        <img
          className="h-8"
          alt="user"
          src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"
        />
      </div>
    </div>
  );
};

export default Head;
