import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn";
import Header from "./componants/Header";
import PrincipalDashboard from "./pages/PrincipalDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
export default function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" Component={LogIn}></Route>
        <Route path="/principalDashboard" Component={PrincipalDashboard}></Route>
        <Route path="/teacherDashboard" Component={TeacherDashboard}></Route>
        <Route path="/studentDashboard" Component={StudentDashboard}></Route>
      </Routes>
    </BrowserRouter>
  );
}
