import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import MicrophoneButton from './components/MicrophoneButton';
import { getOpenAIResponse } from './services/openAIServices'; // import our function
import './styles.css';

function App() {
  const [messages, setMessages] = useState([]);

  // Helper function to send conversation to OpenAI
  const fetchBotResponse = async (updatedMessages) => {
    // Call our service with the full conversation
    const botReply = await getOpenAIResponse(updatedMessages);
    // Add the bot's message to our conversation
    setMessages((prev) => [
      ...prev,
      { role: 'assistant', content: botReply },
    ]);
  };


  const handleSendMessage = async (text) => {
    // Add user's message
    const newUserMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, newUserMessage]);

    // 2. Prepare the updated conversation for the bot
    const updatedConversation = [...messages, newUserMessage];

    // 3. Send updated conversation to OpenAI
    await fetchBotResponse(updatedConversation);
  };

  return (
    <div className="App">
      <h1>Bathi Sathi</h1>
      <ChatWindow messages={messages} />
      <MicrophoneButton onSend={handleSendMessage} />
    </div>
  );
}

export default App;