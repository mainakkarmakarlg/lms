const FilterSubjects = ({ searchType, setSearchType }) => {
  return (
    <div className="w-fit h-full flex items-center justify-end space-x-2 ">
      <select
        name="searchType"
        id=""
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        className="outline-none text-gray-600 w-fit text-xs md:text-sm bg-inherit pr-1"
      >
        <option value="all">All</option>
        <option value="subject">Subjects</option>
        <option value="chapter">Topics</option>
        {/* <option value="Option 3">Option 3</option> */}
      </select>
    </div>
  );
};

export default FilterSubjects;
