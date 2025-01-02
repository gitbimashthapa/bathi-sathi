import React, { useRef, useState } from 'react';

function STT({ onTranscribed }) {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  if (!recognitionRef.current && 'webkitSpeechRecognition' in window) {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (onTranscribed) {
        onTranscribed(transcript);
      }
    };

    recognition.onerror = (err) => {
      console.error('Speech recognition error:', err);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
  }

  const startRecording = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition not supported in this browser!');
      return;
    }
    recognitionRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div>
      <button onClick={startRecording} disabled={isRecording}>
        {isRecording ? 'Recording...' : 'Start'}
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop
      </button>
    </div>
  );
}

export default STT;