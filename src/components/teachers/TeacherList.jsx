import PropTypes from "prop-types";
import TeacherItem from "./TeacherItem";

const TeacherList = ({teachers}) => {
  return (
    teachers.map((teacher) => (
      <TeacherItem key={teacher.id} info={teacher}/>
    ))
  )
}

TeacherList.propTypes = {
    teachers: PropTypes.array,
}
export default TeacherList