import React, { useState } from "react";
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const AskAI = () => {
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar isOpen={sidebarOpen} toggleOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header isOpen={sidebarOpen} toggleOpen={setSidebarOpen} />

        <main className="flex-1 overflow-hidden relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900 z-10 transition-colors duration-300">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600 dark:text-gray-400 font-serif">Loading AI Assistant...</p>
              </div>
            </div>
          )}
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/udwR9r2rOxYpJxua4kQ0c"
            className="w-full h-full border-none"
            title="CraftyAI Chat"
            onLoad={() => setLoading(false)}
          ></iframe>
        </main>
      </div>
    </div>
  );
};

export default AskAI;
