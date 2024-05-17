'use client';
import { useState } from "react";

type Option = {
  id: string;
  name: string;
}

interface Props {
  options: Option[];
  value: Option;
  onChange: (option:Option) => void;
  className: string;
}

export const Dropdown = ({ options, value, onChange, className }:Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <button
        type="button"
        className="border-0 px-3 py-3 bg-white rounded text-sm md:text-base shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption.name}
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full bg-white shadow rounded mt-2 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option.id}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
              onClick={() => handleOptionClick(option)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};