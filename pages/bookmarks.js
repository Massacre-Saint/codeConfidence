// import React, { useEffect, useState } from 'react';
// import BookmarksList from '../components/containers/BookmarksList';
// import { useAuth } from '../utils/context/authContext';
// import { getBookmarks } from '../utils/data/bookmarks';
// import { getAllGoals } from '../utils/data/goals';
// import { getResources } from '../utils/data/resources';
// import { getAllTopics } from '../utils/data/topics';

// function Bookmarks() {
//   const [bookmarks, setBookmarks] = useState([]);
//   const [resources, setResources] = useState([]);
//   const [filteredResources, setFilteredResources] = useState([]);
//   const { user } = useAuth();
//   const fetchAndSetBookmarksForState = async () => {
//     const bookmarkData = await getBookmarks();
//     setBookmarks(bookmarkData);
//   };
//   const fetchAndSetResourcesForUserGoalsAndTopicsState = () => {
//     Promise.all([getAllGoals(user), getAllTopics(user)])
//       .then(([goals, topics]) => {
//         const allTopics = topics;
//         const allGoals = goals;
//         const topicsAndGoals = allGoals.concat(allTopics);
//         getResources(topicsAndGoals).then(setResources);
//       });
//   };

//   useEffect(() => {
//     fetchAndSetBookmarksForState();
//     fetchAndSetResourcesForUserGoalsAndTopicsState();
//     setFilteredResources(resources);
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user]);

//   return (
//     <div className="view-all_container bookmark-page">
//       <div className="top-container block center">
//         <div className="hero-font">Bookmarks</div>
//       </div>
//       <div className="sub-nav-space-between">
//         <div className="search-bar_container">
//           {/* <SearchBar array={bookmarks} setArray={setFilteredBookmarks} /> */}
//         </div>
//         <div>
//           <button type="button" onClick={fetchAndSetBookmarksForState}>
//             Sync
//           </button>
//         </div>
//       </div>
//       <div className="show-all_container">
//         <div className="show-all-list-container">
//           {bookmarks[0] ? (
//             <BookmarksList
//               bookmarks={bookmarks}
//               resources={filteredResources}
//             />
//           ) : (
//             <div>
//               <h2>Oops, you can&apos;t use this feature yet! Download intructions provided in documentation.</h2>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>

//   );
// }

// export default Bookmarks;
