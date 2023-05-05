import React, {useEffect, useRef, useState} from 'react';
import './SubDataList.css';
import data from '../../jData/categoryData.json';



const text = [
    [
        {id: 1, scr: "테스트 인덱스1 1번!"},
        {id: 2, scr: "테스트 인덱스1 2번!"},
        {id: 3, scr: "테스트 인덱스1 3번!"},
        {id: 4, scr: "테스트 인덱스1 4번!"},
        {id: 1, scr: "테스트 인덱스1 5번!"},
        {id: 2, scr: "테스트 인덱스1 6번!"},
        {id: 3, scr: "테스트 인덱스1 7번!"},
        {id: 4, scr: "테스트 인덱스1 8번!"}
    ],
    [
        {id: 1, scr: "테스트 인덱스2 1번!"},
        {id: 2, scr: "테스트 인덱스2 2번!"},
        {id: 3, scr: "테스트 인덱스2 3번!"},
        {id: 4, scr: "테스트 인덱스2 4번!"},
        {id: 1, scr: "테스트 인덱스2 5번!"},
        {id: 2, scr: "테스트 인덱스2 6번!"},
        {id: 3, scr: "테스트 인덱스2 7번!"},
        {id: 4, scr: "테스트 인덱스2 8번!"}
    ],
    [
        {id: 1, scr: "테스트 인덱스3 1번!"},
        {id: 2, scr: "테스트 인덱스3 2번!"},
        {id: 3, scr: "테스트 인덱스3 3번!"},
        {id: 4, scr: "테스트 인덱스3 4번!"},
        {id: 1, scr: "테스트 인덱스3 5번!"},
        {id: 2, scr: "테스트 인덱스3 6번!"},
        {id: 3, scr: "테스트 인덱스3 7번!"},
        {id: 4, scr: "테스트 인덱스3 8번!"}
    ],
    [
        {id: 1, scr: "테스트 인덱스4 1번!"},
        {id: 2, scr: "테스트 인덱스4 2번!"},
        {id: 3, scr: "테스트 인덱스4 3번!"},
        {id: 4, scr: "테스트 인덱스4 4번!"},
        {id: 1, scr: "테스트 인덱스4 5번!"},
        {id: 2, scr: "테스트 인덱스4 6번!"},
        {id: 3, scr: "테스트 인덱스4 7번!"},
        {id: 4, scr: "테스트 인덱스4 8번!"}
    ]
]
export default function SubDataList(props:{click:number[], ChangeClick:any}){
    const {click} = props;
    const [filteredText, setFilteredText] = useState([[{id:0,scr:''}]]);
    const [filteredTitle, setFilteredTitle] = useState([{id:0, title:''}]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const noneChoose: string = '👈 Select Category you want!';

    useEffect(() => {
        const filteredList = text.filter((item, i) => click[i] === 1);
        setFilteredText(filteredList);
    },[click]);
    useEffect(() => {
        const filteredT = data.property.filter((item, i) => click[i] === 1);
        setFilteredTitle(filteredT);
    },[click]);

    function handleWheel(e:any){
        const scroll = scrollRef.current;
        const scrollPosition = scroll?.scrollLeft || 0;
        if (scroll) {
            scroll.scrollTo({
                left: scrollPosition + e.deltaY,
                behavior: "smooth",
            });
        }
    };

    return(
        <div className='SDLwrap' ref={scrollRef} onWheel={handleWheel}>
            <p>
                {filteredTitle.length > 0 ?
                    filteredTitle[0].title :
                    noneChoose
                }
            </p>
            <p>Choose a sentence that you are confident in pronouncing it</p>
            <ul className='subDataWrap'>
                {filteredText.length > 0 ? (
                        filteredText.map((subArray) =>
                            subArray.map((item) =>
                                <>
                                    <li key={item.id}>{item.scr}</li>
                                    <div className='wheelP'>Use the mouse wheel!</div>
                                </>
                            ))) : undefined
                }
            </ul>
        </div>
    )
}