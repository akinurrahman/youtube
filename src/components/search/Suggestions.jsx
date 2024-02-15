import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getYouTubeData } from "../../api/queries";
import { setSearchQuery } from "../../redux/features/infoSlice";

const Suggestions = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state) => state.info);

  // State for debounced search query
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Effect for debouncing search query
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 600);

    // Cleanup function to clear timeout on unmount or query change
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchQuery]);

  // Hook for navigation
  const navigate = useNavigate();

  // Query to fetch search suggestions from YouTube API
  const { data: suggestions } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () =>
      getYouTubeData({
        endpoint: "search",
        queryParams: {
          part: "snippet",
          maxResults: 10,
          type: "suggest",
          q: debouncedQuery,
        },
      }),
    staleTime: 1000 * 60 * 5,
    enabled: !!debouncedQuery,
  });

  // Function to handle navigation to search results page
  const handleNavigate = (destination, e) => {
    e.stopPropagation(); // Prevent event propagation
    navigate(destination); // Navigate to search results page
    dispatch(setSearchQuery("")); // Clear search query in Redux store
  };

  // Render search suggestions
  return (
    <>
      {searchQuery && suggestions && (
        <section className={`mx-4 space-y-2 py-4`}>
          {suggestions?.items?.map((suggestion, index) => {
            return (
              <div
                onClick={(e) =>
                  handleNavigate(`/search/${suggestion.snippet.title}`, e)
                }
                className="flex cursor-pointer items-center gap-3 font-semibold"
                key={index}
              >
                <p>
                  <IoIosSearch size={20} />
                </p>
                <p className="line-clamp-1">{suggestion.snippet.title}</p>
              </div>
            );
          })}
        </section>
      )}
    </>
  );
};

export default Suggestions;
