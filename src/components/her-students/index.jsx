import { fetchStudents } from "@/app/students/studentsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

const HerStudents = () => {
    const group = localStorage.getItem("teacherGroup");
    const dispatch = useDispatch();
    const { students } = useSelector((state) => state.students);

    const filteredStudents = students.filter((student) => student.group === group);
    useEffect(() => {
        dispatch(fetchStudents());
    }, []);
    return (
        <div className="container mt-6">
            <Table>
                <TableCaption>A list of teachers</TableCaption>
                <TableHeader>
                    <TableRow className="hover:bg-inherit">
                        <TableHead className="w-[100px] font-semibol text-base">Id</TableHead>
                        <TableHead className="font-semibol text-base">Firstname</TableHead>
                        <TableHead className="font-semibol text-base">Lastname</TableHead>
                        <TableHead className="text-right font-semibol text-base">Group</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                            <TableCell className="font-medium font-semibol text-base">#{student.id}</TableCell>
                            <TableCell className="font-semibol text-base">{student.firstname}</TableCell>
                            <TableCell className="font-semibol text-base">{student.lastname}</TableCell>
                            <TableCell className="text-right font-semibol text-base">{student.group}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default HerStudents