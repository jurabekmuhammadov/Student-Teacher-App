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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStudents.pending, (state) => {
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
            })
    }
})

export const studentReducer = studentsSlice.reducer;
export const { openModal, closeModal, selectedStudent } = studentsSlice.actions;