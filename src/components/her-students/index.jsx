import { fetchStudents } from "@/app/students/studentsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const HerStudents = () => {
    const group = localStorage.getItem("teacherGroup");
    const dispatch = useDispatch();
    const { students } = useSelector((state) => state.students);

    const filteredStudents = students.filter((student) => student.group === group);
    useEffect(() => {
        dispatch(fetchStudents());
    }, []);
  return (
    <div>
        {filteredStudents.map((student) => (
            <div key={student.id}>
                <span>{student.firstname}</span>
                <span>{student.lastname}</span>
                <span>{student.group}</span>
            </div>
        ))}
    </div>
  )
}

export default HerStudents