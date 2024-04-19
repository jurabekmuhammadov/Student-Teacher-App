import PropTypes from "prop-types";
import TeacherItem from "./TeacherItem";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "../ui/table";

const TeacherList = ({ teachers }) => {
  return (
    <Table>
      <TableCaption>A list of teachers</TableCaption>
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
        {teachers.map((teacher) => (
          <TeacherItem key={teacher.id} info={teacher} />
        ))}
      </TableBody>
    </Table>

  )
}

TeacherList.propTypes = {
  teachers: PropTypes.array,
}
export default TeacherList