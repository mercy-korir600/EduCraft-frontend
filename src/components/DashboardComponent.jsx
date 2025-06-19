import React from 'react';

const DashboardComponent = () => {
  const stats = [
    { name: 'Project Completion', value: '75%', trend: 'up' },
    { name: 'Weekly Performance', value: '84%', trend: 'up' },
    { name: 'Tasks Due', value: '3', trend: 'steady' }
  ];

  const upcomingTasks = [
    { id: 1, name: 'Complete project proposal', due: 'Tomorrow', priority: 'high' },
    { id: 2, name: 'Review analytics dashboard', due: 'Friday', priority: 'medium' },
    { id: 3, name: 'Team sync meeting', due: 'Next Monday', priority: 'low' }
  ];

  return (
    <div className='flex '>
     <div className="p-6 bg-gray-50 min-h-screen flex-1">
      <h1 className="text-3xl font-bold text-emerald-700 mb-8 text-center">📊 Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-300">
            <p className="text-sm text-gray-500">{stat.name}</p>
            <div className="flex items-end mt-2">
              <p className="text-4xl font-bold text-gray-800">{stat.value}</p>
              <span className="ml-2 text-2xl">
                {stat.trend === 'up' ? '📈' : stat.trend === 'down' ? '📉' : '➡️'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Section */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold text-emerald-700 mb-4">🛠 Current Tasks Progress</h2>
        <div className="space-y-5">
          {[70, 45, 90].map((progress, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1 text-sm font-medium text-gray-600">
                <span>Task {index + 1}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-emerald-600 h-3 rounded-full transition-all duration-500" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-emerald-700 mb-4">🗓 Upcoming Tasks</h2>
        <ul className="divide-y">
          {upcomingTasks.map(task => (
            <li key={task.id} className="py-4 flex justify-between items-center">
              <span className="font-medium text-gray-700">{task.name}</span>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                task.priority === 'high' ? 'bg-red-100 text-red-700' :
                task.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
                'bg-blue-100 text-blue-700'
              }`}>
                {task.due}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default DashboardComponent;
