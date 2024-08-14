import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../componants/Header";
import teacher from "../assets/teacher.png";
import student from "../assets/students.png";
import classroom from "../assets/teaching.png";

export default function Dashboard() {
  const [totalClassrooms, setTotalClassrooms] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/classroom/getAllClassrooms"
        );
        const data = await response.json();
        console.log("Fetched data:", data);

        setTotalClassrooms(data.classrooms.length);
      } catch (error) {
        console.error("Error fetching classrooms:", error);
      }
    };

    const fetchTeachers = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/teacher/allTeachers"
        );
        const data = await response.json();
        console.log("Fetched data:", data);

        setTotalTeachers(data.teachers.length);
      } catch (error) {
        console.error("Error fetching Teacher:", error);
      }
    };
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/student/allStudents"
        );
        const data = await response.json();
        console.log("Fetched data:", data);

        setTotalStudents(data.students.length);
      } catch (error) {
        console.error("Error fetching Teacher:", error);
      }
    };

    fetchClassrooms();
    fetchTeachers();
    fetchStudents();
  }, []);

  const funCreateClassroom = () => {
    navigate("/classroomCreate");
  };

  const funDisplayClassroom = () => {
    navigate("/classroomDisplay");
  };

  const funCreateTeacher = () => {
    navigate("/teacherCreate");
  };

  const funDisplayTeacher = () => {
    navigate("/teacherDisplay");
  };
  const funCreateStudent = () => {
    navigate("/studentCreate");
  };
  const funDisplayStudent = () => {
    navigate("/studentDisplay");
  };
  return (
    <div>
      <Header />
      <div className="pt-5">
        <div className="flex m-auto justify-center font-bold text-4xl my-4">
          <h1 className="text-slate-800">Principal Dashboard...!</h1>
        </div>
        <div className="flex flex-wrap justify-evenly my-20">
          <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
              <div className="flex-auto p-4">
                <div className="flex flex-wrap">
                  <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 className="text-slate-400 uppercase font-bold text-xs">
                      Total Classrooms
                    </h5>
                    <span className="font-bold text-xl">{totalClassrooms}</span>
                  </div>
                  <div className="relative w-auto pl-4 flex-initial">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center">
                      <img alt="Logo" src={classroom} className="h-14 w-14" />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mt-4">
                  <span
                    onClick={funDisplayClassroom}
                    className="text-emerald-500 mr-2 cursor-pointer"
                  >
                    View
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
              <div className="flex-auto p-4">
                <div className="flex flex-wrap">
                  <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 className="text-slate-400 uppercase font-bold text-xs">
                      Total Teachers
                    </h5>
                    <span className="font-bold text-xl">{totalTeachers}</span>
                  </div>
                  <div className="relative w-auto pl-4 flex-initial">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center">
                      <img alt="Logo" src={teacher} className="h-14 w-14" />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mt-4">
                  <span
                    onClick={funDisplayTeacher}
                    className="text-red-500 mr-2 cursor-pointer"
                  >
                    View
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
              <div className="flex-auto p-4">
                <div className="flex flex-wrap">
                  <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 className="text-slate-400 uppercase font-bold text-xs">
                      Total Students
                    </h5>
                    <span className="font-bold text-xl">{totalStudents}</span>
                  </div>
                  <div className="relative w-auto pl-4 flex-initial">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center">
                      <img alt="Logo" src={student} className="h-14 w-14" />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mt-4">
                  <span
                    onClick={funDisplayStudent}
                    className="text-orange-500 mr-2 cursor-pointer"
                  >
                    View
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-evenly">
        <button
          onClick={funCreateClassroom}
          className="flex px-3 py-2 bg-blue-400 mr-1 text-white font-semibold rounded"
        >
          <span className="ml-1">Create Classroom</span>
        </button>

        <button
          onClick={funCreateTeacher}
          className="flex px-3 py-2 bg-red-400 mr-1 text-white font-semibold rounded"
        >
          <span className="ml-1">Create Teacher Account</span>
        </button>

        <button
          onClick={funCreateStudent}
          className="flex px-3 py-2 bg-yellow-400 mr-1 text-white font-semibold rounded"
        >
          <span className="ml-1">Create Student Account</span>
        </button>

        <button className="flex px-3 py-2 bg-orange-400 text-white font-semibold rounded">
          <span className="ml-1">View Timetable</span>
        </button>
      </div>
    </div>
  );
}
