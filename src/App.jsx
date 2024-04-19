import { Provider } from "react-redux"
import store from "./app/store"
import Students from "./components/students/Students"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Teachers from "./components/teachers/Teachers"
function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Students />}/>
          <Route path="/teachers" element={<Teachers/>}/>
        </Routes>
      </Provider>
    </BrowserRouter>
  )
}

export default App