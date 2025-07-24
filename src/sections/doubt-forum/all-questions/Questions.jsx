import { useCallback, useEffect, useRef, useState } from "react";
import EachQuestion from "./questions/EachQuestion";
import Loader from "../../../components/common/Loader";
import NoItems from "../../../components/common/NoItems";
import { fetchQuestions } from "../../../apiCalls/doubt-forum/questions";
import { useDispatch, useSelector } from "react-redux";
import {
  appendQuestions,
  setQuestions,
  setHasMore,
} from "../../../redux/slices/doubt-forum/doubtForumQuestions";
import { generateQuestionFilterQuery } from "../../../utils/doubt-forum/all-questions/generateQuestionFilterQuery";
import InfiniteScroll from "../../../components/common/InfiniteScroll";

const Questions = () => {
  const { accessToken } = useSelector((state) => state.user);
  const {
    selectedSubjects,
    selectedTopics,
    selectedPoints,
    questionType,
    sortOption,
    searchText,
  } = useSelector((state) => state.doubtForumQuestionsFilters);
  const { questions, hasMore } = useSelector(
    (state) => state.doubtForumQuestions
  );

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const page = useRef(0);

  const getQuestions = useCallback(async () => {
    const query = generateQuestionFilterQuery(
      selectedSubjects,
      selectedTopics,
      selectedPoints,
      questionType,
      sortOption,
      searchText
    );
    const url = `/doubtforum?${query}${page.current > 0 ? `&page=${page.current}` : ""}`;
    const response = await fetchQuestions(url, accessToken);
    if (response?.status === 200 || response?.status === 201) {
      if (response?.data?.length < 10) {
        dispatch(setHasMore(false));
      }
      page.current += 1;
      dispatch(appendQuestions(response?.data));
    }
  }, [
    accessToken,
    selectedSubjects,
    selectedTopics,
    selectedPoints,
    questionType,
    searchText,
    sortOption,
    dispatch,
  ]);

  const getInitialQuestions = useCallback(async () => {
    setLoading(true);
    dispatch(setQuestions([]));
    dispatch(setHasMore(false));
    const query = generateQuestionFilterQuery(
      selectedSubjects,
      selectedTopics,
      selectedPoints,
      questionType,
      sortOption,
      searchText
    );
    const url = `/doubtforum?${query}`;
    const response = await fetchQuestions(url, accessToken);
    if (response?.status === 200 || response?.status === 201) {
      page.current = 1;
      if (response?.data?.length >= 10) {
        dispatch(setHasMore(true));
      }
      dispatch(setQuestions(response?.data));
    }
    setLoading(false);
  }, [
    accessToken,
    selectedSubjects,
    selectedTopics,
    selectedPoints,
    questionType,
    searchText,
    sortOption,
    dispatch,
  ]);

  useEffect(() => {
    getInitialQuestions();
  }, [
    getInitialQuestions,
    selectedSubjects,
    selectedTopics,
    selectedPoints,
    searchText,
    questionType,
    sortOption,
  ]);

  return (
    <div className="relative w-full xl:h-[calc(100%-60px-10px)]  h-[calc(100%-90px-10px)] overflow-y-scroll py-3 flex flex-col space-y-3 px-1">
      {loading ? (
        <div className="h-full w-full">
          <Loader fullHeight={true} loadingTexts={["Loading..."]} />
        </div>
      ) : questions && questions?.length === 0 ? (
        <NoItems
          image="/doubt-forum/no-questions-found.png"
          text="Be the first to ask a question"
        />
      ) : (
        <div className="w-full">
          <InfiniteScroll
            loader={<Loader fullHeight={false} />}
            endMessage="No more questions"
            fetchData={getQuestions}
            hasMore={hasMore}
          >
            <div className="w-full flex flex-col space-y-3">
              {questions?.map((question) => (
                <EachQuestion key={question?.id} question={question} />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default Questions;
