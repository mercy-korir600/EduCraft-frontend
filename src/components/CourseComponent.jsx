import { useState } from 'react';
import { FiBook, FiArrowLeft, FiCheckCircle, FiEdit } from 'react-icons/fi';

const CourseComponent = () => {
  // Sample course data - completely self-contained
  const course = {
    title: "React Fundamentals",
    units: [
      {
        title: "Components & Props",
        notes: [
          "Components are reusable UI building blocks",
          "Props are immutable inputs to components",
          "Always name components with PascalCase",
          "Components can return JSX, arrays, or strings"
        ],
        questions: [
          {
            q: "What are props in React?",
            a: "Props (properties) are read-only inputs passed to components"
          },
          {
            q: "Can components modify their props?",
            a: "No, props are immutable - use state for mutable data"
          }
        ],
        task: {
          description: "Create a Welcome component that accepts a 'name' prop and displays a greeting",
          solution: `function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}`
        }
      },
      {
        title: "State & Lifecycle",
        notes: [
          "State stores component-specific data",
          "Use useState hook for functional components",
          "State updates trigger re-renders",
          "Never modify state directly - use setState"
        ],
        questions: [
          {
            q: "What's the purpose of state?",
            a: "To store data that may change over time and affect rendering"
          }
        ],
        task: {
          description: "Create a Counter component with + and - buttons",
          solution: `function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(c => c - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </div>
  );
}`
        }
      }
    ]
  };

  // State management
  const [currentUnit, setCurrentUnit] = useState(0);
  const [taskAnswer, setTaskAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const unit = course.units[currentUnit];

  // Navigation handlers
  const nextUnit = () => {
    if (currentUnit < course.units.length - 1) {
      setCurrentUnit(currentUnit + 1);
      setTaskAnswer('');
      setSubmitted(false);
    }
  };

  const prevUnit = () => {
    if (currentUnit > 0) {
      setCurrentUnit(currentUnit - 1);
      setTaskAnswer('');
      setSubmitted(false);
    }
  };

  const submitTask = () => {
    setSubmitted(true);
    alert('Task submitted! Check the sample solution.');
  };

  return (
    <div className="course-container">
      {/* Header */}
      <header>
        <button className="back-btn" onClick={() => window.history.back()}>
          <FiArrowLeft /> Back
        </button>
        <h1>{course.title}</h1>
        <div className="progress">
          Unit {currentUnit + 1} of {course.units.length}
        </div>
      </header>

      {/* Current Unit */}
      <section className="unit-content">
        <h2><FiBook /> {unit.title}</h2>
        
        {/* Notes */}
        <div className="notes-section">
          <h3>Key Notes:</h3>
          <ul>
            {unit.notes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </div>

        {/* Q&A */}
        <div className="qa-section">
          <h3>Quick Quiz:</h3>
          {unit.questions.map((item, i) => (
            <div key={i} className="qa-item">
              <p className="question">Q: {item.q}</p>
              <p className="answer">A: {item.a}</p>
            </div>
          ))}
        </div>

        {/* Task */}
        <div className="task-section">
          <h3><FiEdit /> Your Task:</h3>
          <p>{unit.task.description}</p>
          
          {!submitted ? (
            <>
              <textarea
                value={taskAnswer}
                onChange={(e) => setTaskAnswer(e.target.value)}
                placeholder="Write your solution here..."
                rows={6}
              />
              <button onClick={submitTask} className="submit-btn">
                Submit Task
              </button>
            </>
          ) : (
            <>
              <div className="submission-feedback">
                <FiCheckCircle /> Submitted!
              </div>
              <div className="solution">
                <h4>Sample Solution:</h4>
                <pre>{unit.task.solution}</pre>
              </div>
              <button onClick={nextUnit} className="next-btn">
                Continue to Next Unit
              </button>
            </>
          )}
        </div>
      </section>

      {/* Navigation */}
      <div className="unit-nav">
        <button 
          onClick={prevUnit} 
          disabled={currentUnit === 0}
        >
          Previous
        </button>
        <button 
          onClick={nextUnit} 
          disabled={currentUnit === course.units.length - 1 || !submitted}
        >
          Next
        </button>
      </div>

      {/* Basic CSS (could be moved to separate file) */}
      <style jsx>{`
        .course-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }
        .back-btn {
          display: flex;
          align-items: center;
          background: none;
          border: none;
          cursor: pointer;
        }
        .unit-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .notes-section ul {
          padding-left: 20px;
        }
        .qa-item {
          margin: 15px 0;
          padding-left: 15px;
          border-left: 3px solid #4CAF50;
        }
        .question {
          font-weight: bold;
        }
        .answer {
          color: #555;
        }
        textarea {
          width: 100%;
          margin: 10px 0;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .submit-btn, .next-btn {
          background: #4CAF50;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 4px;
          cursor: pointer;
        }
        .submission-feedback {
          color: #4CAF50;
          display: flex;
          align-items: center;
          margin: 10px 0;
        }
        .solution pre {
          background: #f5f5f5;
          padding: 10px;
          border-radius: 4px;
          overflow-x: auto;
        }
        .unit-nav {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }
        .unit-nav button {
          padding: 8px 15px;
        }
        .unit-nav button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default CourseComponent;