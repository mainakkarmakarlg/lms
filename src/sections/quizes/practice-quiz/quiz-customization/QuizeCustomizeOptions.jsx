import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCustomCount,
  setCustomInputValue,
  setDificultyLevel,
  setErrorForValidCombination,
  setSelectedQuestionCount,
  setSelectedQuestionsTypes,
} from "../../../../redux/slices/practice-quiz/customizeOptions";
import getSelectedQuestionsTypes from "../../../../utils/quizes/practice-quiz/getSelectedQuestionsType";
import { getSelectedSubjectId } from "../../../../utils/quizes/practice-quiz/getSelectedSubjectsId";
import instance from "../../../../utils/instance";
import { twMerge } from "tailwind-merge";
import Tooltip from "../../../../components/common/Tooltip";
import { GoInfo } from "react-icons/go";

const QuizeCustomizeOptions = () => {
  const dispatch = useDispatch();
  const {
    selectedQuestionCount,
    selectedQuestionsTypes,
    dificultyLevel,
    customCount,
    customInputValue,
    errorForValidCombination,
  } = useSelector((state) => state.customizeOptions);
  const { course } = useSelector((state) => state.course);
  const { accessToken } = useSelector((state) => state.user);
  const { subjects } = useSelector((state) => state.quizSubjects);
  const [nestedCounts, setNestedCounts] = useState([]);

  const { questions, validCombination } = useMemo(() => {
    return getQuestionOptions(selectedQuestionCount, nestedCounts);
  }, [selectedQuestionCount, nestedCounts]);

  const getQuestionCountAPi = useCallback(
    async (body) => {
      const subjectIds = getSelectedSubjectId(subjects);
      if (!subjectIds.length) return;

      try {
        const { data } = await instance.post(
          `/practice/customizequestioncount`,
          { courseId: course?.course?.id, subjectIds, ...body },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        dispatch(
          setSelectedQuestionCount(
            data?.questionCount + data?.itemset?.reduce((a, b) => a + b, 0)
          )
        );
        setNestedCounts(data?.itemset);
      } catch (error) {
        console.error("Error fetching count:", error);
      }
    },
    [accessToken, course?.course?.id, dispatch, subjects]
  );

  function getQuestionOptions(totalQuestionCount, nestedCounts) {
    const nestedSum = nestedCounts.reduce((a, b) => a + b, 0);
    const normalQuestionPool = totalQuestionCount - nestedSum;

    const valid = new Set();

    // 1. Add only normal question counts
    for (let i = 1; i <= normalQuestionPool && i <= totalQuestionCount; i++) {
      valid.add(i);
    }

    // 2. Add valid combinations: each itemset + normal question
    for (const itemset of nestedCounts) {
      for (let i = 1; i <= normalQuestionPool; i++) {
        const total = itemset + i;
        if (total <= totalQuestionCount) valid.add(total);
      }
    }

    // 3. Add all subset sums of nestedCounts that are ≤ totalQuestionCount
    const n = nestedCounts.length;
    for (let mask = 1; mask < 1 << n; mask++) {
      let sum = 0;
      for (let i = 0; i < n; i++) {
        if (mask & (1 << i)) {
          sum += nestedCounts[i];
        }
      }
      if (sum <= totalQuestionCount) valid.add(sum);
    }

    // 4. Add combinations of nestedSum + normal questions only if ≤ total
    for (let i = 1; i <= normalQuestionPool; i++) {
      const total = nestedSum + i;
      if (total <= totalQuestionCount) valid.add(total);
    }

    const sorted = [...valid].sort((a, b) => a - b);

    // 5. Get up to 4 option steps
    let options;
    if (sorted.length <= 4) {
      options = sorted;
    } else {
      const step = sorted.length / 4;
      const indices = [
        Math.floor(step * 1) - 1,
        Math.floor(step * 2) - 1,
        Math.floor(step * 3) - 1,
        sorted.length - 1,
      ];
      options = [...new Set(indices.map((i) => sorted[Math.max(0, i)]))];
    }

    return { questions: options, validCombination: sorted };
  }

  useEffect(() => {
    getQuestionCountAPi({
      isIncorrect: getSelectedQuestionsTypes(
        "incorrect",
        selectedQuestionsTypes
      ),
      isFlagged: getSelectedQuestionsTypes("flagged", selectedQuestionsTypes),
      isUnattempted: getSelectedQuestionsTypes(
        "unattempted",
        selectedQuestionsTypes
      ),
      includeEasy: getSelectedQuestionsTypes("easy", dificultyLevel),
      includeMedium: getSelectedQuestionsTypes("medium", dificultyLevel),
      includeHard: getSelectedQuestionsTypes("hard", dificultyLevel),
      otherSubject: getSelectedQuestionsTypes("other", selectedQuestionsTypes),
    });
  }, [selectedQuestionsTypes, dificultyLevel, getQuestionCountAPi]);

  useEffect(() => {
    if (selectedQuestionCount > 0) {
      // console.log(questions[questions?.length - 1], "questions?.length - 1");
      if (!customInputValue)
        dispatch(
          setCustomCount(
            questions?.length > 0 && questions[questions?.length - 1]
          )
        );
    }
  }, [selectedQuestionCount, questions, customInputValue, dispatch]);

  const handleInputChange = (e) => {
    dispatch(setCustomInputValue(e.target.value));
    const value = Number(e.target.value);
    // setActiveTab(value);
    if (!value) return;
    const isValid = validCombination.includes(value);
    if (customCount) {
      dispatch(setCustomCount(""));
    }
    if (isValid) {
      dispatch(setErrorForValidCombination(""));
    } else if (!value || value <= 0 || value > selectedQuestionCount) {
      const nearestValues = getNearestValues(validCombination, value);
      if (nearestValues.length === 1) {
        dispatch(
          setErrorForValidCombination(
            `Entered value is not valid. Please enter ${nearestValues[0]}`
          )
        );
      } else if (nearestValues.length === 2) {
        dispatch(
          setErrorForValidCombination(
            `Entered value is not valid. Please enter ${nearestValues[0]} or ${nearestValues[1]}`
          )
        );
      } else {
        dispatch(setErrorForValidCombination("Entered value is not valid."));
      }
      return;
    } else {
      const nearestValues = getNearestValues(validCombination, value);
      if (nearestValues.length === 1) {
        dispatch(
          setErrorForValidCombination(
            `Entered value is not valid. Please enter ${nearestValues[0]}`
          )
        );
      } else if (nearestValues.length === 2) {
        dispatch(
          setErrorForValidCombination(
            `Entered value is not valid. Please enter ${nearestValues[0]} or ${nearestValues[1]}`
          )
        );
      } else {
        dispatch(setErrorForValidCombination("Entered value is not valid."));
      }
    }
  };

  function getNearestValues(arr, target) {
    console.log("arr", arr);
    console.log("target", target);
    if (!arr.length) return [];

    let less = null;
    let greater = null;
    const isPresent = arr?.includes(target);
    if (isPresent) {
      return [target];
    }
    for (let num of arr) {
      if (num < target) {
        if (less === null || target - num < target - less) {
          less = num;
        }
      } else if (num > target) {
        if (greater === null || num - target < greater - target) {
          greater = num;
        }
      }
    }

    // for (let num of arr) {
    //   if (num < target && (less === null || target - num < target - less)) {
    //     less = num;
    //   } else if (
    //     num > target &&
    //     (greater === null || num - target < greater - target)
    //   ) {
    //     greater = num;
    //   }
    // }

    // Only return values if both less and greater exist
    if (less !== null && greater !== null) {
      return [less, greater];
    } else if (less !== null) {
      return [less];
    } else if (greater !== null) {
      return [greater];
    } else {
      return [];
    }
  }

  const handleBlur = (e) => {
    //return if target value is empty
    if (!e.target.value) return;
    const value = Number(e.target.value);

    const isValid = validCombination.includes(value);
    if (isValid) {
      dispatch(setCustomInputValue(value));
    }
  };

  const handleQuestionCountChange = (value) => {
    // setActiveTab(value);
    if (errorForValidCombination) {
      dispatch(setErrorForValidCombination(""));
    }
    dispatch(setCustomCount(value));
    if (customInputValue) {
      dispatch(setCustomInputValue(""));
    }
  };

  const addType = (e) => {
    const { name, checked } = e.target;
    dispatch(
      setSelectedQuestionsTypes({
        name: name,
        value: checked,
      })
    );
  };

  const handleDefaultyLevel = (level) => {
    dispatch(setDificultyLevel({ name: level?.name, value: !level.value }));
  };
  const difficultyColors = [
    { bg: "bg-dark-blue/60", border: "border-dark-blue/60" },
    { bg: "bg-dark-blue/80", border: "border-dark-blue/80" },
    { bg: "bg-dark-blue", border: "border-dark-blue" },
  ];

  return (
    <div className="h-fit bg-white shadow-card rounded-lg p-2 sm:p-6 flex flex-col space-y-3 lg:space-y-6">
      <h2 className="text-xl lg:text-2xl font-semibold text-custom-black text-start  md:text-left">
        Customize Quiz
      </h2>

      <form className="w-full flex flex-col space-y-4">
        {/* Left Section */}

        <div className="w-full flex flex-wrap justify-between items-start text-xs md:text-base font-semibold">
          <label className="flex items-center space-x-2 cursor-pointer mr-4 mb-4">
            <input
              name="flagged"
              checked={getSelectedQuestionsTypes(
                "flagged",
                selectedQuestionsTypes
              )}
              type="checkbox"
              onChange={addType}
              className="cursor-pointer"
            />
            <span>Flagged questions</span>
            <Tooltip
              description={
                "Check this option to include flagged questions from the selected subject and topic."
              }
              position="top"
              classNames="text-center"
            >
              <GoInfo />
            </Tooltip>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer mr-4 mb-4">
            <input
              type="checkbox"
              name="incorrect"
              checked={getSelectedQuestionsTypes(
                "incorrect",
                selectedQuestionsTypes
              )}
              className="accent-blue-500"
              onChange={addType}
            />
            <span>Incorrect questions</span>
            <Tooltip
              description={
                "Check this option to include incorrect questions from the selected subject and topic."
              }
              position="top"
              classNames="text-center"
            >
              <GoInfo />
            </Tooltip>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer mr-4 mb-4">
            <input
              type="checkbox"
              name="unattempted"
              checked={getSelectedQuestionsTypes(
                "unattempted",
                selectedQuestionsTypes
              )}
              className="accent-blue-500"
              onChange={addType}
            />
            <span>Unattempted questions</span>
            <Tooltip
              description={
                "Check this option to attempt only unattempted questions from the selected subject and topic."
              }
              position="top"
              classNames="text-center"
            >
              <GoInfo />
            </Tooltip>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer mr-4 mb-4">
            <input
              type="checkbox"
              name="other"
              checked={getSelectedQuestionsTypes(
                "other",
                selectedQuestionsTypes
              )}
              className="accent-blue-500"
              onChange={addType}
            />
            <span> From other subjects</span>
            <Tooltip
              description={
                "You can select this option to attempt questions from unselected topics or subjects."
              }
              position="top"
              classNames="text-center"
            >
              <GoInfo />
            </Tooltip>
          </label>
        </div>

        {/* Right Section */}
        <div className="w-full flex flex-col md:items-end space-y-3 lg:space-y-6">
          {/* Difficulty Level Selection */}
          <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between md:space-y-0 md:space-x-4">
            <h3 className="text-xs md:text-base font-semibold">
              Difficulty Level
            </h3>
            <div className="flex text-custom-black rounded-lg overflow-hidden text-xs md:text-base p-1 lext-white">
              {dificultyLevel?.map((level, i) => (
                <div
                  key={level?.name}
                  className={twMerge(
                    "px-4 py-2 text-xs md:text-base cursor-pointer border first:border-r-0 first:rounded-l-md last:rounded-r-md last:border-l-0",
                    level?.value
                      ? `${difficultyColors[i % difficultyColors.length].bg} ${difficultyColors[i % difficultyColors.length].border} text-white`
                      : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
                  )}
                  onClick={() => handleDefaultyLevel(level)}
                >
                  {level?.lebel}
                </div>
              ))}
            </div>
          </div>
        </div>

        {selectedQuestionCount > 0 && (
          <div className="w-full flex flex-col ">
            {/* Question Count Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full space-y-2 md:space-y-0 md:space-x-4">
              <h3 className="text-xs md:text-base font-semibold w-full md:w-[30%]">
                Select question limit
              </h3>

              <div className="w-full md:w-[70%] justify-end flex rounded-md overflow-hidden text-xs md:text-base">
                {questions?.length > 0 &&
                  questions?.map((item, index) => (
                    <div
                      key={index}
                      className={`flex-1 max-w-[80px]  text-center py-2 cursor-pointer transition duration-500  last:border-r-0
                      ${
                        customCount === item
                          ? "bg-dark-blue text-white border border-dark-blue"
                          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                      }
                      ${index === 0 ? "rounded-l-md" : ""}`}
                      onClick={() => handleQuestionCountChange(item, index)}
                    >
                      {item}
                    </div>
                  ))}

                <input
                  type="number"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  value={customInputValue}
                  placeholder="Custom"
                  min={1}
                  max={selectedQuestionCount}
                  className={`text-primary flex-1 text-center p-2 border border-gray-300 bg-white outline-none ${questions?.length > 0 ? "rounded-r-md" : "rounded-md"} max-w-[80px]`}
                />
              </div>
            </div>
            {errorForValidCombination && (
              <span className="text-red-500 text-xs md:text-sm text-end mt-1">
                {errorForValidCombination}
              </span>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default QuizeCustomizeOptions;
