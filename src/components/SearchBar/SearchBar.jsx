import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import css from "./SearchBar.module.css";

const createErrorNotification = () => {
  toast("Enter something");
};
const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const handleChange = (evt) => {
    setInputValue(evt.target.value);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    {
      inputValue.length > 0 ? onSearch(inputValue) : createErrorNotification();
    }
    setInputValue("");
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit}>
        <input
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleChange}
        />
        <Toaster position="top-right" />

        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default SearchBar;
