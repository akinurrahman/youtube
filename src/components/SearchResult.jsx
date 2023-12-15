import React, { useEffect } from "react";
import { calculateTimeAgo } from "../helpers/calculateTimeAgo";
import { formatCount } from "../helpers/formatCount";
import useApi from "../hooks/useApi";
import { NavLink } from "react-router-dom";

import { formatDuration } from "../helpers/formatDuration";

const SearchResult = ({ video }) => {
  const { fetchData: fetchVideoStats, data: videoStats } = useApi();
  const { fetchData: fetchChannelStats, data: channelStats } = useApi();

  // todo : try using a dummy cannel cover if not avaible using nullish operator
  // Destructure video data
  const thumbnail = video?.snippet?.thumbnails?.medium?.url || "";
  const channelName = video?.snippet?.channelTitle || "";
  const title = video?.snippet?.title || "";
  const channelId = video?.snippet?.channelId || "";
  const publishedAt = video?.snippet?.publishedAt || "";
  const timeAgo = publishedAt && calculateTimeAgo(publishedAt);
  // we will get either videoID or channelID or PlayListID from video.id
  const isVideo = video?.id?.videoId || "";
  const isChannel = video?.id?.channelId || "";

  // API call to get videoStats like : duration, viewCount, likeCount
  useEffect(() => {
    if (isVideo) {
      const url = "videos";
      const params = {
        part: "statistics,contentDetails",
        id: isVideo,
      };
      fetchVideoStats(url, params);
    }
  }, [isVideo]);

  // Destructure videoStats
  const rawDuration = videoStats?.items?.[0]?.contentDetails?.duration || "";
  const rawViewCount = videoStats?.items?.[0]?.statistics?.viewCount || "";

  // Formatting values
  const duration =
    rawDuration === "P0D" ? "Live" : rawDuration && formatDuration(rawDuration);
  const viewCount = rawViewCount && formatCount(rawViewCount);

  // -------------------------Video stats Ends here-------------------------

  // API call to get channelStats : customUrl, description, avatar, subsCount
  useEffect(() => {
    if (channelId) {
      const url = "channels";
      const params = {
        part: "snippet,statistics",
        id: channelId,
      };
      fetchChannelStats(url, params);
    }
  }, [channelId]);

  // Destructure channelStats
  const customUrl = channelStats?.items?.[0]?.snippet?.customUrl || "";
  const description =
    channelStats?.items?.[0]?.snippet?.localized?.description || "";
  const avatar =
    channelStats?.items?.[0]?.snippet?.thumbnails?.default?.url || "";
  const subscriberCount =
    channelStats?.items?.[0]?.statistics?.subscriberCount || "";
  const subsCount = subscriberCount ? formatCount(subscriberCount) : "";
  // ---------------------------Channel Stats Ends Here-------------------------------------

  return (
    <div>
      {isChannel ? (
        <NavLink
          to={`/channel/${channelId}`}
          className="mx-8 my-4  flex gap-2 space-x-10 sm:mx-5 sm:justify-start  lg:mx-[187px]"
        >
          <img
            src={thumbnail}
            alt=""
            className="aspect-square h-[100px] rounded-full sm:h-[125px]"
          />
          <div className="space-y-1">
            <h2 className="text-lg font-medium">{title}</h2>
            <p className=" text-sm leading-none">{customUrl}</p>
            <p className=" text-sm leading-none ">{subsCount} subscriber</p>

            <button
              className="rounded-3xl bg-black px-5 py-2 text-white "
              style={{ marginTop: "8px" }}
            >
              Subscribe
            </button>
          </div>
        </NavLink>
      ) : (
        <NavLink to={`/watch/${isVideo}`}>
          <div className="mt-4 gap-4 sm:flex md:mx-5 lg:mx-[187px]">
            {/* col - 1  */}
            <div className=" img-container relative text-white">
              <img
                src={thumbnail}
                alt=""
                className=" w-full sm:min-w-[320px] sm:rounded-xl "
              />
              <p className="absolute bottom-2  right-3 z-10 rounded-md bg-black bg-opacity-70 px-2">
                {duration}
              </p>
            </div>
            {/* col-2 */}
            <div className="mx-2 mt-2 flex items-center sm:hidden">
              <NavLink to={`/channel/${channelId}`}>
                <img
                  src={avatar}
                  alt=""
                  className="mr-3 max-w-[40px] rounded-full "
                />
              </NavLink>
              <div>
                <div className="line-clamp-2 font-semibold leading-none">
                  {title}
                </div>
                <p className="line-clamp-1 text-gray-700">
                  <NavLink to={`/channel/${channelId}`}>{channelName}</NavLink>{" "}
                  • {viewCount} • {timeAgo}
                </p>
              </div>
            </div>
            {/* show this for column 2 when size is small */}
            <div className="mt-1 hidden flex-col sm:flex ">
              <h2 className="mb-1 line-clamp-2 font-semibold ">{title}</h2>
              <p className="mb-2 line-clamp-1 text-gray-700">
                {viewCount} • {timeAgo}
              </p>
              <NavLink
                to={`/channel/${channelId}`}
                className="mb-2 line-clamp-1  flex items-center text-gray-700"
              >
                <img
                  src={avatar}
                  alt=""
                  className="mr-3 max-w-[25px] rounded-full "
                />
                <span>{channelName}</span>
              </NavLink>
              <p className="line-clamp-2 text-gray-600 ">{description}</p>
            </div>
          </div>
        </NavLink>
      )}
    </div>
  );
};

export default SearchResult;
