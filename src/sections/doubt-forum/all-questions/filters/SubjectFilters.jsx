import EachOption from "../../../../components/common/multi-select/EachOption";
import MultiSelect from "../../../../components/common/multi-select/MultiSelect";
import useGetData from "../../../../hooks/useGetData";
import { useDispatch, useSelector } from "react-redux";
import { separateSubTopLos } from "../../../../utils/doubt-forum/separateSubTopLos";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  setAllPoints,
  setAllSubjects,
  setAllTopics,
  setFilteredPoints,
  setFilteredSubjects,
  setFilteredTopics,
} from "../../../../redux/slices/doubt-forum/doubtForumSubjects";
import {
  setSelectedPoints,
  setSelectedSubjects,
  setSelectedTopics,
} from "../../../../redux/slices/doubt-forum/doubtForumQuestionsFilters";
import { useResponsive } from "../../../../hooks/useResponsive";

const SubjectFilters = () => {
  const { course } = useSelector((state) => state.course);
  console.log("course", course);
  const {
    allSubjects,
    allTopics,
    allPoints,
    filteredSubjects,
    filteredTopics,
    filteredPoints,
  } = useSelector((state) => state.doubtForumSubjects);

  const { selectedSubjects, selectedTopics, selectedPoints } = useSelector(
    (state) => state.doubtForumQuestionsFilters
  );

  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const handleSubjectChange = (data) => {
    let temp = [];
    dispatch(setSelectedSubjects(data));
    for (let i = 0; i < data?.length; i++) {
      const subject = data[i];
      const exists = allSubjects.find((s) => s.id === subject.value);
      temp.push(exists?.Subjects);
    }

    let selected = [];
    let unSelected = [];

    for (let i = 0; i < allSubjects?.length; i++) {
      const subject = allSubjects[i];
      const exists = data.find((s) => s.value === subject.id);
      if (exists) {
        selected.push(subject);
      } else {
        unSelected.push(subject);
      }
    }

    dispatch(setFilteredSubjects([...selected, ...unSelected]));

    if (data?.length === 0) {
      dispatch(setFilteredTopics(allTopics));
    } else {
      dispatch(setFilteredTopics(temp?.flat()));
    }
  };

  const handleTopicChange = (data) => {
    dispatch(setSelectedTopics(data));
    let temp = [];
    for (let i = 0; i < data?.length; i++) {
      const topic = data[i];
      const exists = allTopics.find((t) => t.id === topic.value);
      temp.push(exists?.Subjects);
    }

    let selected = [];
    let unSelected = [];

    for (let i = 0; i < filteredTopics?.length; i++) {
      const topic = filteredTopics[i];
      const exists = data.find((t) => t.value === topic.id);
      if (exists) {
        selected.push(topic);
      } else {
        unSelected.push(topic);
      }
    }

    dispatch(setFilteredTopics([...selected, ...unSelected]));

    if (temp?.length === 0) {
      dispatch(setFilteredPoints(allPoints));
    } else {
      dispatch(setFilteredPoints(temp?.flat()));
    }
  };
  const handlePointChange = (data) => {
    dispatch(setSelectedPoints(data));

    let selected = [];
    let unSelected = [];

    for (let i = 0; i < filteredPoints?.length; i++) {
      const point = filteredPoints[i];
      const exists = data.find((p) => p.value === point.id);
      if (exists) {
        selected.push(point);
      } else {
        unSelected.push(point);
      }
    }

    dispatch(setFilteredPoints([...selected, ...unSelected]));
  };

  const { data, loading, error } = useGetData(
    course?.course?.id
      ? `doubtforum/subjects?courseId=${course?.course?.id}`
      : null
  );

  const { isMobile } = useResponsive();

  useEffect(() => {
    if (data) {
      const { points, subjects, topics } = separateSubTopLos(data);
      dispatch(setFilteredPoints(points));
      dispatch(setFilteredSubjects(subjects));
      dispatch(setFilteredTopics(topics));
      dispatch(setAllSubjects(subjects));
      dispatch(setAllTopics(topics));
      dispatch(setAllPoints(points));
    }
  }, [data, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    navigate(`/error/${params?.combination}/${params?.phone}`);
    return;
  }

  return (
    <div className="w-full flex items-center lg:space-x-4 space-x-2">
      <div className="w-full">
        <MultiSelect
          className={"bg-white text-sm lg:text-base"}
          values={selectedSubjects}
          onChange={handleSubjectChange}
          id={"subject-dropdown"}
          placeholder={isMobile ? "Subjects" : "Select Subjects"}
        >
          {filteredSubjects?.map((subject) => (
            <EachOption
              key={subject.id}
              name={subject.name}
              value={subject.id}
            />
          ))}
        </MultiSelect>
      </div>
      <div className="w-full">
        <MultiSelect
          className={"bg-white text-sm lg:text-base"}
          onChange={handleTopicChange}
          values={selectedTopics}
          id={"topic-dropdown"}
          placeholder={isMobile ? "Topics" : "Select Topics"}
        >
          {filteredTopics?.map((topic) => (
            <EachOption key={topic.id} name={topic.name} value={topic.id} />
          ))}
        </MultiSelect>
      </div>
      <div className="w-full">
        <MultiSelect
          className={"bg-white text-sm lg:text-base"}
          onChange={handlePointChange}
          values={selectedPoints}
          id={"los-dropdown"}
          placeholder={isMobile ? "LOS" : "Select LOS"}
        >
          {filteredPoints?.map((point) => (
            <EachOption key={point.id} name={point.name} value={point.id} />
          ))}
        </MultiSelect>
      </div>
    </div>
  );
};

export default SubjectFilters;
