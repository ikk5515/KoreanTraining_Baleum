import './Category.css';
import data from '../jData/categoryData.json';

export default function Category(){

    return(
        <div className='cateWrap'>
            <div className='blueCircle'></div>
            <div className='textArea'>
                <h1>Check your pronunciation skills!</h1>
                <p>BBALKING</p> <p>provides you with various text for grading.</p>
                <p>Choose the theme you want!</p>
            </div>
            <ul>
                {data.property.map((item) => (
                    <li key={item.id}>
                        {item.title}
                        <span>▶</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}