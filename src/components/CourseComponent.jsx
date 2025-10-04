import React, { useState, useEffect } from "react";

function CourseComponent() {
  const [studentData, setStudentData] = useState(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("studentData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setStudentData(parsed);

      // fetch notes.json from public folder
      fetch("/data/notes.json")
        .then((res) => res.json())
        .then((data) => {
          const career = parsed.careerGoal;
          const prefs = parsed.learningPreferences || [];

          let collectedNotes = [];

          if (career && data[career]) {
            prefs.forEach((pref) => {
              if (data[career][pref]) {
                collectedNotes = [...collectedNotes, ...data[career][pref]];
              }
            });
          }

          setNotes(collectedNotes);
        })
        .catch((err) => console.error("Error loading notes:", err));
    }
  }, []);

  if (!studentData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading student data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-emerald-700 mb-2">
        Welcome, {studentData.name}! 🎓
      </h1>
      <p className="text-gray-600 mb-6">
        Career Goal: {studentData.careerGoal}
      </p>

      {notes.length > 0 ? (
        <div className="space-y-8">
          {notes.map((note, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg shadow border border-gray-200"
            >
              <h2 className="text-xl font-semibold mb-2">{note.title}</h2>

              {note.type === "text" && (
                <p className="text-gray-700">{note.content}</p>
              )}

              {note.type === "pdf" && (
                <div className="w-full h-[80vh] border rounded-lg overflow-hidden">
                  <iframe
                    src={note.url}
                    title={note.title}
                    width="100%"
                    height="100%"
                  ></iframe>
                </div>
              )}

              {note.type === "video" && (
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={note.url}
                    title={note.title}
                    className="w-full h-96 rounded-lg"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">
          No notes available for this combination yet.
        </p>
      )}
    </div>
  );
}

export default CourseComponent;
