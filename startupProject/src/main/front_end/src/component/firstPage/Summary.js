import Category from '../Category';
import './Summary.css';

export default function Summary(){

    return(
        <>
        <section>
            <div className='textContent'>
                <h1>Speak with confidence!</h1>
                <p>Learn your confident pronunciation with</p> <p>BBALKING.</p>
            </div>
            <div className='dot1 dot'></div>
            <div className='dot2 dot'></div>
            <div className='dot3 dot'></div>
            <div className='rain1 rain'></div>            
            <div className='rain2 rain'></div>
            <div className='rain3 rain'></div>
        </section>
        <Category/>
        </>
    )
}