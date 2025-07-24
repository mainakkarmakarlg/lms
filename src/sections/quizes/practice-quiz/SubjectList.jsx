import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import SubjectItem from "./SubjectItem";
import { setSelectedSearchId } from "../../../redux/slices/practice-quiz/searchSubjects";

export default function SubjectList({ subjects, type }) {
  const { selectedSearchId } = useSelector((state) => state.searchSubjects);
  const subjectRefs = useRef({}); // Store references for subjects
  const listContainerRef = useRef(null); // Reference for the scroll container
  const dispatch = useDispatch();

  // Scroll inside the red div without moving the whole page
  useEffect(() => {
    if (
      selectedSearchId &&
      subjectRefs.current[selectedSearchId] &&
      listContainerRef.current
    ) {
      const container = listContainerRef.current;
      const selectedItem = subjectRefs.current[selectedSearchId];

      // Adjust scrolling to keep the selected item in view inside the container
      container.scrollTo({
        top: selectedItem.offsetTop - container.offsetTop - 20, // Adjust for padding/margins
        behavior: "smooth",
      });

      dispatch(setSelectedSearchId(null)); // Reset after scrolling
    }
  }, [selectedSearchId, dispatch]);

  return (
    <div
      ref={listContainerRef} // Attach the container reference
      className="w-full h-full flex flex-col space-y-2  overflow-y-auto scrollbar pb-20"
    >
      {subjects?.map(
        (subject) =>
          subject?.questionCount > 0 && (
            <div
              key={subject.id}
              ref={(el) => (subjectRefs.current[subject.id] = el)}
            >
              <SubjectItem subject={subject} type={type} />
            </div>
          )
      )}
    </div>
  );
}
