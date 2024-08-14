import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ClassroomCreate() {
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [days, setDays] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const classroomData = {
      name,
      startTime,
      endTime,
      days: days.split(",").map((day) => day.trim()),
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/classroom/newClassroom",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(classroomData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setMessage(`Classroom created successfully: ${result.classroom.name}`);
        alert("Classroom created successfully");
        navigate("/principalDashboard");
        setName("");
        setStartTime("");
        setEndTime("");
        setDays("");
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            CREATE CLASSROOM
          </h1>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="start-time"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Start Time
              </label>
              <div className="mt-2">
                <input
                  id="start-time"
                  name="start-time"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="end-time"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                End Time
              </label>
              <div className="mt-2">
                <input
                  id="end-time"
                  name="end-time"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="days"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Days (e.g., Monday, Tuesday)
              </label>
              <div className="mt-2">
                <input
                  id="days"
                  name="days"
                  type="text"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  required
                  placeholder="Enter days separated by commas"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-slate-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Classroom
              </button>
            </div>

            {message && (
              <div className="mt-4 text-center text-sm font-medium text-gray-900">
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
