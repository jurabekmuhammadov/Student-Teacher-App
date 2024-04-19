/* eslint-disable react-hooks/exhaustive-deps */
import { closeModal, fetchStudents } from "@/app/students/studentsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form"
import StudentList from "./StudentList";

const Students = () => {
    const {
        register,
        handleSubmit,
        reset,
        // formState: { errors },
    } = useForm()
    const { loading, error, students, modalOpen, selectedStudent } = useSelector((state) => state.students);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchStudents());
    }, []);

    const onSubmit = (data) => {
        dispatch(closeModal());
        reset()
    }
    console.log(selectedStudent);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={`m-6 flex gap-4 ${modalOpen ? "" : "hidden"}`}>
                <input defaultValue={selectedStudent ? (selectedStudent.firstname) : ""} {...register("firstname")} className="border border-sky-500 outline-none" />
                <input defaultValue={selectedStudent ? (selectedStudent.lastname) : ""} {...register("lastname")} className="border border-sky-500 outline-none" />
                {/* {errors.exampleRequired && <span>This field is required</span>} */}

                <button type="submit">Submit</button>
                <button type="button" onClick={() => dispatch(closeModal())}>Close</button>
            </form>

            {loading && <h1>Loading....</h1>}
            {error && <h1>{error.message}</h1>}
            {students.length > 0 && (
                <StudentList students={students} />
            )}
        </>
    )
}

export default Students
