import React from 'react';
import { speakText } from '../services/ttsServices';

const TTS = ({ text }) => {
  const handleSpeak = () => {
    speakText(text);
  };

  return (
    <button onClick={handleSpeak}>
      Speak
    </button>
  );
};

export default TTS;
