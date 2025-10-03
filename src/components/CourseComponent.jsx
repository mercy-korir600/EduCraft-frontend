import React, { useEffect, useState } from "react";

function CourseComponent() {
  const [studentData, setStudentData] = useState(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("studentData"));
    if (data) {
      setStudentData(data);

      // ✅ fetch notes.json dynamically
      fetch("/data/notes.json")
        .then((res) => res.json())
        .then((allNotes) => {
          const { careerGoal, learningPreferences } = data;
          const careerNotes = allNotes[careerGoal] || {};

          let collectedNotes = [];
          learningPreferences.forEach((pref) => {
            if (careerNotes[pref]) {
              collectedNotes = [...collectedNotes, ...careerNotes[pref]];
            }
          });

          setNotes(collectedNotes);
        })
        .catch((err) => console.error("Error loading notes:", err));
    }
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {studentData && (
        <>
          <h1 className="text-2xl font-bold mb-2">
            Welcome, {studentData.name}! 🎓
          </h1>
          <p className="text-gray-600">
            Career Goal: <b>{studentData.careerGoal}</b>
          </p>
          <p className="text-gray-600 mb-6">
            Learning Preferences:{" "}
            {studentData.learningPreferences.join(", ")}
          </p>
        </>
      )}

      <div className="space-y-4">
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
            >
              <h2 className="font-semibold text-lg">{note.title}</h2>
              <p className="text-gray-600 mb-2">{note.description}</p>

              {note.type === "text" && (
                <p className="text-gray-800">{note.content}</p>
              )}
              {note.type === "pdf" && (
                <a
                  href={note.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Open PDF
                </a>
              )}
              {note.type === "video" && (
                <a
                  href={note.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 underline"
                >
                  Watch Video
                </a>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No notes available for this combination yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default CourseComponent;
