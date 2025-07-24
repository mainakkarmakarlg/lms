import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { loginSuccess, setSocketConnected } from "../redux/slices/user";
import { loginUser } from "../apiCalls/auth";
import Loader from "../components/common/Loader";
import { connectSocket, getSocket } from "../utils/socket";
import { getCombination } from "../apiCalls/quiz/user";
import { setCourse } from "../redux/slices/practice-quiz/course";
import { setIsCourseWatched } from "../redux/slices/app";
import { practiceQuizLoaderText } from "../constants/loaderText";

const MainLayout = () => {
  const { isAuthenticated, accessToken } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [showOutlet, setShowOutlet] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { phone } = params;

  const fetchCombination = useCallback(
    async (token) => {
      const socket = getSocket();
      if (token && params?.combination) {
        const response = await getCombination(
          `/user/combination?combinationId=${params?.combination}`,
          token
        );
        if (response.status === 200) {
          dispatch(setCourse(response.data));
          socket?.emit("watch-course", {
            courseId: Number(response?.data?.course?.id),
          });

          socket?.on("watch-course-success", () => {
            dispatch(setIsCourseWatched(true));
          });
        } else {
          navigate("/not-enrolled");
        }
      }
    },
    [dispatch, navigate, params?.combination]
  );

  const fetchUser = useCallback(async () => {
    await connectSocket();
    const socket = getSocket();
    const data = { phone };
    const response = await loginUser(data);
    if (response.status === 200) {
      dispatch(loginSuccess(response.data));

      socket?.emit("login", { token: response.data?.access_token });
      socket?.on("login-success", async () => {
        await fetchCombination(response.data?.access_token);

        setShowOutlet(true);
        dispatch(setSocketConnected(true));
      });

      socket?.on("session", () => {
        console.log("from session");
      });

      socket?.on("login-error", (data) => {
        console.log("error rhbh", data);
      });
      setLoading(false);
    } else {
      navigate("/not-enrolled");
    }
  }, [phone, dispatch, fetchCombination, navigate]);

  useEffect(() => {
    if (!isAuthenticated && !accessToken) {
      fetchUser();
    }
  }, [isAuthenticated, accessToken, fetchUser]);

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className="w-full h-full flex justify-center items-center select-none bg-[#f8f9fa]"
    >
      {loading ? (
        <Loader fullHeight={true} loadingTexts={practiceQuizLoaderText} />
      ) : (
        isAuthenticated && showOutlet && <Outlet />
      )}
    </div>
  );
};

export default MainLayout;
