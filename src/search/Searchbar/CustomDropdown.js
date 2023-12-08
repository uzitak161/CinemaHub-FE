import React, { useState, useEffect, useRef } from "react";
import {
  FaFilm,
  FaTv,
  FaPlayCircle,
  FaUser,
  FaCaretDown,
  FaVideo,
} from "react-icons/fa";

const options = [
  {
    label: "Media",
    value: "media",
    icon: <FaVideo className="wd-dropdown-img" />,
  },
  {
    label: "Movies",
    value: "movie",
    icon: <FaFilm className="wd-dropdown-img" />,
  },
  {
    label: "Series",
    value: "series",
    icon: <FaTv className="wd-dropdown-img" />,
  },
  {
    label: "Episode",
    value: "episode",
    icon: <FaPlayCircle className="wd-dropdown-img" />,
  },
  {
    label: "Profiles",
    value: "users",
    icon: <FaUser className="wd-dropdown-img" />,
  },
];

const CustomDropdown = ({ onSelect, searchType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const selected = options.find((option) => option.value === searchType);
    if (selected) {
      setSelectedOption(selected);
    }
  }, [searchType]);

  const handleHoverOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option.value);
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mouseover", handleHoverOutside);
    return () => {
      document.removeEventListener("mouseover", handleHoverOutside);
    };
  }, []);

  return (
    <div className="wd-custom-dropdown" ref={dropdownRef}>
      <div className="wd-dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        <span className="wd-dropdown-selected-label">
          {selectedOption.label}{" "}
        </span>{" "}
        <FaCaretDown />
      </div>
      {isOpen && (
        <div className="wd-dropdown-list">
          {options.map((option, index) => (
            <div
              key={index}
              className="wd-dropdown-item"
              onClick={() => handleSelect(option)}
            >
              {option.icon}{" "}
              <span className="wd-dropdown-label">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
