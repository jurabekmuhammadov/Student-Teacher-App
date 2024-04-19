import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { fetchTeachers } from "@/app/teachers/teachersSlice";

const HerTeacher = () => {
    const group = localStorage.getItem("studentGroup");
    const dispatch = useDispatch();
    const { teachers } = useSelector((state) => state.teachers);

    const filteredTeacher = teachers.filter((teacher) => teacher.group === group);
    useEffect(() => {
        dispatch(fetchTeachers());
    }, []);
    return (
        <div className="container mt-6">
            <Table>
                <TableCaption>A list of students</TableCaption>
                <TableHeader>
                    <TableRow className="hover:bg-inherit">
                        <TableHead className="w-[100px] font-semibol text-base">Id</TableHead>
                        <TableHead className="font-semibol text-base">Firstname</TableHead>
                        <TableHead className="font-semibol text-base">Lastname</TableHead>
                        <TableHead className="text-right font-semibol text-base">Group</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredTeacher.map((teacher) => (
                        <TableRow key={teacher.id}>
                            <TableCell className="font-medium font-semibol text-base">#{teacher.id}</TableCell>
                            <TableCell className="font-semibol text-base">{teacher.firstname}</TableCell>
                            <TableCell className="font-semibol text-base">{teacher.lastname}</TableCell>
                            <TableCell className="text-right font-semibol text-base">{teacher.group}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default HerTeacher