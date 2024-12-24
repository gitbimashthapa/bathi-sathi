import React, { useState } from 'react';

const MicrophoneButton = ({ onSend }) => {
  const [userInput, setUserInput] = useState('');

  const handleSendClick = () => {
    if (userInput.trim() !== '') {
      onSend(userInput);
      setUserInput(''); // Clear input after sending
    }
  };

  return (
    <div className="microphone-section">
      <input
        type="text"
        value={userInput}
        placeholder="Type something (voice feature coming soon!)"
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button onClick={handleSendClick}>Send</button>
    </div>
  );
};

export default MicrophoneButton;
