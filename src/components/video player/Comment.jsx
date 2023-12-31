import React, { useEffect, useState } from "react";
import { useCommentThreadsQuery } from "../../api/youtubeService";
import { NavLink, useParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { MdInsertComment } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";

import { formatCount } from "../../helpers/formatCount";
import { calculateTimeAgo } from "../../helpers/calculateTimeAgo";

const Comment = () => {
  const { videoID } = useParams();
  const [showComment, setShowComment] = useState(false);
  const [firstCommentText, setFirstCommentText] = useState("");
  const [userAvatarUrl, setUserAvatarUrl] = useState("");

  const {
    data: comments,
    isLoading,
    error,
  } = useCommentThreadsQuery({
    part: "snippet",
    videoId: videoID,
    maxResults: 20,
  });

  useEffect(() => {
    if (comments?.items?.length > 0) {
      const firstComment = comments.items[0];
      const commentText =
        firstComment.snippet.topLevelComment.snippet.textOriginal;
      const avatarUrl =
        firstComment.snippet.topLevelComment.snippet.authorProfileImageUrl;

      setFirstCommentText(commentText);
      setUserAvatarUrl(avatarUrl);
    }
  }, [comments]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
        <p className="font-medium">Comments 2.2k</p>
        <div className="mt-2 flex items-center gap-5">
          <img src={userAvatarUrl} alt="" className="w-[35px] rounded-full" />
          <p className="leading-none">{firstCommentText}</p>
        </div>
      </div>

      {/* Show all comments container */}
      <div
        className={`${
          showComment ? "block" : "hidden"
        } my-4 h-[100vh] overflow-y-auto rounded-2xl  shadow-[-3px_-5px_5px_0px_#000000BF]`}
      >
        {/* Comment header */}
        <div className="sticky top-0 z-10 flex justify-between border-b-2 bg-white px-4 py-5">
          <p className="text-xl font-semibold">
            Comments <sup className="font-normal text-gray-800">2.2k</sup>
          </p>
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

        {/* Display comments */}
        {comments?.items?.map((currComment, index) => {
          // Checks for necessary data; skips this iteration if absent.
          if (
            !currComment ||
            !currComment.snippet ||
            !currComment.snippet.topLevelComment ||
            !currComment.snippet.topLevelComment.snippet
          )
            return null;

          // Destructures currComment's nested data.
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
          } = currComment;

          // Formats like count, total reply count, and calculates time ago
          const formattedLikeCount = likeCount && formatCount(likeCount);
          const formattedTotalReplyCount =
            totalReplyCount && formatCount(totalReplyCount);
          const timeAgo = publishedAt ? calculateTimeAgo(publishedAt) : "N/A";

          // Returns JSX for each comment
          return (
            <div
              className="mx-2 my-6 flex gap-3"
              key={`${currComment.id}/${index}`}
            >
              <NavLink to={`/channel/${channelId}`} className="h-fit w-[45px]">
                <img src={avatar} alt="" className="w-full rounded-full" />
              </NavLink>

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
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Comment;
