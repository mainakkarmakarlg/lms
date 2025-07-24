import Select from "../../../common/select/Select";
import EachOption from "../../../common/select/EachOption";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedSource,
  setSelectedSourceQuestion,
  setSources,
} from "../../../../redux/slices/doubt-forum/doubtforumEditDoubt";
import { useCallback, useEffect } from "react";
import {
  fetchSourceQuestions,
  fetchSources,
} from "../../../../apiCalls/doubt-forum/questions";

const SourcesDropdowns = () => {
  const { sources, sourceQuestions, selectedSource, selectedSourceQuestion } =
    useSelector((state) => state.doubtForumEditDoubt);
  const { accessToken } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleSourcesChange = (data) => {
    dispatch(setSelectedSource(data));
  };

  const sourcesQuestionChange = (data) => {
    dispatch(setSelectedSourceQuestion(data));
  };

  const getSources = useCallback(async () => {
    const response = await fetchSources(accessToken);
    if (response?.status === 200 || response?.status === 201) {
      dispatch(setSources(response?.data));
    }
  }, [dispatch, accessToken]);

  const getSourceQuestions = useCallback(
    async (sourceId) => {
      const response = await fetchSourceQuestions(sourceId, accessToken);
      if (response?.status === 200 || response?.status === 201) {
        dispatch(setSelectedSourceQuestion(response?.data));
      }
    },
    [dispatch, accessToken]
  );

  useEffect(() => {
    getSources();
  }, [getSources, accessToken]);

  useEffect(() => {
    if (selectedSource) {
      getSourceQuestions();
    }
  }, [selectedSource, getSourceQuestions, accessToken]);

  return (
    <div className="w-full flex items-center space-x-3">
      <Select
        placeholder="Select Source"
        onChange={handleSourcesChange}
        value={selectedSource}
        id="point"
        width="100%"
        disabled={!sources?.length}
      >
        {sources.map((point) => (
          <EachOption key={point?.id} name={point?.name} value={point?.id} />
        ))}
      </Select>

      <Select
        placeholder="Select Source"
        onChange={sourcesQuestionChange}
        value={selectedSourceQuestion}
        id="point"
        width="100%"
        disabled={!sourceQuestions?.length}
      >
        {sourceQuestions.map((point) => (
          <EachOption key={point?.id} name={point?.name} value={point?.id} />
        ))}
      </Select>
    </div>
  );
};

export default SourcesDropdowns;
