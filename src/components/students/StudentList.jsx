import PropTypes from "prop-types";
import StudentItem from "./StudentItem";

const StudentList = ({students}) => {
  return (
    students.map((student) => (
      <StudentItem key={student.id} info={student}/>
    ))
  )
}

StudentList.propTypes = {
    students: PropTypes.array,
}
export default StudentList