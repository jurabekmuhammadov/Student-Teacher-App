import {configureStore} from "@reduxjs/toolkit";
import { studentReducer } from "./students/studentsSlice";
import { teacherReducer } from "./teachers/teachersSlice";

const store = configureStore({
    reducer: {
        students: studentReducer,
        teachers: teacherReducer,
    }
})
export default store;