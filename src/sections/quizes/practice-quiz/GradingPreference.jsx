export default function GradingPreference() {
  return (
    <div className="w-full flex justify-between items-center my-4">
      <p className="text-md font-semibold">Grading Preference</p>
      <div className="flex space-x-4">
        <label className="flex items-center space-x-2">
          <input type="radio" name="grading" /> After each question
        </label>
        <label className="flex items-cente space-x-2">
          <input type="radio" name="grading" defaultChecked /> After all
          questions
        </label>
      </div>
    </div>
  );
}
