import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TeacherList from "./TeacherList";
import { fetchTeachers, closeModal, openModal, addTeacher, editTeacher } from "@/app/teachers/teachersSlice";

const Teachers = () => {
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

  const { loading, error, teachers, modalOpen, selectedTeacher } = useSelector((state) => state.teachers);
  let filteredTeachers = [...teachers];
  const [searchedTeacher, setSearchedTeacher] = useState("");
  const [filterValue, setFilterValue] = useState("Filter by group");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeachers());
  }, []);

  const onSubmit = async (data) => {
    try {
      if (selectedTeacher) {
        dispatch(editTeacher({ teacherId: selectedTeacher.id, teacherData: data }));
      } else {
        dispatch(addTeacher(data));
      }

      reset();
      dispatch(closeModal());
    } catch (error) {
      console.error("Error adding/editing teacher:", error);
    }
  };

  const handleEditTeacher = (teacher) => {
    dispatch(openModal(teacher));
  };

  const handleFilter = (e) => {
    setFilterValue(e.target.value)
  }

  const handleSearch = (e) => {
    setSearchedTeacher(e.target.value.toLowerCase().trim())
  }

  if (searchedTeacher !== "") {
    filteredTeachers = filteredTeachers.filter((teacher) =>
      teacher.firstname.toLowerCase().includes(searchedTeacher) ||
      teacher.lastname.toLowerCase().includes(searchedTeacher) ||
      teacher.group.toLowerCase().includes(searchedTeacher)
    );
  }
  if (filterValue !== "Filter by group") {
    filteredTeachers = teachers.filter((student) => student.group === filterValue);
  }


  return (
    <>
      <div className="modal">
        <form onSubmit={handleSubmit(onSubmit)} className={`m-6 flex gap-4 ${modalOpen ? "" : "hidden"}`}>
          <input
            defaultValue={selectedTeacher?.firstname || ""}
            {...register("firstname")}
            className="border border-sky-500 outline-none p-2"
            placeholder="First Name"
          />
          {errors.firstname && <span className="text-red-500">{errors.firstname.message}</span>}

          <input
            defaultValue={selectedTeacher?.lastname || ""}
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

          <button type="submit">{selectedTeacher ? "Edit Teacher" : "Submit"}</button>
          <button type="button" onClick={() => dispatch(closeModal())}>
            Close
          </button>
        </form>
      </div>

      <button onClick={() => dispatch(openModal())} className="border border-black m-6">
        Add Teacher
      </button>

      <select name="filter" id="filter" onChange={handleFilter}>
        <option defaultValue="Filter by group">Filter by group</option>
        <option value="ReactJs N45">ReactJs N45</option>
        <option value="Angular N32">Angular N32</option>
        <option value="VueJs N17">VueJs N17</option>
        <option value="ExpressJs N78">ExpressJs N78</option>
        <option value="NextJs N1">NextJs N1</option>
      </select>

      <input onChange={handleSearch} className="ml-4 border border-black outline-none" type="text" placeholder="Search teachers..." />


      {loading && <h1>Loading....</h1>}
      {error && <h1>{error.message}</h1>}
      {filteredTeachers.length > 0 && (
        <TeacherList teachers={filteredTeachers} onEditTeacher={handleEditTeacher} />
      )}
    </>
  );
};

export default Teachers;