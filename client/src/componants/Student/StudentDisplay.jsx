import React, { useEffect, useState } from "react";
import UpdateStudent from "./StudentUpdate";
import DeleteStudent from "./StudentDelete";
import StudentAssign from "./StudentAssign";

export default function StudentDisplay() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [studentToAssign, setStudentToAssign] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/student/allStudents"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStudents(data.students);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleUpdateStudent = (updatedStudent) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student._id === updatedStudent._id ? updatedStudent : student
      )
    );
    setSelectedStudent(null);
  };

  const handleDeleteStudent = (id) => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student._id !== id)
    );
    setStudentToDelete(null);
  };

  const handleAssignStudent = (id) => {
    setStudentToAssign(id);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching students: {error}</p>;

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="my-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Students
            </h1>
          </div>
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-white border-b">
                <tr>
                  <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    #
                  </th>
                  <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Student ID
                  </th>
                  <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Name
                  </th>
                  <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Email
                  </th>
                  <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Action
                  </th>
                  <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Assign Classroom
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr
                    key={student._id}
                    className={
                      index % 2 === 0
                        ? "bg-gray-100 border-b"
                        : "bg-white border-b"
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {student._id}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {student.name}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {student.email}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      /
                      <button
                        onClick={() => setStudentToDelete(student)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleAssignStudent(student._id)}
                        className="text-blue-500 hover:underline"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedStudent && (
        <UpdateStudent
          student={selectedStudent}
          onUpdate={handleUpdateStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}

      {studentToDelete && (
        <DeleteStudent
          student={studentToDelete}
          onDelete={() => handleDeleteStudent(studentToDelete._id)}
          onClose={() => setStudentToDelete(null)}
        />
      )}

      {studentToAssign && (
        <StudentAssign
          classroomId={studentToAssign}
          onClose={() => setStudentToAssign(null)}
        />
      )}
    </div>
  );
}
