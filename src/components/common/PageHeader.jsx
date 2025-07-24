import { twMerge } from "tailwind-merge";
import Button from "./Button";
import { useResponsive } from "../../hooks/useResponsive";

/**
 * PageHeader is a component that displays a heading and an optional button.
 *
 * It takes the following props:
 *
 * - `text`: The text to display as the heading.
 * - `showButton`: Whether to show the button or not.
 * - `btnText`: The text to display on the button.
 * - `buttonOnClick`: An event handler for when the button is clicked.
 * - `buttonStartIcon`: An optional icon to display at the start of the button.
 * - `buttonEndIcon`: An optional icon to display at the end of the button.
 * - `buttonSize`: The size of the button. Can be "small", "medium", or "large".
 * - `headindClass`: Any additional CSS classes to apply to the heading.
 * - `buttonClass`: Any additional CSS classes to apply to the button.
 *
 * The component returns a `div` with two children: the heading `h1` and a `div` containing the button.
 *
 * The default styles for the component are:
 *
 * - The heading is displayed as a 3xl font with a bold font style.
 * - The button is displayed as a primary button with a contained variant.
 *
 * The component can be used as follows:
 *
 */
const PageHeader = ({
  text,
  showButton,
  btnText,
  buttonOnClick,
  buttonStartIcon,
  buttonEndIcon,
  buttonSize,
  headindClass,
  buttonClass,
  isButtonStickyInMobile,
  buttonStyleInMobile,
}) => {
  const { isMobile, isTablet } = useResponsive();

  return (
    <div className="w-full flex items-center justify-between px-1  h-[40px]">
      <div>
        <h1 className={twMerge("text-3xl font-bold", headindClass)}>{text}</h1>
      </div>

      <div
        className={twMerge(
          isButtonStickyInMobile
            ? "fixed bottom-5 right-5 z-50 lg:z-0 lg:relative lg:bottom-0 lg:right-0"
            : ""
        )}
      >
        {showButton &&
          (isButtonStickyInMobile ? (
            isMobile || isTablet ? (
              <Button
                onClick={buttonOnClick}
                startIcon={buttonStartIcon}
                endIcon={buttonEndIcon}
                size={buttonSize}
                rounded={true}
                variant="contained"
                color="primary"
                className={twMerge(
                  "space-x-0 px-0 w-[50px] h-[50px] flex items-center justify-center",
                  buttonClass,
                  buttonStyleInMobile
                )}
              ></Button>
            ) : (
              <Button
                onClick={buttonOnClick}
                startIcon={buttonStartIcon}
                endIcon={buttonEndIcon}
                size={buttonSize}
                variant="contained"
                color="primary"
                className={twMerge(buttonClass)}
              >
                {btnText}
              </Button>
            )
          ) : (
            <Button
              onClick={buttonOnClick}
              startIcon={buttonStartIcon}
              endIcon={buttonEndIcon}
              size={buttonSize}
              variant="contained"
              color="primary"
              className={twMerge(buttonClass)}
            >
              {btnText}
            </Button>
          ))}
      </div>
    </div>
  );
};

export default PageHeader;

// {showButton &&
//   isActiveButtonStickyInMobile ? (
//     <Button
//       onClick={buttonOnClick}
//       startIcon={buttonStartIcon}
//       endIcon={buttonEndIcon}
//       size={buttonSize}
//       rounded={true}
//       variant="contained"
//       color="primary"
//       className={twMerge(
//         "space-x-0 px-0 w-[50px] h-[50px] flex items-center justify-center",
//         buttonClass,
//         buttonStyleInMobile
//       )}
//     ></Button>
//   ) : (
//     <Button
//       onClick={buttonOnClick}
//       startIcon={buttonStartIcon}
//       endIcon={buttonEndIcon}
//       size={buttonSize}
//       variant="contained"
//       color="primary"
//       className={twMerge(buttonClass)}
//     >
//       {btnText}
//     </Button>
//   )}
