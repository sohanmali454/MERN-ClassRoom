import React from "react";

export default function TeacherDelete({ teacher, onClose, onDelete }) {
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/teacher/deleteTeacher/${teacher._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      onDelete(teacher);
      onClose();
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-4">
          Are you sure you want to delete the teacher "{teacher.name}"?
        </p>
        <div className="flex justify-end">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
