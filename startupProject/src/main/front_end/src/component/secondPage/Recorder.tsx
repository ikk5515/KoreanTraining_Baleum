import React, { useState, useRef } from 'react';
import './Recorder.css';
import WavEncoder from 'wav-encoder';

function Recorder() {
  const [recording, setRecording] = useState<boolean>(false);
  const [audioURL, setAudioURL] = useState<string>('');
  const recorderRef = useRef<MediaRecorder | null>(null);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm; codecs=opus' });

      recorderRef.current = recorder;

      const chunks: BlobPart[] = [];

      recorder.addEventListener('dataavailable', (event: BlobEvent) => {
        chunks.push(event.data);
      });

      recorder.addEventListener('stop', async () => {
        const blob = new Blob(chunks, { type: 'audio/webm; codecs=opus' });
        const audioContext = new AudioContext();
        const audioBuffer = await audioContext.decodeAudioData(await blob.arrayBuffer());
        const audioData = {
          sampleRate: audioBuffer.sampleRate,
          channelData: Array.from({ length: audioBuffer.numberOfChannels }, (_, i) => audioBuffer.getChannelData(i))
        };
        const wavBuffer = await WavEncoder.encode(audioData);
        const wavBlob = new Blob([wavBuffer], { type: 'audio/wav' });
        const url = URL.createObjectURL(wavBlob);
        setAudioURL(url);
        const formData = new FormData();
        formData.append('audio', wavBlob, 'recording.wav');
        fetch('/upload', { method: 'POST', body: formData });
      });

      recorder.start();

      setRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const handleStopRecording = () => {
    const recorder = recorderRef.current;

    if (recorder) {
      recorder.stop();
      setRecording(false);
    }
  };

  const handleSaveRecording = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = audioURL;
    downloadLink.download = 'recording.wav';

    // 클릭하여 다운로드합니다.
    downloadLink.click();

    // URL 객체를 해제합니다.
    URL.revokeObjectURL(audioURL);
  };

  return (
    <div className='recordWrap'>
      {recording ? (
        <button onClick={handleStopRecording}>Stop Recording</button>
      ) : (
        <button onClick={handleStartRecording}>Start Recording</button>
      )}
      {audioURL && (
        <div className='audioWrap'>
          <audio src={audioURL} controls />
          <button onClick={handleSaveRecording}>Save Recording</button>
        </div>
      )}
    </div>
  );
}

export default Recorder;