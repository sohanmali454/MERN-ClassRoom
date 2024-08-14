import React from "react";

export default function DeleteClassroom({ classroom, onDelete, onClose }) {
  const handleDelete = async () => {
    console.log(`Deleting classroom with ID: ${classroom._id}`);
    try {
      const response = await fetch(
        `http://localhost:3000/api/classroom/deleteClassroom/${classroom._id}`,
        {
          method: "DELETE",
        }
      );

      const responseBody = await response.json();
      console.log("Response:", responseBody);

      if (response.ok) {
        console.log("Classroom deleted successfully");
        if (typeof onDelete === "function") {
          onDelete(classroom._id);
        }
        if (typeof onClose === "function") {
          onClose();
        }
      } else {
        console.log(`Error: ${responseBody.message}`);
      }
    } catch (error) {
      console.log(`Fetch Error: ${error}`);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-4">
          Are you sure you want to delete the classroom "{classroom.name}"?
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
