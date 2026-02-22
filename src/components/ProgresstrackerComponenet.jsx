import { useState } from 'react';

const ProgresstrackerComponent = () => {
  // Sample course data
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "React Fundamentals",
      progress: 65,
      topics: [
        { id: 1, name: "Components & Props", completed: true },
        { id: 2, name: "State & Lifecycle", completed: true },
        { id: 3, name: "Hooks", completed: false },
        { id: 4, name: "Context API", completed: false }
      ]
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      progress: 30,
      topics: [
        { id: 1, name: "Closures", completed: true },
        { id: 2, name: "Prototypes", completed: false },
        { id: 3, name: "Async/Await", completed: false }
      ]
    }
  ]);

  // Toggle topic completion status
  const toggleTopicComplete = (courseId, topicId) => {
    setCourses(courses.map(course => {
      if (course.id === courseId) {
        const updatedTopics = course.topics.map(topic => {
          if (topic.id === topicId) {
            return { ...topic, completed: !topic.completed };
          }
          return topic;
        });

        // Calculate new progress
        const completedCount = updatedTopics.filter(t => t.completed).length;
        const newProgress = Math.round((completedCount / updatedTopics.length) * 100);

        return {
          ...course,
          topics: updatedTopics,
          progress: newProgress
        };
      }
      return course;
    }));
  };

  return (
    <div className="p-6 font-serif">
      <h1 className="text-2xl font-bold mb-6">Progress Tracker</h1>

      {/* Overall Progress */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="font-semibold mb-4">Overall Completion</h2>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
          <div
            className="bg-emerald-600 h-4 rounded-full"
            style={{
              width: `${calculateOverallProgress(courses)}%`
            }}
          ></div>
        </div>
        <p className="text-right font-medium">
          {calculateOverallProgress(courses)}% Complete
        </p>
      </div>

      {/* Courses List */}
      <div className="space-y-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                {course.progress}% Complete
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                className="bg-emerald-600 h-2.5 rounded-full"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>

            {/* Topics List */}
            <ul className="space-y-2">
              {course.topics.map(topic => (
                <li
                  key={topic.id}
                  className="flex items-center p-2 hover:bg-gray-50 rounded"
                >
                  <button
                    onClick={() => toggleTopicComplete(course.id, topic.id)}
                    className={`w-5 h-5 rounded mr-3 flex items-center justify-center ${
                      topic.completed
                        ? 'bg-emerald-500 text-white'
                        : 'border-2 border-gray-300'
                    }`}
                  >
                    {topic.completed && (
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                  <span className={topic.completed ? 'line-through text-gray-500' : ''}>
                    {topic.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to calculate overall progress
function calculateOverallProgress(courses) {
  if (courses.length === 0) return 0;

  const totalTopics = courses.reduce((sum, course) => sum + course.topics.length, 0);
  const completedTopics = courses.reduce((sum, course) => {
    return sum + course.topics.filter(topic => topic.completed).length;
  }, 0);

  return Math.round((completedTopics / totalTopics) * 100);
}

export default ProgresstrackerComponent ;
;
