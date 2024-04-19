import { fetchTeachers } from "@/app/teachers/teachersSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const HerTeacher = () => {
    const group = localStorage.getItem("studentGroup");
    const dispatch = useDispatch();
    const { teachers } = useSelector((state) => state.teachers);

    const filteredTeacher = teachers.filter((teacher) => teacher.group === group);
    useEffect(() => {
        dispatch(fetchTeachers());
    }, []);
  return (
    <div>
    {filteredTeacher.map((teacher) => (
        <div key={teacher.id}>
            <span>{teacher.firstname}</span>
            <span>{teacher.lastname}</span>
            <span>{teacher.group}</span>
        </div>
    ))}
</div>
  )
}

export default HerTeacher