import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./StudentsPage.module.scss";

type Student = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export async function loader() {
  try {
    const res = await axios.get<Student[]>("http://localhost:3000/students");
    return res.data;
  } catch (err) {
    console.error("Error fetching students:", err);
    return [];
  }
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await loader();
      setStudents(data);
    }
    fetchData();
  }, []);

  return (
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
  );
}
