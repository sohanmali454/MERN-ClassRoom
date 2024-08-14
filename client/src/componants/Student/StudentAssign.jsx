import React, { useState } from "react";

export default function ClassroomAssign({ studentId, onClose }) {
  const [classroomId, setClassroomId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/student/assignClassroomStudent/${studentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ classroomId }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setError("");
        if (onClose) onClose();
      } else {
        setError(data.message || "Failed to assign classroom");
        setMessage("");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      setMessage("");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Assign Classroom to Student
        </h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="classroomId"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Classroom Id
            </label>
            <div className="mt-2">
              <input
                id="classroomId"
                name="classroomId"
                type="text"
                value={classroomId}
                onChange={(e) => setClassroomId(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-slate-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Assign Classroom
            </button>
          </div>
        </form>

        {message && <p className="text-green-600 mt-4">{message}</p>}
        {error && <p className="text-red-600 mt-4">{error}</p>}

        <button
          onClick={onClose}
          className="mt-4 flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
