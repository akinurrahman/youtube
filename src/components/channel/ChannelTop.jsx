import React from "react";
import { formatCount } from "../../helpers/formatCount";
import { useParams } from "react-router-dom";
import { useChannelsQuery } from "../../api/youtubeService";

const ChannelTop = () => {
  const { channelId } = useParams();

  // Fetch channel statistics using RTK Query
  const { data: statistics } = useChannelsQuery({
    part: "snippet,statistics,brandingSettings",
    id: channelId,
  });

  // Extract necessary information from the fetched data
  const avatar =
    statistics?.items?.[0]?.snippet?.thumbnails?.default?.url || "N/A";
  const channelName = statistics?.items?.[0]?.snippet?.title || "N/A";
  const rawSubs = statistics?.items?.[0]?.statistics?.subscriberCount || "N/A";
  const subsCount = rawSubs && formatCount(rawSubs);
  const coverImg =
    statistics?.items?.[0]?.brandingSettings?.image?.bannerExternalUrl ||
    "/assets/COVER NOT FOUND.png";
  const customUrl = statistics?.items?.[0]?.snippet?.customUrl || "N/A";
  const description =
    statistics?.items?.[0]?.snippet?.localized?.description || "N/A";
  const rawVideoCount = statistics?.items?.[0]?.statistics?.videoCount || "N/A";
  const videoCount = rawVideoCount && formatCount(rawVideoCount);

  return (
    <div className="space-y-3 mx-5">
      {/* Display Channel Cover */}
      <div>
        <img
          src={coverImg}
          alt="Channel Cover"
          className="h-[60px] w-full rounded-lg object-cover sm:h-[115px] md:h-[128px] lg:h-[176px] xl:h-[213px] "
        />
      </div>

      {/* Channel Information */}
      <div className="flex items-center">
        <div>
          {/* Display Channel Avatar */}
          <img
            src={avatar}
            alt=""
            className="mr-3 max-w-[60px] rounded-full sm:max-w-[110px] lg:max-w-[145px]"
          />
        </div>
        <div className="">
          {/* Display Channel Name, Subscribers, Custom URL, and Video Count */}
          <h2 className="text-[24px] font-bold">{channelName}</h2>
          <p className="text-xs text-gray-700 sm:text-sm">{`${customUrl} • ${subsCount} Subscribers • ${videoCount} Videos`}</p>
          {/* Display Channel Description */}
          <div className="mr-[16.5rem] hidden items-center sm:flex">
            <p className="mt-2 line-clamp-2 text-sm text-gray-700">
              {description}
            </p>
          </div>
          {/* Subscribe Button (Visible on larger screens) */}
          <button className="mt-3 hidden w-[33%] rounded-3xl bg-black py-2 text-white sm:block">
            Subscribe
          </button>
        </div>
      </div>

      {/* Channel Description (Visible on smaller screens) */}
      <div className="flex items-center sm:hidden">
        <p className="line-clamp-2 text-sm text-gray-700">{description}</p>
      </div>

      {/* Subscribe Button (Visible on smaller screens) */}
      <div className="sm:hidden">
        <button className="w-full rounded-3xl bg-black py-2 text-white">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default ChannelTop;
