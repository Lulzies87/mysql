import { FormEvent, useState } from "react";

type Props = {
  setSearchInput(searchInput: string): void;
};

export function SearchBar({ setSearchInput }: Props) {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const formData = new FormData(e.currentTarget);
    // const searchInput = formData.get("input")!.toString();

    setSearchInput(inputValue);
    setInputValue("");
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  return (
    <form onSubmit={handleSearch}>
      <label htmlFor="input">Search by first/last name and/or email:</label>
      <input
        type="text"
        name="input"
        id="input"
        value={inputValue}
        onChange={handleInputChange}
      />
    </form>
  );
}
