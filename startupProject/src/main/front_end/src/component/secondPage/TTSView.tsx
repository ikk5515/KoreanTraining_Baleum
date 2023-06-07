import {useEffect, useState} from 'react';
import * as React from 'react';
import './TTSView.css';

function TTSView(props:{selectedSc : string}) {
    const [text, setText] = useState('');

    useEffect(()=>{
        setText(props.selectedSc);
    }, [text]);

    const handleTTS = () => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        speechSynthesis.speak(utterance);
    };

    return (
        <div>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button className='ttsBtn' onClick={handleTTS}>
                <div className='play'>Listen to the sentence</div>
                <div className='picon'>▶</div>
            </button>
        </div>
    );
}

export default TTSView;