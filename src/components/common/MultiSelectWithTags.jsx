import { useState, useEffect, useRef } from "react";
import { MdArrowDropDown, MdClose } from "react-icons/md";

const MultiSelectWithTags = ({ options, selectedValues, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState(selectedValues || []);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (value) => {
    const updatedSelectedItems = selectedItems.includes(value)
      ? selectedItems.filter((item) => item !== value)
      : [...selectedItems, value];

    setSelectedItems(updatedSelectedItems);
    onChange(updatedSelectedItems);
  };

  const isSelected = (value) => selectedItems.includes(value);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedItems(selectedValues || []);
  }, [selectedValues]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Dropdown Button */}
      <div
        className="bg-gray-200 dark:bg-slate-700 p-2 rounded-md cursor-pointer flex items-center justify-between"
        onClick={toggleDropdown}
      >
        <div className="flex flex-wrap space-x-1">
          {selectedItems.length > 0 ? (
            selectedItems.map((item, index) => (
              <div
                key={index}
                className="bg-primary text-white px-2 py-1 rounded-full flex items-center text-xs space-x-1 m-1"
              >
                {item}
                <MdClose
                  className="cursor-pointer ml-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(item);
                  }}
                />
              </div>
            ))
          ) : (
            <span className="text-gray-500">Select reasons</span>
          )}
        </div>
        <MdArrowDropDown className="text-2xl" />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 bg-white dark:bg-black border border-gray-300 dark:border-slate-600 rounded-md mt-2 shadow-lg w-full max-h-60 overflow-auto">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option.value)}
              className={`px-4 py-2 cursor-pointer dark:text-white text-black hover:bg-gray-100 dark:hover:bg-slate-600 ${
                isSelected(option.value) ? "bg-gray-200 dark:bg-slate-700" : ""
              }`}
            >
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectWithTags;
