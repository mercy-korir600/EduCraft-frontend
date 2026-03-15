import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

function Onboarding() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    careerGoal: "",
    grades: "",
    studyTime: 10,
    learningPreferences: [],
  });

  const careerOptions = [
    "Software Engineer",
    "Data Scientist",
    "UX Designer",
    "Product Manager",
    "Cybersecurity Specialist",
    "AI Researcher",
    "Cloud Architect",
  ];

  const learningOptions = [
    { id: "visual", label: "Visual Learning (diagrams, charts)" },
    { id: "auditory", label: "Auditory Learning (lectures, discussions)" },
    { id: "reading", label: "Reading/Writing (books, articles)" },
    { id: "kinesthetic", label: "Kinesthetic (hands-on activities)" },
    { id: "group", label: "Group Study" },
    { id: "solo", label: "Solo Study" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    localStorage.setItem("studentData", JSON.stringify(formData));
    setUser({
      name: formData.name,
      email: formData.email,
      careerGoal: formData.careerGoal,
      grades: formData.grades,
      studyTime: formData.studyTime,
      learningPreferences: formData.learningPreferences,
      hasCompletedOnboarding: true,
    });
    navigate("/dashboard");
  };

  // Step 1: Personal Info
  const PersonalInfoForm = () => (
    <div className="space-y-6 font-serif">
      <h2 className="text-2xl font-bold text-brand-700 dark:text-brand-400">Personal Information</h2>
      <p className="text-gray-600 dark:text-gray-400">Let's start with some basic information about you</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
            placeholder="John Smith"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={nextStep}
          className="px-6 py-2 bg-brand-600 dark:bg-brand-700 text-white rounded-lg hover:bg-brand-700 dark:hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/30 disabled:opacity-50"
          disabled={!formData.name || !formData.email}
        >
          Continue
        </button>
      </div>
    </div>
  );

  // Step 2: Career Goal
  const CareerGoalSelection = () => (
    <div className="space-y-6 font-serif">
      <h2 className="text-2xl font-bold text-brand-700 dark:text-brand-400">Career Goals</h2>
      <p className="text-gray-600 dark:text-gray-400">What career path are you interested in pursuing?</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {careerOptions.map((career, index) => (
          <div
            key={index}
            className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
              formData.careerGoal === career
                ? "border-brand-600 bg-brand-50 dark:bg-brand-900/30"
                : "border-gray-200 dark:border-gray-700 hover:border-brand-300 dark:hover:border-brand-500"
            }`}
            onClick={() => setFormData({ ...formData, careerGoal: career })}
          >
            <div className="flex items-center">
              <div
                className={`w-5 h-5 rounded-full border-2 mr-3 transition-colors ${
                  formData.careerGoal === career
                    ? "border-brand-600 bg-brand-600"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              ></div>
              <span className={`font-medium ${formData.careerGoal === career ? "text-brand-800 dark:text-brand-300" : "text-gray-700 dark:text-gray-300"}`}>
                {career}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-6 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="px-6 py-2 bg-brand-600 dark:bg-brand-700 text-white rounded-lg hover:bg-brand-700 dark:hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/30 disabled:opacity-50"
          disabled={!formData.careerGoal}
        >
          Continue
        </button>
      </div>
    </div>
  );

  // Step 3: Grades
  const GradesInput = () => (
    <div className="space-y-6 font-serif">
      <h2 className="text-2xl font-bold text-brand-700 dark:text-brand-400">Academic Performance</h2>
      <p className="text-gray-600 dark:text-gray-400">What is your current average grade?</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Current Grade</label>
          <select
            name="grades"
            value={formData.grades}
            onChange={handleChange}
            className="appearance-none w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 hover:border-brand-400 transition-all cursor-pointer"
          >
            <option value="">Select your grade</option>
            <option value="A">A (90-100%)</option>
            <option value="B">B (80-89%)</option>
            <option value="C">C (70-79%)</option>
            <option value="D">D (60-69%)</option>
            <option value="F">F (Below 60%)</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-6 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="px-6 py-2 bg-brand-600 dark:bg-brand-700 text-white rounded-lg hover:bg-brand-700 dark:hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/30 disabled:opacity-50"
          disabled={!formData.grades}
        >
          Continue
        </button>
      </div>
    </div>
  );

  // Step 4: Study Availability
  const StudyAvailability = () => (
    <div className="space-y-6 font-serif">
      <h2 className="text-2xl font-bold text-brand-700 dark:text-brand-400">Study Availability</h2>
      <p className="text-gray-600 dark:text-gray-400">How many hours per week can you dedicate to studying?</p>

      <div className="space-y-8">
        <input
          type="range"
          name="studyTime"
          min="5"
          max="40"
          step="5"
          value={formData.studyTime}
          onChange={handleChange}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-600"
        />
        <p className="text-gray-700 dark:text-gray-300 font-medium">Hours per week: <span className="text-brand-600 dark:text-brand-400 text-xl font-bold ml-2">{formData.studyTime}</span></p>
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-6 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="px-6 py-2 bg-brand-600 dark:bg-brand-700 text-white rounded-lg hover:bg-brand-700 dark:hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/30"
        >
          Continue
        </button>
      </div>
    </div>
  );

  // Step 5: Learning Preferences
  const LearningPreferences = () => (
    <div className="space-y-6 font-serif">
      <h2 className="text-2xl font-bold text-brand-700 dark:text-brand-400">Learning Preferences</h2>
      <p className="text-gray-600 dark:text-gray-400">Select your preferred learning styles</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {learningOptions.map((option) => (
          <div
            key={option.id}
            className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
              formData.learningPreferences.includes(option.id)
                ? "border-brand-600 bg-brand-50 dark:bg-brand-900/30"
                : "border-gray-200 dark:border-gray-700 hover:border-brand-300 dark:hover:border-brand-500"
            }`}
            onClick={() => {
              const updatedPreferences = formData.learningPreferences.includes(option.id)
                ? formData.learningPreferences.filter((id) => id !== option.id)
                : [...formData.learningPreferences, option.id];
              setFormData({ ...formData, learningPreferences: updatedPreferences });
            }}
          >
            <div className="flex items-start">
              <div
                className={`w-5 h-5 rounded border-2 mt-0.5 mr-3 flex-shrink-0 transition-colors ${
                  formData.learningPreferences.includes(option.id)
                    ? "border-brand-600 bg-brand-600"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              ></div>
              <span className={`font-medium ${formData.learningPreferences.includes(option.id) ? "text-brand-800 dark:text-brand-300" : "text-gray-700 dark:text-gray-300"}`}>
                {option.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-6 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="px-6 py-2 bg-brand-600 dark:bg-brand-700 text-white rounded-lg hover:bg-brand-700 dark:hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/30 disabled:opacity-50"
          disabled={formData.learningPreferences.length === 0}
        >
          Continue
        </button>
      </div>
    </div>
  );

  // Step 6: Confirmation
  const ConfirmationPage = () => (
    <div className="space-y-8 font-serif">
      <h2 className="text-2xl font-bold text-brand-700 dark:text-brand-400">Review & Submit</h2>
      <p className="text-gray-600 dark:text-gray-400">Please review your information before submitting</p>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border dark:border-gray-700 transition-colors duration-300">
        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-4 border-b dark:border-gray-700 pb-2">Your Profile Summary</h3>

        <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Full Name</p>
            <p className="font-medium dark:text-gray-200">{formData.name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
            <p className="font-medium dark:text-gray-200">{formData.email}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Career Goal</p>
            <p className="font-medium text-brand-600 dark:text-brand-400">{formData.careerGoal}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Academic Grade</p>
            <p className="font-medium dark:text-gray-200">{formData.grades}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Study Commitment</p>
            <p className="font-medium dark:text-gray-200">{formData.studyTime} hrs/week</p>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t dark:border-gray-700">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Learning Preferences</p>
          <div className="flex flex-wrap gap-2">
            {formData.learningPreferences.map((pref) => (
              <span key={pref} className="px-3 py-1 bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300 rounded-full text-xs font-medium">
                {learningOptions.find((opt) => opt.id === pref)?.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-6 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-brand-600 dark:bg-brand-700 text-white rounded-lg hover:bg-brand-700 dark:hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/30 font-bold"
        >
          Complete Onboarding
        </button>
      </div>
    </div>
  );

  // Progress Steps
  const steps = [
    { id: 1, name: "Profile" },
    { id: 2, name: "Career" },
    { id: 3, name: "Grades" },
    { id: 4, name: "Time" },
    { id: 5, name: "Styles" },
    { id: 6, name: "Finish" },
  ];

  return (
    <div className="min-h-screen font-serif bg-brand-50 dark:bg-gray-950 py-12 px-4 transition-colors duration-500 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-brand-200 dark:bg-brand-900/20 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-brand-300 dark:bg-brand-800/20 rounded-full blur-3xl opacity-50" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-10">
          <div className="text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Student Onboarding</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Complete your profile to unlock personalized features</p>
          </div>
          <ThemeToggle />
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border dark:border-gray-800 transition-colors duration-300">
          {/* Progress Bar */}
          <div className="px-6 pt-10 border-b dark:border-gray-800 pb-6 bg-gray-50/50 dark:bg-gray-800/30">
            <div className="flex justify-between relative px-2">
              {/* Connector line */}
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 -z-0" />
              
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`flex flex-col items-center relative z-10 ${
                    step.id < currentStep
                      ? "text-brand-600"
                      : step.id === currentStep
                      ? "text-brand-800 dark:text-brand-400 font-bold"
                      : "text-gray-400 dark:text-gray-600"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                      step.id < currentStep
                        ? "bg-brand-600 text-white"
                        : step.id === currentStep
                        ? "bg-white dark:bg-gray-900 border-2 border-brand-600 ring-4 ring-brand-100 dark:ring-brand-900/30"
                        : "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    {step.id < currentStep ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-sm">{step.id}</span>
                    )}
                  </div>
                  <div className="text-[10px] md:text-xs mt-2 uppercase tracking-tighter font-bold">{step.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 md:p-12">
            {currentStep === 1 && <PersonalInfoForm />}
            {currentStep === 2 && <CareerGoalSelection />}
            {currentStep === 3 && <GradesInput />}
            {currentStep === 4 && <StudyAvailability />}
            {currentStep === 5 && <LearningPreferences />}
            {currentStep === 6 && <ConfirmationPage />}
          </div>
        </div>

        <div className="mt-12 text-center text-gray-500 dark:text-gray-600 text-xs">
          <p>© 2026 EduCraft. All rights reserved. Your data is secure and private.</p>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
