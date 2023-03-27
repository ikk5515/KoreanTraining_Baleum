import { useState } from 'react';
import './Header.css';

export default function Header(){
    
    const [click, setClick] = useState(0);
    console.log(click);
    return(
        <header>
            <div className='logo'>BBALKING</div>
            <div className='hamWrap' 
                onClick={() => {
                    setClick(click ? 0 : 1);
                }}
            >
                <div className='ham h1' style={
                    click ? {
                        transform : 'rotate(45deg)', 
                        top : '15px',
                        transition : '0,5s',
                    } : {
                        transform : 'rotate(0deg)', 
                        top : '0px',
                        transition : '0.5s',}
                }></div>
                <div className='ham h2' style={
                    click ? {
                        transform : 'rotate(-45deg)', 
                        transition : '0.5s',
                    } : {
                        transform : 'rotate(0deg)', 
                        transition : '0.5s',}
                }></div>
                <div className='ham h3' style={
                    click ? {
                        transform : 'rotate(45deg)', 
                        top : '15px',
                        transition : '0,5s',
                    } : {
                        transform : 'rotate(0deg)', 
                        top : '30px',
                        transition : '0.5s',}
                }></div>
            </div>

        </header>
    )
}