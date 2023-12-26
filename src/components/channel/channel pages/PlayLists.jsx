// import React, { useEffect } from "react";
// import ChannelLayout from "../ChannelLayout";
// import useApi from "../../../hooks/useApi";
// import { NavLink, useParams } from "react-router-dom";
// import { RiMenuUnfoldFill } from "react-icons/ri";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setLastChannelId,
//   setIsPlayListFetched,
//   setPlayLists,
// } from "../../../redux/features/ChannelPlaylistSlice";
// import useChannelStatistics from "../../../hooks/useChannelStatistics";

// const PlayLists = () => {
//   useChannelStatistics();
//   const dispatch = useDispatch();
//   const { channelId } = useParams();
//   const { isPlayListFetched, lastChannelId, playLists } = useSelector(
//     (state) => state.channelPlaylists,
//   );

//   // Fetching playlists data from an API
//   const { fetchData: fetchPlaylistFromApi, data: fetchedPlaylists } = useApi();

//   useEffect(() => {
//     if (lastChannelId !== channelId) {
//       dispatch(setIsPlayListFetched(false));
//       dispatch(setLastChannelId(channelId));
//     }
//   }, [channelId, lastChannelId, dispatch]);
//   useEffect(() => {
//     if (channelId && !isPlayListFetched) {
//       dispatch(setIsPlayListFetched(true));
//       const url = "playlists";
//       const params = {
//         part: "snippet,contentDetails",
//         channelId: channelId,
//         maxResults: 20,
//       };
//       fetchPlaylistFromApi(url, params);
//     }
//   }, [channelId, isPlayListFetched]);

//   useEffect(() => {
//     if (fetchedPlaylists) {
//       dispatch(setPlayLists(fetchedPlaylists));
//     }
//   }, [fetchedPlaylists]);

//   // Render playlists based on the fetched data
//   const renderPlaylists = () => {
//     return playLists?.items?.map((playlist, index) => {
//       // Extract playlist details
//       const snippet = playlist?.snippet;
//       const title = snippet?.title || "N/A";
//       const thumbnail = snippet?.thumbnails?.medium?.url || "N/A";
//       const channelName = snippet?.channelTitle || "N/A";
//       const playlistId = playlist?.id;
//       const itemCount = playlist?.contentDetails?.itemCount || 0;

//       return (
//         <NavLink
//           to={`/playlist/${playlistId}`}
//           className="flex sm:flex-col"
//           key={playlistId + index}
//         >
//           <div className="relative">
//             <img
//               src={thumbnail}
//               alt="thumbnail"
//               className="mr-2 max-w-[155px] rounded-lg sm:w-full sm:max-w-full"
//             />
//             {/* Display item count if it's greater than 0 */}
//             {itemCount > 0 && (
//               <div className="absolute bottom-2 right-3 z-10 flex items-center gap-[6px] rounded-sm bg-black bg-opacity-70 px-2 text-white">
//                 <RiMenuUnfoldFill />
//                 <span className="pb-[2px]">{itemCount}</span>
//               </div>
//             )}
//           </div>
//           {/* Playlist details */}
//           <div>
//             <h2 className="line-clamp-2 font-semibold leading-tight sm:mt-1">
//               {title}
//             </h2>
//             <p className="line-clamp-1 text-sm font-light sm:hidden">
//               {channelName} • Playlist
//             </p>
//             <p className="line-clamp-1 hidden text-sm font-light sm:block">
//               View full Playlist
//             </p>
//           </div>
//         </NavLink>
//       );
//     });
//   };

//   return (
//     <ChannelLayout>
//       <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//         {renderPlaylists()}
//       </div>
//     </ChannelLayout>
//   );
// };

// export default PlayLists;

import React from "react";
import ChannelLayout from "../ChannelLayout";

const PlayLists = () => {
  return <ChannelLayout>this is playlists</ChannelLayout>;
};

export default PlayLists;
