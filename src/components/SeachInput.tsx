import React, { useState, useCallback } from "react";
import { Input } from "./ui/input";
import searchIcon from "@/assets/icons/search.svg";

const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

interface SearchInputProps {
  placeholder: string;
  onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder, onSearch }) => {
  const [query, setQuery] = useState("");

  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      if (onSearch) onSearch(searchTerm);
    }, 500), // Adjust debounce delay as needed
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleSearchClick = () => {
    if (onSearch) onSearch(query);
  };

  return (
    <div className="relative w-full max-w-[759px] ">
      <Input
        type="text"
        placeholder={placeholder}
        className="pr-10"
        value={query}
        onChange={handleChange}
      />
      <div
        className="absolute right-[5px] h-[56px] w-[56px] top-1/2 -translate-y-1/2 cursor-pointer bg-primary flex justify-center items-center rounded-[10px]"
        onClick={handleSearchClick}
      >
        <img src={searchIcon} className="w-[25px] h-[24px]" alt="Search" />
      </div>
    </div>
  );
};

export default SearchInput;
