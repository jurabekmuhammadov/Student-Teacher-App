import { closeModal, fetchStudents, openModal, addStudent, editStudent } from "@/app/students/studentsSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import StudentList from "./StudentList";

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

    if(filterValue !== "Filter by group") {
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
        <>
            <div className="modal">
                <form onSubmit={handleSubmit(onSubmit)} className={`m-6 flex gap-4 ${modalOpen ? "" : "hidden"}`}>
                    <input
                        defaultValue={selectedStudent?.firstname || ""}
                        {...register("firstname")}
                        className="border border-sky-500 outline-none p-2"
                        placeholder="First Name"
                    />
                    {errors.firstname && <span className="text-red-500">{errors.firstname.message}</span>}

                    <input
                        defaultValue={selectedStudent?.lastname || ""}
                        {...register("lastname")}
                        className="border border-sky-500 outline-none p-2"
                        placeholder="Last Name"
                    />
                    {errors.lastname && <span className="text-red-500">{errors.lastname.message}</span>}

                    <select name="group" id="group" {...register("group")}>
                        <option value="">Select Group</option>
                        <option value="ReactJs N45">ReactJs N45</option>
                        <option value="Angular N32">Angular N32</option>
                        <option value="VueJs N17">VueJs N17</option>
                        <option value="ExpressJs N78">ExpressJs N78</option>
                        <option value="NextJs N1">NextJs N1</option>
                    </select>
                    {errors.group && <span className="text-red-500">{errors.group.message}</span>}

                    <button type="submit">{selectedStudent ? "Edit Student" : "Submit"}</button>
                    <button type="button" onClick={() => dispatch(closeModal())}>
                        Close
                    </button>
                </form>
            </div>

            <button onClick={() => dispatch(openModal())} className="border border-black m-6">
                Add Student
            </button>

            <select name="filter" id="filter" onChange={handleFilter}>
                <option defaultValue="Filter by group">Filter by group</option>
                <option value="ReactJs N45">ReactJs N45</option>
                <option value="Angular N32">Angular N32</option>
                <option value="VueJs N17">VueJs N17</option>
                <option value="ExpressJs N78">ExpressJs N78</option>
                <option value="NextJs N1">NextJs N1</option>
            </select>

            <input onChange={handleSearch} className="ml-4 border border-black outline-none" type="text" placeholder="Search students..." />

            {loading && <h1>Loading....</h1>}
            {error && <h1>{error.message}</h1>}
            {filteredStudents.length > 0 && (
                <StudentList students={filteredStudents} />
            )}
        </>
    );
};

export default Students;
