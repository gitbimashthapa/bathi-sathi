
import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import MicrophoneButton from './components/MicrophoneButton';
import './styles.css';

function App() {
  // Keep track of messages in an array of objects
  const [messages, setMessages] = useState([]);

  //handler to add new user messages
  const handleSendMessage = (text) => {
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    
  };

  return (
    <div className="App">
      <h1>Bathi Sathi</h1>
      {/* ChatWindow will display conversation */}
      <ChatWindow messages={messages} />

      {/* MicrophoneButton will be replaced with actual voice input later */}
      <MicrophoneButton onSend={handleSendMessage} />
    </div>
  );
}

export default App;
