import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import STT from './components/STT'; 
import { getOpenAIResponse } from './services/openAIServices';
import './styles.css';

function App() {
  const [messages, setMessages] = useState([]);

  // Send entire conversation to OpenAI and append bot's reply
  const fetchBotResponse = async (updatedMessages) => {
    try {
      const botReply = await getOpenAIResponse(updatedMessages);
      setMessages((prev) => [...prev, { role: 'assistant', content: botReply }]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
    }
  };


  const handleSendMessage = async (text) => {
    // Add user's message
    const newUserMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, newUserMessage]);

    // Send updated conversation to OpenAI
    const updatedConversation = [...messages, newUserMessage];
    await fetchBotResponse(updatedConversation);
  };

  return (
    <div className="App">
      <h1>Bathi Sathi</h1>
      <ChatWindow messages={messages} />

      {/* STT: We pass handleSendMessage as onTranscribed */}
      <STT onTranscribed={handleSendMessage} />
    </div>
  );
}

export default App;