import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    error: null,
    students: [],
    modalOpen: false,
    selectedStudent: null,
}

export const fetchStudents = createAsyncThunk("students/fetchStudents", async () => {
    try {
        const res = await axios.get("http://localhost:4000/students");
        const data = await res.data;
        return data;
    } catch (error) {
        return error;
    }
})

export const addStudent = createAsyncThunk("students/addStudent", async (studentData) => {
    try {
        const res = await axios.post("http://localhost:4000/students", studentData);
        const data = await res.data;
        return data;
    } catch (error) {
        return error;
    }
});

export const editStudent = createAsyncThunk(
    "students/editStudent",
    async ({ studentId, studentData }) => {
        try {
            const res = await axios.put(`http://localhost:4000/students/${studentId}`, studentData);
            const data = await res.data;
            return data;
        } catch (error) {
            return error;
        }
    }
);

export const deleteStudent = createAsyncThunk("students/deleteStudent", async (studentId) => {
    try {
        await axios.delete(`http://localhost:4000/students/${studentId}`);
        return studentId;
    } catch (error) {
        return error;
    }
});

const studentsSlice = createSlice({
    name: "students",
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.modalOpen = true,
                state.selectedStudent = action.payload
        },
        closeModal: (state) => {
            state.modalOpen = false,
                state.selectedStudent = null
        },
        deleteStudentLocally: (state, action) => {
            state.students = state.students.filter(student => student.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.
            addCase(fetchStudents.pending, (state) => {
                state.loading = true
            }).
            addCase(fetchStudents.fulfilled, (state, action) => {
                state.loading = false,
                    state.students = action.payload,
                    state.error = ""
            }).
            addCase(fetchStudents.rejected, (state, action) => {
                state.loading = false,
                    state.students = [],
                    state.error = action.payload
            }).
            addCase(addStudent.pending, (state) => {
                state.loading = true;
            })
            .addCase(addStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.students.push(action.payload);
            })
            .addCase(addStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(editStudent.pending, (state) => {
                state.loading = true;
            })
            .addCase(editStudent.fulfilled, (state, action) => {
                state.loading = false;
                const updatedStudentIndex = state.students.findIndex(
                    (student) => student.id === action.payload.id
                );
                if (updatedStudentIndex !== -1) {
                    state.students[updatedStudentIndex] = action.payload;
                }
            })
            .addCase(editStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteStudent.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export const studentReducer = studentsSlice.reducer;
export const { openModal, closeModal } = studentsSlice.actions;