import React, { useEffect } from "react";
import { BiLike, BiDislike } from "react-icons/bi";
import { TbShare3 } from "react-icons/tb";
import { HiDownload } from "react-icons/hi";
import { HiOutlineScissors } from "react-icons/hi2";
import { CiSaveDown1 } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "./Comment";
import { formatCount } from "../../helpers/formatCount";
import { useDispatch } from "react-redux";
import { setTitle } from "../../redux/features/infoSlice";
import { useQuery } from "@tanstack/react-query";
import { getYouTubeData } from "../../api/queries";

const VideoPlayback = () => {
  // Hooks
  const navigate = useNavigate();
  const { videoID } = useParams();
  const dispatch = useDispatch();

  // Fetch video information
  const { data: videoInfo } = useQuery({
    queryKey: ["videoInfo", videoID],
    queryFn: () =>
      getYouTubeData({
        endpoint: "videos",
        queryParams: {
          part: "snippet,contentDetails,statistics",
          id: videoID,
        },
      }),
    enabled: !!videoID,
    staleTime: 1000 * 60 * 5,
  });

  // Extract video details
  const title = videoInfo?.items?.[0]?.snippet?.title || "N/A";
  const rawLikeCount = videoInfo?.items?.[0]?.statistics?.likeCount || "N/A";
  const likeCount = rawLikeCount ? formatCount(rawLikeCount) : "N/A";
  const channelName = videoInfo?.items?.[0]?.snippet?.channelTitle || "N/A";
  const channelId = videoInfo?.items?.[0]?.snippet?.channelId || "";

  // Fetch channel information
  const { data: channelInfo } = useQuery({
    queryKey: ["channelInfo", channelId],
    queryFn: () =>
      getYouTubeData({
        endpoint: "channels",
        queryParams: {
          part: "snippet,statistics",
          id: channelId,
        },
      }),
    enabled: !!channelId,
    staleTime: 1000 * 60 * 5,
  });

  // Extract channel details
  const avatar =
    channelInfo?.items?.[0]?.snippet?.thumbnails?.default?.url || null;
  const rawSubs = channelInfo?.items?.[0]?.statistics?.subscriberCount || null;
  const subsCount = rawSubs ? formatCount(rawSubs) : null;

  // Dispatch video title for  recommendation generation.
  useEffect(() => {
    if (videoInfo) {
      dispatch(setTitle(title));
    }
  }, [videoInfo]);

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div>
      {/* Video player */}
      <iframe
        className="mt-3 aspect-video w-full rounded-[27px] p-4"
        src={`https://www.youtube.com/embed/${videoID}?autoplay=1`}
        title="YouTube video player"
        allowFullScreen
      ></iframe>

      {/* Video title */}
      <h2 className="line-clamp-2  px-4 font-bold text-gray-900 ">{title}</h2>

      {/* Channel info */}
      <div className="flex flex-col md:mr-2 md:flex md:flex-row md:justify-between">
        <div className="mt-3 flex items-center space-x-4">
          <div
            onClick={() => handleNavigation(`/channel/${channelId}`)}
            className="ml-4 cursor-pointer"
          >
            <img
              src={avatar}
              alt="channel logo"
              className="max-w-[40px] rounded-full"
            />
          </div>
          <div>
            <div
              onClick={() => handleNavigation(`/channel/${channelId}`)}
              className="font-bold"
            >
              {channelName}
            </div>
            <p className="text-sm text-gray-800">{subsCount} subscribers</p>
          </div>
          <button className="rounded-full bg-black px-4 py-2 font-bold text-white">
            Subscribe
          </button>
        </div>

        {/* Video actions */}
        <div className="ml-2 mt-4 flex items-center space-x-1">
          {/* Like button */}
          <div className="flex items-center  ">
            <button className="flex items-center  space-x-2 rounded-l-full bg-gray-100 py-2 pl-5 pr-3 hover:bg-gray-200">
              <BiLike size={20} />
              <span className="text-sm">{likeCount}</span>
            </button>
            {/* Dislike button */}
            <button className=" rounded-r-full border-l-2 border-gray-200 bg-gray-100  py-2 pl-3 pr-5 hover:bg-gray-200">
              <BiDislike size={20} />
            </button>
          </div>

          {/* Share button */}
          <button className="flex  items-center space-x-2 rounded-full bg-gray-100 px-3  py-2 hover:bg-gray-200">
            <TbShare3 size={20} /> <span className="">Share</span>
          </button>

          {/* Download button */}
          <button className="flex  items-center  space-x-2 rounded-full bg-gray-100 px-3  py-2  hover:bg-gray-200">
            <HiDownload size={20} /> <span>Download</span>
          </button>

          {/* Clip button */}
          <button className="hidden cursor-pointer items-center space-x-2 rounded-full bg-gray-100 px-3 py-2 hover:bg-gray-200 sm:flex md:hidden  ">
            <HiOutlineScissors size={20} /> <span>Clip</span>
          </button>

          {/* Save button */}
          <button className="hidden cursor-pointer items-center space-x-2 rounded-full bg-gray-100 px-3 py-2 hover:bg-gray-200 sm:flex md:hidden  2xl:flex">
            <CiSaveDown1 size={20} /> <span>Save</span>
          </button>

          {/* More button */}
          <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
            <span>•••</span>
          </button>
        </div>
      </div>
      {/* Comments section */}
      <Comment />
    </div>
  );
};

export default VideoPlayback;
