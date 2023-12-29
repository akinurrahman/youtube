import React, { useEffect, useState } from "react";
import { useSearchQuery } from "../../api/youtubeService";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../redux/features/infoSlice";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Suggestions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchQuery } = useSelector((state) => state.info);

  // search suggestions
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 400);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchQuery]);

  // Conditionally use the useSearchQuery hook based on debouncedQuery
  const searchQueryResult = debouncedQuery
    ? useSearchQuery({
        part: "snippet",
        maxResults: 10,
        type: "suggest",
        q: debouncedQuery,
      })
    : { data: null };

  // Extract the suggestions from the searchQueryResult
  const suggestions = searchQueryResult.data;

  const handleNavigate = (destination, e) => {
    e.stopPropagation();
    navigate(destination);
    dispatch(setSearchQuery(""));
  };

  const closeSuggestions = () => {
    dispatch(setSearchQuery(""));
  };

  return (
    <section onClick={() => closeSuggestions()}>
      {/* search suggestions */}
      {searchQuery && (
        <div className="fixed  top-0 z-50 flex h-fit w-screen  justify-center ">
          <div className="mt-[50px] w-full space-y-3 bg-white p-6 shadow-lg  sm:w-[70%] sm:rounded-2xl md:mt-[60px] md:w-[60%] lg:w-[50%] xl:w-[40%]">
            {suggestions?.items?.map((suggestion, index) => {
              return (
                <div
                  onClick={(e) =>
                    handleNavigate(`/search/${suggestion.snippet.title}`, e)
                  }
                  className="  flex cursor-pointer items-center gap-3  font-semibold"
                  key={index}
                >
                  <p>
                    <IoIosSearch size={20} />
                  </p>
                  <p className="line-clamp-1">{suggestion.snippet.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default Suggestions;
