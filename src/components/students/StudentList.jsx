import PropTypes from "prop-types";
import StudentItem from "./StudentItem";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "../ui/table";

const StudentList = ({ students }) => {
  return (
    <Table>
      <TableCaption>A list of students</TableCaption>
      <TableHeader>
        <TableRow className="hover:bg-inherit">
          <TableHead className="w-[100px] font-semibol text-base">Id</TableHead>
          <TableHead className="font-semibol text-base">Firstname</TableHead>
          <TableHead className="font-semibol text-base">Lastname</TableHead>
          <TableHead className="text-right font-semibol text-base">Group</TableHead>
          <TableHead className="text-right font-semibol text-base">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <StudentItem key={student.id} info={student} />
        ))}
      </TableBody>
    </Table>
  )
}

StudentList.propTypes = {
  students: PropTypes.array,
}
export default StudentList