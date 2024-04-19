import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    error: null,
    teachers: [],
    modalOpen: false,
    selectedTeacher: null,
}

export const fetchTeachers = createAsyncThunk("teachers/fetchTeachers", async () => {
    try {
        const res = await axios.get("http://localhost:4000/teachers");
        const data = await res.data;
        return data;
    } catch (error) {
        return error;
    }
})

export const addTeacher = createAsyncThunk("teachers/addTeacher", async (teacherData) => {
    try {
        const res = await axios.post("http://localhost:4000/teachers", teacherData);
        const data = await res.data;
        return data;
    } catch (error) {
        return error;
    }
});

export const editTeacher = createAsyncThunk(
    "teachers/editTeacher",
    async ({ teacherId, teacherData }) => {
        try {
            const res = await axios.put(`http://localhost:4000/teachers/${teacherId}`, teacherData);
            const data = await res.data;
            return data;
        } catch (error) {
            return error;
        }
    }
);

export const deleteTeacher = createAsyncThunk("teachers/deleteTeacher", async (teacherId) => {
    try {
        await axios.delete(`http://localhost:4000/teachers/${teacherId}`);
        return teacherId;
    } catch (error) {
        return error;
    }
});

const teachersSlice = createSlice({
    name: "teachers",
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.modalOpen = true,
                state.selectedTeacher = action.payload
        },
        closeModal: (state) => {
            state.modalOpen = false,
                state.selectedTeacher = null
        },
        deleteTeacherLocally: (state, action) => {
            state.teachers = state.teachers.filter(teacher => teacher.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.
            addCase(fetchTeachers.pending, (state) => {
                state.loading = true
            }).
            addCase(fetchTeachers.fulfilled, (state, action) => {
                state.loading = false,
                    state.teachers = action.payload,
                    state.error = ""
            }).
            addCase(fetchTeachers.rejected, (state, action) => {
                state.loading = false,
                    state.teachers = [],
                    state.error = action.payload
            }).
            addCase(addTeacher.pending, (state) => {
                state.loading = true;
            })
            .addCase(addTeacher.fulfilled, (state, action) => {
                state.loading = false;
                state.teachers.push(action.payload);
            })
            .addCase(addTeacher.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(editTeacher.pending, (state) => {
                state.loading = true;
            })
            .addCase(editTeacher.fulfilled, (state, action) => {
                state.loading = false;
                const updatetTeacherIndex = state.teachers.findIndex(
                    (teacher) => teacher.id === action.payload.id
                );
                if (updatetTeacherIndex !== -1) {
                    state.teachers[updatetTeacherIndex] = action.payload;
                }
            })
            .addCase(editTeacher.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteTeacher.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteTeacher.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export const teacherReducer = teachersSlice.reducer;
export const { openModal, closeModal } = teachersSlice.actions;