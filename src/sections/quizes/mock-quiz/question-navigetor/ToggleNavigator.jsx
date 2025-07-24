import {
  setExpandedNavigatorQuestions,
  toggleQuestionNavigator,
} from "../../../../redux/slices/mock-quiz/mockQuestionNavigator";
import { useDispatch, useSelector } from "react-redux";
import { CgMenuGridO } from "react-icons/cg";
import Button from "../../../../components/common/Button";

const ToggleNavigator = () => {
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.mockQuestions);
  const toggle = () => {
    dispatch(toggleQuestionNavigator());
    dispatch(setExpandedNavigatorQuestions(questions));
  };
  return (
    <Button
      onClick={toggle}
      size="small"
      variant="outlined"
      startIcon={<CgMenuGridO />}
      //   className={`bg-white text-xl border  rounded-full cursor-pointer border-primary duration-300 px-3 py-1`}
    >
      {/* <CgMenuGridO className={`text-primary duration-300`} /> */}
    </Button>
  );
};

export default ToggleNavigator;
