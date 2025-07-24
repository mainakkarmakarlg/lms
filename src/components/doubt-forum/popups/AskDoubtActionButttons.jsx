import Button from "../../common/Button";

const AskDoubtActionButttons = ({ onCancel }) => {
  return (
    <div className="w-full  flex items-center justify-end space-x-3">
      <Button
        onClick={onCancel}
        type="button"
        color="neutral"
        variant="outlined"
        size="small"
      >
        Cancel
      </Button>

      <Button type="submit" size="small" variant="contained" color="primary">
        Ask Question
      </Button>
    </div>
  );
};

export default AskDoubtActionButttons;
