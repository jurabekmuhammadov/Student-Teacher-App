import { Provider } from "react-redux"
import store from "./app/store"
import Students from "./components/students/Students"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Teachers from "./components/teachers/Teachers"
import HerStudents from "./components/her-students"
import HerTeacher from "./components/her-teacher"
import Navbar from "./components/ui/navbar"
function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Students />}/>
          <Route path="/teachers" element={<Teachers/>}/>
          <Route path="/her-students" element={<HerStudents/>}/>
          <Route path="/her-teacher" element={<HerTeacher/>}/>
        </Routes>
      </Provider>
    </BrowserRouter>
  )
}

export default App