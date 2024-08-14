import React, { useEffect, useState } from "react";
import UpdateTeacher from "./TeacherUpdate";
import DeleteTeacher from "./TecherDelete";

export default function TeacherDisplay({
  setSelectedTeacher,
  setTeacherToDelete,
}) {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeacher, setSelectedTeacherLocal] = useState(null);
  const [teacherToDelete, setTeacherToDeleteLocal] = useState(null);
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/teacher/allTeachers"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTeachers(data.teachers);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const handleUpdateTeacher = (updatedTeacher) => {
    setTeachers((prevTeachers) =>
      prevTeachers.map((teacher) =>
        teacher._id === updatedTeacher._id ? updatedTeacher : teacher
      )
    );
    setSelectedTeacherLocal(null);
  };

  const handleDeleteTeacher = (id) => {
    setTeachers((prevTeachers) =>
      prevTeachers.filter((teacher) => teacher._id !== id)
    );
    setTeacherToDeleteLocal(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching teachers: {error}</p>;

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="my-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Teachers
            </h1>
          </div>
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-white border-b">
                <tr>
                  <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    #
                  </th>{" "}
                  <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Teacher ID
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
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher, index) => (
                  <tr
                    key={teacher._id}
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
                      {teacher._id}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {teacher.name}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {teacher.email}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedTeacherLocal(teacher)} // Use local state
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      /
                      <button
                        onClick={() => setTeacherToDeleteLocal(teacher)} // Use local state
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedTeacher && (
        <UpdateTeacher
          teacher={selectedTeacher}
          onUpdate={handleUpdateTeacher}
          onClose={() => setSelectedTeacherLocal(null)}
        />
      )}

      {teacherToDelete && (
        <DeleteTeacher
          teacher={teacherToDelete}
          onDelete={() => handleDeleteTeacher(teacherToDelete._id)}
          onClose={() => setTeacherToDeleteLocal(null)}
        />
      )}
    </div>
  );
}
