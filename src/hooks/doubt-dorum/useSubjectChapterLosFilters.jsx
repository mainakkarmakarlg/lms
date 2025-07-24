// import { useEffect } from "react";
// import { useSelector } from "react-redux";

// const useSubjectChapterLosFilters = () => {
//   const {
//     allSubjects,
//     allChapters,
//     allLos,
//     filteredSubjects,
//     filteredTopics,
//     filteredPoints,
//   } = useSelector((state) => state.doubtForumsubjects);

//   const { selectedSubjects, selectedTopics, selectedPoints } = useSelector(
//     (state) => state.doubtForumQuestionsFilters
//   );

//   useEffect(() => {
//     if (selectedPoints?.length > 0) {
//       let topics = [];
//       let subjects = [];

//       for(let i = 0 ; i < allChapters?.length ; i++){
//         const chapter = allChapters[i];

//       }
//       return;
//     }

//     if (selectedTopics?.length > 0) {
//       return;
//     }

//     if (selectedSubjects?.length > 0) {
//       return;
//     }
//   }, [selectedPoints, selectedTopics, selectedSubjects]);

//   return <div></div>;
// };

// export default useSubjectChapterLosFilters;
