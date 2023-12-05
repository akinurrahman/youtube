import React from "react";
import { FaGreaterThan } from "react-icons/fa";

import { formatCount } from "../../utils/formatCount";
const ChannelTopSection = ({ statistics }) => {
  const avatar = statistics?.items[0]?.snippet?.thumbnails?.default?.url;
  const channelName = statistics?.items[0]?.snippet?.title;
  const subsCount =
    statistics?.items[0] &&
    formatCount(statistics?.items[0]?.statistics?.subscriberCount);
  const coverImg =
    statistics?.items[0]?.brandingSettings?.image?.bannerExternalUrl;
  const customUrl = statistics?.items[0]?.snippet?.customUrl;
  const description = statistics?.items[0]?.snippet?.localized?.description;
  const videoCount =
    statistics?.items[0] &&
    formatCount(statistics?.items[0]?.statistics?.videoCount);

  return (
    <div className="space-y-3">
      <div>
        <img
          src={coverImg}
          alt="Channel Cover"
          className="h-[60px] w-full rounded-lg object-cover sm:h-[115px] md:h-[128px] lg:h-[176px] xl:h-[213px] "
        />
      </div>

      <div className=" flex items-center">
        <div>
          <img
            src={avatar}
            alt=""
            className="mr-3 max-w-[60px] rounded-full sm:max-w-[110px] lg:max-w-[145px]"
          />
        </div>
        <div className="">
          <h2 className="text-[24px] font-bold">{channelName}</h2>
          <p className="text-xs text-gray-700 sm:text-sm">{`${customUrl} • ${subsCount} Subscribers • ${videoCount} Videos`}</p>
          <div className="  mr-[16.5rem] hidden items-center sm:flex">
            <p className="mt-2 line-clamp-2 text-sm text-gray-700">
              {description}
            </p>
            {/* <p className="ml-3">
              <FaGreaterThan size={10} className="text-gray-700 " />
            </p> */}
          </div>
          <button className="mt-3  hidden w-[33%] rounded-3xl bg-black py-2 text-white sm:block">
            Subscribe
          </button>
        </div>
      </div>

      <div className=" flex items-center sm:hidden">
        <p className="line-clamp-2 text-sm text-gray-700">{description}</p>
        {/* <p className="ml-3">
          <FaGreaterThan size={10} className="text-gray-700 " />
        </p> */}
      </div>

      <div className=" sm:hidden">
        <button className="w-full rounded-3xl bg-black py-2 text-white">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default ChannelTopSection;
