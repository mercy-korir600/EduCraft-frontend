// src/App.jsx
import React, { useState } from 'react';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    careerGoal: '',
    grades: '',
    studyTime: 10,
    learningPreferences: [],
  });

  const careerOptions = [
    'Software Engineer',
    'Data Scientist',
    'UX Designer',
    'Product Manager',
    'Cybersecurity Specialist',
    'AI Researcher',
    'Cloud Architect',
  ];

  const learningOptions = [
    { id: 'visual', label: 'Visual Learning (diagrams, charts)' },
    { id: 'auditory', label: 'Auditory Learning (lectures, discussions)' },
    { id: 'reading', label: 'Reading/Writing (books, articles)' },
    { id: 'kinesthetic', label: 'Kinesthetic (hands-on activities)' },
    { id: 'group', label: 'Group Study' },
    { id: 'solo', label: 'Solo Study' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updatedPreferences = [...formData.learningPreferences];
    
    if (checked) {
      updatedPreferences.push(value);
    } else {
      updatedPreferences = updatedPreferences.filter(pref => pref !== value);
    }
    
    setFormData({ ...formData, learningPreferences: updatedPreferences });
  };

  const nextStep = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    alert('Onboarding submitted successfully!\n' + JSON.stringify(formData, null, 2));
    // Reset form
    setFormData({
      name: '',
      email: '',
      careerGoal: '',
      grades: '',
      studyTime: 10,
      learningPreferences: [],
    });
    setCurrentStep(1);
  };

  // Step 1: Personal Info Form
  const PersonalInfoForm = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-emerald-700">Personal Information</h2>
      <p className="text-gray-600">Let's start with some basic information about you</p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="John Smith"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="john@example.com"
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={nextStep}
          className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          disabled={!formData.name || !formData.email}
        >
          Continue
        </button>
      </div>
    </div>
  );

  // Step 2: Career Goal Selection
  const CareerGoalSelection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-emerald-700">Career Goals</h2>
      <p className="text-gray-600">What career path are you interested in pursuing?</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {careerOptions.map((career, index) => (
          <div 
            key={index}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              formData.careerGoal === career 
                ? 'border-emerald-600 bg-emerald-50' 
                : 'border-gray-200 hover:border-emerald-300'
            }`}
            onClick={() => setFormData({...formData, careerGoal: career})}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full border-2 mr-3 ${
                formData.careerGoal === career 
                  ? 'border-emerald-600 bg-emerald-600' 
                  : 'border-gray-300'
              }`}></div>
              <span className="font-medium">{career}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          disabled={!formData.careerGoal}
        >
          Continue
        </button>
      </div>
    </div>
  );

  // Step 3: Grades Input
  const GradesInput = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-emerald-700">Academic Performance</h2>
      <p className="text-gray-600">What is your current average grade?</p>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
            <span className="text-emerald-700 font-bold">A</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
            <span className="text-emerald-700 font-bold">B</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
            <span className="text-emerald-700 font-bold">C</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
            <span className="text-emerald-700 font-bold">D</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Current Grade</label>
          <select
            name="grades"
            value={formData.grades}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          disabled={!formData.grades}
        >
          Continue
        </button>
      </div>
    </div>
  );

  // Step 4: Study Availability
  const StudyAvailability = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-emerald-700">Study Availability</h2>
      <p className="text-gray-600">How many hours per week can you dedicate to studying?</p>
      
      <div className="space-y-8">
        <div className="pt-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Hours per week: {formData.studyTime}</span>
            <span className="text-sm text-gray-500">Max 40 hours</span>
          </div>
          <input
            type="range"
            name="studyTime"
            min="5"
            max="40"
            step="5"
            value={formData.studyTime}
            onChange={handleChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>5h</span>
            <span>10h</span>
            <span>15h</span>
            <span>20h</span>
            <span>25h</span>
            <span>30h</span>
            <span>35h</span>
            <span>40h</span>
          </div>
        </div>
        
        <div className="bg-emerald-50 p-4 rounded-lg">
          <h3 className="font-medium text-emerald-800 mb-2">Recommended Study Schedule</h3>
          <p className="text-emerald-700">
            Based on {formData.studyTime} hours/week, we recommend studying:
          </p>
          <div className="mt-2 flex space-x-2">
            {formData.studyTime >= 15 && (
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">3-4 days/week</span>
            )}
            {formData.studyTime >= 25 && (
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">5 days/week</span>
            )}
            {formData.studyTime < 15 && (
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">2 days/week</span>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );

  // Step 5: Learning Preferences
  const LearningPreferences = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-emerald-700">Learning Preferences</h2>
      <p className="text-gray-600">Select your preferred learning styles</p>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {learningOptions.map((option) => (
            <div 
              key={option.id}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.learningPreferences.includes(option.id) 
                  ? 'border-emerald-600 bg-emerald-50' 
                  : 'border-gray-200 hover:border-emerald-300'
              }`}
              onClick={() => {
                const updatedPreferences = formData.learningPreferences.includes(option.id)
                  ? formData.learningPreferences.filter(id => id !== option.id)
                  : [...formData.learningPreferences, option.id];
                setFormData({...formData, learningPreferences: updatedPreferences});
              }}
            >
              <div className="flex items-start">
                <div className={`w-5 h-5 rounded border-2 mt-0.5 mr-3 flex-shrink-0 ${
                  formData.learningPreferences.includes(option.id) 
                    ? 'border-emerald-600 bg-emerald-600' 
                    : 'border-gray-300'
                }`}></div>
                <span>{option.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          disabled={formData.learningPreferences.length === 0}
        >
          Continue
        </button>
      </div>
    </div>
  );

  // Step 6: Confirmation
  const ConfirmationPage = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-emerald-700">Review & Submit</h2>
      <p className="text-gray-600">Please review your information before submitting</p>
      
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="font-medium text-lg text-gray-800 mb-4">Your Information</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between border-b pb-3">
            <span className="text-gray-600">Name:</span>
            <span className="font-medium">{formData.name}</span>
          </div>
          
          <div className="flex justify-between border-b pb-3">
            <span className="text-gray-600">Email:</span>
            <span className="font-medium">{formData.email}</span>
          </div>
          
          <div className="flex justify-between border-b pb-3">
            <span className="text-gray-600">Career Goal:</span>
            <span className="font-medium">{formData.careerGoal}</span>
          </div>
          
          <div className="flex justify-between border-b pb-3">
            <span className="text-gray-600">Current Grade:</span>
            <span className="font-medium">{formData.grades}</span>
          </div>
          
          <div className="flex justify-between border-b pb-3">
            <span className="text-gray-600">Study Time:</span>
            <span className="font-medium">{formData.studyTime} hours/week</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Learning Preferences:</span>
            <div className="text-right">
              {formData.learningPreferences.length > 0 ? (
                formData.learningPreferences.map(pref => (
                  <div key={pref} className="font-medium">
                    {learningOptions.find(opt => opt.id === pref)?.label}
                  </div>
                ))
              ) : (
                <span className="text-gray-500">None selected</span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Submit Onboarding
        </button>
      </div>
    </div>
  );

  // Progress Steps
  const steps = [
    { id: 1, name: 'Personal Info' },
    { id: 2, name: 'Career Goal' },
    { id: 3, name: 'Grades' },
    { id: 4, name: 'Study Time' },
    { id: 5, name: 'Preferences' },
    { id: 6, name: 'Confirmation' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Student Onboarding
          </h1>
          <p className="mt-2 text-gray-600">
            Complete your profile to get personalized study recommendations
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Progress Bar */}
          <div className="px-6 pt-6">
            <div className="flex justify-between mb-1">
              {steps.map((step) => (
                <div 
                  key={step.id} 
                  className={`w-1/6 flex flex-col items-center relative ${
                    step.id < currentStep ? 'text-emerald-600' : 
                    step.id === currentStep ? 'text-emerald-800 font-bold' : 'text-gray-500'
                  }`}
                >
                  <div className="flex items-center">
                    {step.id < currentStep ? (
                      <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    ) : (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.id === currentStep ? 'bg-emerald-100 border-2 border-emerald-600' : 'bg-gray-100 border-2 border-gray-300'
                      }`}>
                        {step.id}
                      </div>
                    )}
                  </div>
                  <div className="text-xs mt-1 text-center">{step.name}</div>
                  
                  {step.id < 6 && (
                    <div className={`absolute top-4 left-1/2 transform -translate-y-1/2 w-full h-1 ${
                      step.id < currentStep ? 'bg-emerald-600' : 'bg-gray-300'
                    }`} style={{ left: 'calc(50% + 1rem)' }}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Form Content */}
          <div className="p-6 md:p-8">
            {currentStep === 1 && <PersonalInfoForm />}
            {currentStep === 2 && <CareerGoalSelection />}
            {currentStep === 3 && <GradesInput />}
            {currentStep === 4 && <StudyAvailability />}
            {currentStep === 5 && <LearningPreferences />}
            {currentStep === 6 && <ConfirmationPage />}
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>© 2025 Student Success Platform. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default App;