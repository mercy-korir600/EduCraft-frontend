import React, { useState } from "react";

const AskAI = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {loading && (
        <div
          style={{
            position: "absolute",  width: "100%",  height: "100%",display: "flex",alignItems: "center",
            justifyContent: "center", backgroundColor: "#f0f0f0", zIndex: 1,
          }}
        >
          Loading AI...
        </div>
      )}
      <iframe
        src="https://www.chatbase.co/chatbot-iframe/udwR9r2rOxYpJxua4kQ0c"
        width="100%"
        height="100%"
        style={{ border: "none", minHeight: "700px" }}
        title="CraftyAI Chat"
        onLoad={() => setLoading(false)}
      ></iframe>
    </div>
  );
};

export default AskAI;
