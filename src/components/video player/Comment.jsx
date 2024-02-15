import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { MdInsertComment } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";

import { formatCount } from "../../helpers/formatCount";
import { calculateTimeAgo } from "../../helpers/calculateTimeAgo";
import { getYouTubeData } from "../../api/queries";

const Comment = () => {
  // Extracting videoID from URL params
  const { videoID } = useParams();
  const navigate = useNavigate();
  const [showComment, setShowComment] = useState(false);

  // Fetching comments using InfiniteQuery
  const { data, isLoading, error, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["comments", videoID],
      queryFn: ({ pageParam }) =>
        getYouTubeData({
          endpoint: "commentThreads",
          queryParams: {
            part: "snippet",
            videoId: videoID,
            maxResults: 20,
            pageToken: pageParam,
          },
        }),
      getNextPageParam: (lastPage) => lastPage.nextPageToken,
    });

  // Flattening comments array
  const comments = data?.pages.flatMap((page) => page.items) || [];

  // Function to navigate to channel page
  const handleNavigate = (path) => {
    navigate(path);
  };

  // Extracting first comment's avatar and text
  const userAvatarUrl =
    comments[0]?.snippet.topLevelComment.snippet.authorProfileImageUrl;
  const firstCommentText =
    comments[0]?.snippet.topLevelComment.snippet.textOriginal;

  // Function to render comments
  const renderComment = (comment, index) => {
    const {
      snippet: {
        topLevelComment: {
          snippet: {
            textOriginal,
            authorDisplayName,
            authorProfileImageUrl: avatar,
            likeCount,
            publishedAt,
            authorChannelId: { value: channelId },
          },
        },
        totalReplyCount,
      },
    } = comment;

    // Formats like count, total reply count, and calculates time ago
    const formattedLikeCount = likeCount && formatCount(likeCount);
    const formattedTotalReplyCount =
      totalReplyCount && formatCount(totalReplyCount);
    const timeAgo = publishedAt ? calculateTimeAgo(publishedAt) : "N/A";

    return (
      <section className="mx-2 my-6 flex gap-3" key={`${comment.id}/${index}`}>
        <div
          onClick={() => handleNavigate(`/channel/${channelId}`)}
          className="h-fit w-[45px]"
        >
          <img src={avatar} alt="" className="w-full rounded-full" />
        </div>

        <div className="w-5/6">
          <div className="mr-2 flex justify-between">
            <p>{authorDisplayName}</p>
            <p>{timeAgo}</p>
          </div>
          <p>{textOriginal}</p>

          <div className="flex justify-between">
            <p className="flex items-center">
              <AiOutlineLike className="mr-1" /> {formattedLikeCount}
              <AiOutlineDislike className="mx-3" />
              <MdInsertComment className="mr-1" />
              {formattedTotalReplyCount}
            </p>
            <p>
              <CiMenuKebab className="mr-2" />
            </p>
          </div>
          <p
            className={`my-2 text-center font-medium ${
              formattedTotalReplyCount ? "block" : "hidden"
            }`}
          >
            Show more replies
          </p>
        </div>
      </section>
    );
  };

  // Error state
  if (error) {
    console.log(error.message);
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {/* Toggle comment section */}
      <div
        className={`mx-2 mt-4 rounded-xl bg-gray-100 px-2 py-3 ${
          showComment && "hidden"
        } `}
        onClick={() => setShowComment((prev) => !prev)}
      >
        <p className="font-medium">Comments </p>
        <div className="mt-2 flex items-center gap-5">
          <img src={userAvatarUrl} alt="" className="w-[35px] rounded-full" />
          <p className="leading-none">{firstCommentText}</p>
        </div>
      </div>

      {/* Show all comments container */}
      <div
        className={`${
          showComment ? "block" : "hidden"
        } my-5 h-[100vh] overflow-y-auto rounded-2xl   shadow-[-3px_-5px_5px_0px_#000000BF]`}
      >
        {/* Comment header */}
        <div className="sticky top-0 z-10 flex justify-between border-b-2 bg-white px-4 py-5">
          <p className="text-xl font-semibold">Comments</p>
          <p>
            <RxCross2
              size={25}
              onClick={() => setShowComment((prev) => !prev)}
              className="cursor-pointer"
            />
          </p>
        </div>
        <hr className="my-[2px] border-t border-gray-300" />

        {/* Add comment input field */}
        <div className="mx-2 my-6 flex gap-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTitWq1r4a-luuWlmEJxHZZKGdBLDGP1439qQ&usqp=CAU"
            alt=""
            className="w-[45px] rounded-full"
          />
          <input
            type="text"
            className="w-full rounded-lg border border-gray-300 px-3 focus:border-gray-500 focus:outline-none"
            placeholder="Add a comment..."
          />
        </div>

        {/* Render comments */}

        {comments &&
          !error &&
          comments?.map((comment, index) => renderComment(comment, index))}
        {hasNextPage && (
          <div className="w-full   text-center font-bold text-white">
            <button
              onClick={fetchNextPage}
              className="rounded-lg bg-gray-500 px-4 py-2 hover:bg-gray-400"
            >
              Fetch More Comments
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Comment;
