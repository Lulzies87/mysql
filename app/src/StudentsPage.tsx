import axios from "axios";
import { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";
import { NavigationLine } from "./NavigationLine";
import styles from "./StudentsPage.module.scss";

export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export async function loader(searchInput: string, page: number) {
  try {
    const query = searchInput
      ? `/?search=${searchInput}&page=${page}`
      : `/?page=${page}`;
    const res = await axios.get<Student[]>(
      `http://localhost:3000/students${query}`
    );
    return res.data;
  } catch (err) {
    console.error("Error fetching students:", err);
    return [];
  }
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await loader(searchInput, page);
      setStudents(data);
      setTotalPages(Math.ceil(data.length / 2));
    }
    fetchData();
  }, [searchInput, page]);

  const handleSearchInput = async (input: string) => {
    setSearchInput(input);
    const data = await loader(searchInput, page);
    setStudents(data);
    setTotalPages(Math.ceil(data.length / 2));
  };

  const nextPage = () => {
    if (students.length < 2) {
      return;
    }
    setPage(page + 1);
  };

  const previousPage = () => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  };

  return (
    <>
      <SearchBar setSearchInput={handleSearchInput} />
      <ul className={styles.studentList}>
        {students.map((student) => (
          <li className={styles.studentList__Item} key={student.id}>
            <span>
              Name: {student.firstName} {student.lastName}
            </span>
            <span>email: {student.email}</span>
          </li>
        ))}
      </ul>
      <NavigationLine
        page={page}
        totalPages={totalPages}
        handleNext={nextPage}
        handlePrevious={previousPage}
      />
    </>
  );
}
