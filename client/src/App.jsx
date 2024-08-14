import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn";
import PrincipalDashboard from "./pages/PrincipalDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import classroomCreate from "./componants/Classroom/ClassroomCreate";
import ClassroomDisplay from "./componants/Classroom/ClassroomDisplay";
import ClassroomAssign from "./componants/Classroom/ClassroomAssign";
import TeacherCreate from "./componants/Teacher/TeacherCreate";
import TeacherDelete from "./componants/Teacher/TecherDelete";
import TeacherUpdate from "./componants/Teacher/TeacherUpdate";
import TeacherDisplay from "./componants/Teacher/TeacherDisplay";
import StudentCreate from "./componants/Student/StudentCreate";
import StudentDisplay from "./componants/Student/StudentDisplay";
import StudentUpdate from "./componants/Student/StudentUpdate";
import StudentDelete from "./componants/Student/StudentDelete";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={LogIn}></Route>
        <Route
          path="/principalDashboard"
          Component={PrincipalDashboard}
        ></Route>
        <Route path="/teacherDashboard" Component={TeacherDashboard}></Route>
        <Route path="/studentDashboard" Component={StudentDashboard}></Route>
        <Route path="/classroomCreate" Component={classroomCreate}></Route>
        <Route path="/classroomDisplay" Component={ClassroomDisplay}></Route>
        <Route path="/classroomAssign" Component={ClassroomAssign}></Route>
        <Route path="/teacherCreate" Component={TeacherCreate}></Route>
        <Route path="/teacherDisplay" Component={TeacherDisplay}></Route>
        <Route path="/teacherUpdate" Component={TeacherUpdate}></Route>
        <Route path="/teacherDelete" Component={TeacherDelete}></Route>
        <Route path="/studentCreate" Component={StudentCreate}></Route>
        <Route path="/studentDisplay" Component={StudentDisplay}></Route>
        <Route path="/studentUpdate" Component={StudentUpdate}></Route>
        <Route path="/studentDelete" Component={StudentDelete}></Route>
      </Routes>
    </BrowserRouter>
  );
}
