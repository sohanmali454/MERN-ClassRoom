import React, { useState, useEffect } from "react";

export default function UpdateClassroom({ classroom, onUpdate, onClose }) {
  const [name, setName] = useState(classroom.name);
  const [startTime, setStartTime] = useState(classroom.startTime);
  const [endTime, setEndTime] = useState(classroom.endTime);
  const [days, setDays] = useState(classroom.days.join(", "));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedClassroom = {
      name,
      startTime,
      endTime,
      days: days.split(",").map((day) => day.trim()),
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/classroom/updateClassroom/${classroom._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedClassroom),
        }
      );

      if (response.ok) {
        const result = await response.json();
        onUpdate(result.classroom);
        onClose();
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Update Classroom</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="start-time"
              className="block text-sm font-medium text-gray-900"
            >
              Start Time
            </label>
            <input
              id="start-time"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="end-time"
              className="block text-sm font-medium text-gray-900"
            >
              End Time
            </label>
            <input
              id="end-time"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="days"
              className="block text-sm font-medium text-gray-900"
            >
              Days (e.g., Monday, Tuesday)
            </label>
            <input
              id="days"
              type="text"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              required
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
