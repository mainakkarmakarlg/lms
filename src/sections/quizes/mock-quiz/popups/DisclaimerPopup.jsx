import Button from "../../../../components/common/Button";
import { HiMiniShieldExclamation } from "react-icons/hi2";

const DisclaimerPopup = ({
  onRequestClose,
  onUnderstand,
  showStartCancelButton,
}) => {
  return (
    <div className="space-y-5 w-full">
      <div className="flex items-center justify-center">
        <div className="w-fit h-fit border border-yellow-500 p-4 rounded-full">
          <HiMiniShieldExclamation className="text-yellow-500 text-5xl" />
        </div>
      </div>

      {/* <div className="absolute -top-2 right-2 cursor-pointer">
        <MdClose className="text-xl" onClick={onRequestClose} />
      </div> */}

      <div className="text-center">
        <h3 className="text-slate-700 text-xl font-bold">Disclaimer</h3>
      </div>

      <p className="text-center text-gray-500">
        Mock Tests are meant to simulate the real exam. Do not open them just
        for browsing. You get only three attempt per mock. If you leave the test
        midway, you can rejoin the same. Additional attempts are only allowed
        during validity extensions, which apply only if you fail the exam.
      </p>

      <p className="italic font-semibold text-center text-gray-500">
        {" "}
        Note: Extensions are not available for deferring students.
      </p>

      {showStartCancelButton ? (
        <div className="w-full flex items-center justify-between">
          <Button onClick={onRequestClose} size="small" color="danger">
            Cancel
          </Button>
          <Button onClick={onUnderstand} size="small" color="primary">
            Start
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <Button onClick={onRequestClose} size="small">
            Understood
          </Button>
        </div>
      )}
    </div>
  );
};

export default DisclaimerPopup;
