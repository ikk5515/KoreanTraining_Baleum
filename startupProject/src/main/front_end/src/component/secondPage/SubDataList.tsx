import React, {useContext, useEffect, useState} from 'react';
import './SubDataList.css';
import scData from '../../jData/scriptData.json';

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

    useEffect(() => {
        const filteredList = text.filter((item, i) => click[i] === 1);
        setFilteredText(filteredList);
    },[click]);

    return(
        <ul className='subDataWrap'>
            {filteredText.length > 0 ? (
                filteredText.map((subArray) =>
                subArray.map((item) =>
                    <li key={item.id}>{item.scr}</li>
                ))) :
                (
                    <div className='chooseAlert'>
                        <p>Select Category you want!</p>
                    </div>
                )
            }
        </ul>
    )
}