import React, { useState, useRef } from 'react';
import './Recorder.css';

function Recorder() {
  const [recording, setRecording] = useState<boolean>(false);
  const [audioURL, setAudioURL] = useState<string>('');
  const recorderRef = useRef<MediaRecorder | null>(null);

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);

    recorderRef.current = recorder;

    const chunks: BlobPart[] = [];

    recorder.addEventListener('dataavailable', (event: BlobEvent) => {
      chunks.push(event.data);
    });

    recorder.addEventListener('stop', () => {
      const blob = new Blob(chunks, { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
      const formData = new FormData();
      formData.append('audio', blob, 'recording.wav');
      fetch('/upload', { method: 'POST', body: formData });
    });

    recorder.start();

    setRecording(true);
  };

  const handleStopRecording = () => {
    const recorder = recorderRef.current;

    if (recorder) {
      recorder.stop();
      setRecording(false);
    }
  };

  const handleSaveRecording = () => {
    const link = document.createElement('a');
    link.href = audioURL;
    link.download = 'recording.wav';
    link.click();
  };

  return (
    <div className='recordWrap'>
      {recording ? (
        <button onClick={handleStopRecording}>Stop Recording</button>
      ) : (
        <button onClick={handleStartRecording}>Start Recording</button>
      )}
      {audioURL && (
        <div>
          <audio src={audioURL} controls />
          <button onClick={handleSaveRecording}>Save Recording</button>
        </div>
      )}
    </div>
  );
}

export default Recorder;