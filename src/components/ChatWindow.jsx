import React from 'react';

const ChatWindow = ({ messages }) => {
  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={msg.role === 'user' ? 'user-message' : 'bot-message'}
        >
          <p>{msg.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
