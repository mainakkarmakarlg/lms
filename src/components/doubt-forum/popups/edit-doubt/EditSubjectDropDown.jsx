import { useEffect } from "react";
import Select from "../../../common/select/Select";
import { useDispatch, useSelector } from "react-redux";
import {
  filterPoints,
  filterTopics,
  setEditFallId,
  setPoints,
  setSelectedPoint,
  setSelectedSubject,
  setSelectedTopic,
  setSubjects,
  setTopics,
} from "../../../../redux/slices/doubt-forum/doubtforumEditDoubt";
import EachOption from "../../../common/select/EachOption";
import { findFallNumId } from "../../../../utils/doubt-forum/question/findFallNumId";

const SubjectsDropdowns = () => {
  const { allSubjects, allTopics, allPoints } = useSelector(
    (state) => state.doubtForumSubjects
  );
  const {
    selectedSubject,
    selectedTopic,
    selectedPoint,
    filteredSubjects,
    filteredTopics,
    filteredPoints,
  } = useSelector((state) => state.doubtForumEditDoubt);

  const dispatch = useDispatch();

  const handleSubjectChange = (data) => {
    dispatch(setSelectedSubject(data));
    dispatch(filterTopics({ subjectId: data, allSubjects }));
    const fallNumId = findFallNumId(data, allSubjects);
    if (fallNumId) {
      dispatch(setEditFallId(fallNumId));
    }
  };

  const handleTopicChange = (data) => {
    dispatch(setSelectedTopic(data));
    dispatch(filterPoints({ topicId: data, allTopics }));
    const fallNumId = findFallNumId(data, allTopics);
    if (fallNumId) {
      dispatch(setEditFallId(fallNumId));
    }
  };

  const handlePointChange = (data) => {
    dispatch(setSelectedPoint({ data }));
    const fallNumId = findFallNumId(data, allPoints);
    if (fallNumId) {
      dispatch(setEditFallId(fallNumId));
    }
  };

  useEffect(() => {
    dispatch(setSubjects(allSubjects));
    dispatch(setTopics(allTopics));
    dispatch(setPoints(allPoints));
  }, [dispatch, allSubjects, allTopics, allPoints]);

  return (
    <div className="w-full">
      <div className="flex flex-col w-full space-y-3">
        <Select
          placeholder="Select Subject"
          onChange={handleSubjectChange}
          value={selectedSubject}
          id="subject"
          width="100%"
        >
          {filteredSubjects?.map((subject) => (
            <EachOption
              key={subject?.id}
              name={subject?.name}
              value={subject?.id}
            />
          ))}
        </Select>

        <Select
          placeholder="Select Topic"
          onChange={handleTopicChange}
          value={selectedTopic}
          id="topic"
          width="100%"
        >
          {filteredTopics?.map((topic) => (
            <EachOption key={topic?.id} name={topic?.name} value={topic?.id} />
          ))}
        </Select>

        <Select
          placeholder="Select Point"
          onChange={handlePointChange}
          value={selectedPoint}
          id="point"
          width="100%"
        >
          {filteredPoints?.map((point) => (
            <EachOption key={point?.id} name={point?.name} value={point?.id} />
          ))}
        </Select>
      </div>
    </div>
  );
};

export default SubjectsDropdowns;
