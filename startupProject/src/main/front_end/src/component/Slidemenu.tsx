import React from 'react';
import './Slidemenu.css';
import score from '../img/score.png';
import theme from '../img/theme.png';
import menu from '../img/menu.png';

export default function Slidemenu(){
    
    return(
            <>
                <div className='uName'>Hi! Ingi</div>
                <ul>
                    <li><img src={score} alt='score'></img><p>Score</p></li>
                    <li><img src={theme} alt='theme'></img><p>Theme</p></li>
                    <li><img src={menu} alt='menu'></img><p>Menu</p></li>
                </ul>
            </>
    )
}