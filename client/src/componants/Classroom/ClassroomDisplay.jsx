import React, { useEffect, useState } from "react";
import UpdateClassroom from "./ClassroomUpdate";
import DeleteClassroom from "./ClassroomDelete";
import ClassroomAssign from "./ClassroomAssign";
export default function ClassroomDisplay() {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [classroomToDelete, setClassroomToDelete] = useState(null);
  const [classroomToAssign, setClassroomToAssign] = useState(null);

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/classroom/getAllClassrooms"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setClassrooms(data.classrooms);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClassrooms();
  }, []);

  const handleUpdateClassroom = (updatedClassroom) => {
    setClassrooms((prevClassrooms) =>
      prevClassrooms.map((classroom) =>
        classroom._id === updatedClassroom._id ? updatedClassroom : classroom
      )
    );
    setSelectedClassroom(null);
  };

  const handleDeleteClassroom = (id) => {
    setClassroomToDelete(null);
    handleDelete(id);
  };

  const handleAssignClassroom = (id) => {
    setClassroomToAssign(id);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col ">
      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="my-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              CLASSROOMS
            </h1>
          </div>
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-white border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Classroom ID
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Start Time
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    End Time
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Days
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Teacher
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Action
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Assign Teacher
                  </th>
                </tr>
              </thead>
              <tbody>
                {classrooms.map((classroom, index) => (
                  <tr
                    key={classroom._id}
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
                      {classroom._id}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {classroom.name}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {classroom.startTime}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {classroom.endTime}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {classroom.days.join(", ")}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {classroom.teacher
                        ? classroom.teacher.name
                        : "Not Assigned"}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedClassroom(classroom)}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      /
                      <button
                        onClick={() => setClassroomToDelete(classroom)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleAssignClassroom(classroom._id)}
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

      {selectedClassroom && (
        <UpdateClassroom
          classroom={selectedClassroom}
          onUpdate={handleUpdateClassroom}
          onClose={() => setSelectedClassroom(null)}
        />
      )}

      {classroomToDelete && (
        <DeleteClassroom
          classroom={classroomToDelete}
          onDelete={handleDeleteClassroom}
          onClose={() => setClassroomToDelete(null)}
        />
      )}

      {classroomToAssign && (
        <ClassroomAssign
          classroomId={classroomToAssign}
          onClose={() => setClassroomToAssign(null)}
        />
      )}
    </div>
  );
}
