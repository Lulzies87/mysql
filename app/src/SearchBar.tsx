import axios from "axios";
import { Student } from "./StudentsPage";
import { FormEvent, useState } from "react";

type Props = {
  setStudents(data: Student[]): void;
};

export function SearchBar({ setStudents }: Props) {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const searchInput = formData.get("input");

    try {
      const res = await axios.get<Student[]>(
        `http://localhost:3000/students/?search=${searchInput}`
      );
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
      return [];
    }
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
