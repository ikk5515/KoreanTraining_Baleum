import React from 'react';
import { useState } from 'react';
import './Header.css';

export default function Header({children} : any){
    
    const [click, setClick] = useState(0);
    console.log(click);
    return(
        <header>
            <div className='logo'>
                <p className='logoText'>Baleum.</p>
            </div>
        </header>
    )
}