import { useEffect } from "react";
import Container from "../components/common/Container";
import SubjectSelector from "../sections/quizes/practice-quiz/SubjectSelector";
import { getSocket } from "../utils/socket";

const PracticeQuizHome = () => {
  useEffect(() => {
    const socket = getSocket();
    socket?.emit("pause-practice-attempt");
  }, []);

  return (
    <Container className="h-full flex flex-col justify-center ">
      <SubjectSelector />
    </Container>
  );
};

export default PracticeQuizHome;
