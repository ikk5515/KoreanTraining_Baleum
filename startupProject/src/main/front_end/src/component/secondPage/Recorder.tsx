import React, {useState, useRef} from 'react';
import './Recorder.css';
import WavEncoder from 'wav-encoder';
import OnAir from './Animation/OnAir';
import ScoreView from "./ScoreView";

function Recorder(props:{scClick:number[], ChangeScClick:any, data:{ id?: number, script?: string }[], selectedSc:string}) {
    const [recording, setRecording] = useState<boolean>(false);
    const [audioURL, setAudioURL] = useState<string>('');
    const recorderRef = useRef<MediaRecorder | null>(null);
    const [showScore, setShowScore] = useState<boolean>(false);
    const [score, setScore] = useState<number>(-1);

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
                formData.append('script', props.selectedSc );
                const response = await fetch('/upload', { method: 'POST', body: formData });
                const responseData = await response.text();
                setScore(parseFloat(responseData));
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
            setShowScore(true);
        }
    };

    function stopBtnStyle() {
        let sObj = {
            width : '500px',
            display : 'flex',
            justifyContent : 'center',
            alignItems: 'center',
            left: 'calc(50% - 250px)'
        }
        return sObj;
    }

    return (
        <>
            <div className='recordWrap'>
                {recording ? (
                    <button onClick={handleStopRecording} style={stopBtnStyle()}>
                        <OnAir/>
                        <p className='stop'>Stop Recording</p>
                    </button>
                ) : (
                    <button onClick={handleStartRecording}>Start Recording</button>
                )}
                {audioURL && (
                    <div className='audioWrap'>
                        <audio src={audioURL} controls/>
                        {/*<button onClick={handleSaveRecording}>Save Recording</button>*/}
                    </div>
                )}
            </div>
            {showScore ? (
                <ScoreView setShowScore={setShowScore} score={score} ChangeScClick={props.ChangeScClick}/>
            ) : undefined
            }
        </>
    );
}

export default Recorder;