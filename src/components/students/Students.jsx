import { closeModal, fetchStudents, openModal, addStudent, editStudent } from "@/app/students/studentsSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import StudentList from "./StudentList";
import { Button } from "../ui/button";
import { CirclePlus, CircleX, CheckCheck } from "lucide-react"
import Select from "../ui/select";

const Students = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(
            yup.object({
                firstname: yup.string().required("First Name is required"),
                lastname: yup.string().required("Last Name is required"),
                group: yup.string().required("Please select a group"),
            })
        ),
    });

    const { loading, error, students, modalOpen, selectedStudent } = useSelector((state) => state.students);
    let filteredStudents = [...students];
    const dispatch = useDispatch();
    const [filterValue, setFilterValue] = useState("Filter by group");
    const [searchedStudent, setSearchedStudent] = useState("");

    const handleFilter = (e) => {
        setFilterValue(e.target.value)
    }

    const handleSearch = (e) => {
        setSearchedStudent(e.target.value.toLowerCase().trim())
    }

    if (filterValue !== "Filter by group") {
        filteredStudents = students.filter((student) => student.group === filterValue);
    }

    if (searchedStudent !== "") {
        filteredStudents = filteredStudents.filter((student) =>
            student.firstname.toLowerCase().includes(searchedStudent) ||
            student.lastname.toLowerCase().includes(searchedStudent) ||
            student.group.toLowerCase().includes(searchedStudent)
        );
    }



    useEffect(() => {
        dispatch(fetchStudents());
    }, []);

    const onSubmit = async (data) => {
        try {
            if (selectedStudent) {
                dispatch(editStudent({ studentId: selectedStudent.id, studentData: data }));
            } else {
                dispatch(addStudent(data));
            }

            reset();
            dispatch(closeModal());
        } catch (error) {
            console.error("Error adding/editing student:", error);
        }
    };

    return (
        <div className="container">
            <div className="modal">
                <form onSubmit={handleSubmit(onSubmit)} className={`my-6 flex flex-row justify-between items-end gap-10 ${modalOpen ? "" : "hidden"}`}>
                    <div className="flex gap-6 items-center w-full">
                        <div className="flex flex-col gap-2 w-1/3">
                            <label htmlFor="firstname" className="text-sm">First Name</label>
                            <input
                                defaultValue={selectedStudent?.firstname || ""}
                                {...register("firstname")}
                                className="flex h-10 w-full rounded-md border border-gray-300 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 "
                                id="firstaname"
                            />
                            {errors.firstname && <span className="text-red-500">{errors.firstname.message}</span>}
                        </div>
                        <div className="flex flex-col gap-2 w-1/3">
                            <label htmlFor="lastname" className="text-sm">Last Name</label>
                            <input
                                defaultValue={selectedStudent?.lastname || ""}
                                {...register("lastname")}
                                className="flex h-10 w-full rounded-md border border-gray-300 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 "
                                id="lastname"
                            />
                            {errors.lastname && <span className="text-red-500">{errors.lastname.message}</span>}
                        </div>
                        <div className="flex flex-col gap-1 justify-center w-1/3">
                            <label htmlFor="group" className="text-left">Select a group</label>
                            <select name="group" id="group" {...register("group")} className="w-full h-10 border-2 m-0 p-0">
                                <option value="">Select Group</option>
                                <option value="ReactJs N45">ReactJs N45</option>
                                <option value="Angular N32">Angular N32</option>
                                <option value="VueJs N17">VueJs N17</option>
                                <option value="ExpressJs N78">ExpressJs N78</option>
                                <option value="NextJs N1">NextJs N1</option>
                            </select>
                            {errors.group && <span className="text-red-500">{errors.group.message}</span>}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 h-full">
                        <Button type="submit" className="bg-green-600 hover:bg-green-500 text-white text-sm rounded rounded-xl font-bold flex gap-2 items-center">
                            <CheckCheck size={16} />
                            {selectedStudent ? "Edit Student" : "Submit"}
                        </Button>
                        <Button onClick={() => dispatch(closeModal())} type="button" className="bg-slate-400 hover:bg-slate-500  text-white text-sm rounded rounded-xl font-bold flex gap-2 items-center">
                            <CircleX />
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>

            <div className="top-actions flex items-center flex-row-reverse justify-between my-6">
                <Button onClick={() => dispatch(openModal())} className="bg-green-600 hover:bg-green-500 text-white text-sm rounded rounded-xl font-bold flex gap-2 items-center">
                    <CirclePlus size={16} />
                    Add Student
                </Button>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <input
                        type={"text"}
                        className={
                            "flex h-10 w-full rounded-md border border-gray-300 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 "
                        }
                        onChange={handleSearch} placeholder="Search students..."
                    />
                </div>
                <Select value={filterValue} onChange={handleFilter} options={["Filter by group", "ReactJs N45", "Angular N32", "VueJs N17", "ExpressJs N78", "NextJs N1"]} />
            </div>

            {loading && <h1>Loading....</h1>}
            {error && <h1>{error.message}</h1>}
            {filteredStudents.length > 0 && (
                <StudentList students={filteredStudents} />
            )}
        </div>
    );
};

export default Students;
