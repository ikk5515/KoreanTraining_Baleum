/* eslint-disable */
import React, {useState, useEffect} from 'react';
import FuncList from './FuncList';
import BgElement from '../firstPage/BgElement';
import './FuncApp.css'
import DataView from './DataView';
import {useLocation} from "react-router-dom";
import axios from "axios";

const testData = [
"daily(DAILYNO=1, MSCRIPT=이거 얼마에요?)",
"daily(DAILYNO=2, MSCRIPT=화장실은 어디있어?)",
"daily(DAILYNO=3, MSCRIPT=걸어서 몇 분 걸립니까?)",
"daily(DAILYNO=4, MSCRIPT=이 주변에 맛집은 어디인가요?)",
"daily(DAILYNO=5, MSCRIPT=이 근처에 싸고 맛있는 가게 있나요?)",
"daily(DAILYNO=6, MSCRIPT=이 근처에 지하철역이 있나요?)",
"daily(DAILYNO=7, MSCRIPT=하나에 얼마인가요?)",
"daily(DAILYNO=8, MSCRIPT=잠깐만 기다려주세)",
"daily(DAILYNO=9, MSCRIPT=이 가게는 어디에 있나요?)",
"daily(DAILYNO=10, MSCRIPT=고기가 살짝 좀 익은 것 같아)"
]
// 프론트에서 클릭값을 백으로 넘겨주면 그에 맞는 데이터를 배열로 프로트로 보내줌
// 즉 모든 카테고리의 데이터를 보내느 것이 아님
// 클릭 값을 보낸다 -> 백에서 해당 데이터베이스를 select해서 프로트트로 문자배열로 전달한다
// -> 받은 데이터로 subDataList의 값을 useEffect로 변경하여 랜더링한다.

const parsedObj: { id?: number, script?: string }[] = [];
function parsingTestData(s:string) {
    const idMatch = s.match(/NO=(\w+)/)?? undefined; // 문자열에서 숫자만 추출
    const id = idMatch ? parseInt(idMatch[1]) : undefined;
    const scriptIndex = s.search(/[DMB]SCRIPT=[^)]+\)/); // 'DSCRIPT='이 시작되는 인덱스
    const script = scriptIndex !== -1 ? s.substring(scriptIndex + 8, s.length - 1) : ''; // 'DSCRIPT=' 다음 문자열부터 끝에서 2번째 문자열까지 추출
    const scriptObject = { id, script };
    parsedObj.push(scriptObject);
}
testData.map((item)=>{
    parsingTestData(item);
})
parsedObj.map((item, i)=> {
    console.log(`분해된 데이터 ${i+1} = id: ${item.id}, script: ${item.script}`);
})


export default function FuncApp(){
    const location = useLocation();
    const hover = location.state.value;
    const [hoverState, setHoverState] = useState<number[]>([]);
    const [click, setClick] = useState<number[]>([]);
    const [test, setTest] = useState();
    useEffect(() => {
        if (hover) {
            setHoverState(hover);
        }
    }, []);
    useEffect(() => {
        setClick(hoverState);
    }, [click]);
    function ChangeClick(index : number){
        click[index] = click[index] ? 0 : 1;
        for(let i=0; i<click.length; i++){
            if(i !== index){
                click[i] = 0;
            }
        }
        setClick([...click]);
    }

    useEffect(() => {
        axios.get('http://localhost:8080/api/articles')
            .then(response => setTest(response.data))
            .catch(error => console.log(error))
    },[]);
    console.log('백앤드에서 받아온 데이터 : ' + test);

    // @ts-ignore
    return(
        <div className='funcAppWrap'>
            <FuncList click={click} ChangeClick={ChangeClick} data={parsedObj}/>
            {/*<DataView/>*/}
            <BgElement height={'500px'} display={'none'}/>
        </div>
    )
}