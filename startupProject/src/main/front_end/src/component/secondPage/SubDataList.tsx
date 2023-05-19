/* eslint-disable */
import React, {useEffect, useRef, useState} from 'react';
import './SubDataList.css';
import titleData from '../../jData/categoryData.json';
import DataView from "./DataView";
import PartLoading from "./Animation/PartLoading";

export default function SubDataList(props:{click:number[], ChangeClick:any, data:{ id?: number, script?: string }[] | []}){
    const [filteredTitle, setFilteredTitle] = useState([{id:0, title:''}]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const noneChoose: string = '👈 Select Category you want!';
    const [scClick, setScClick] = useState<number[]>(Array(props.data.length).fill(0));
    const [liHover, setLiHover] = useState<number>(-1);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const filteredT = titleData.property.filter((item, i) => props.click[i] === 1);
        setFilteredTitle(filteredT);
    },[props.click]);
    useEffect(() => {
        document.addEventListener('mousedown', clickOutSide);
        return () => {
            document.removeEventListener('mousedown', clickOutSide);
        };
    }, []);

    useEffect(() => {
        setLoading(props.data.length === 0 || props.data === undefined);
    }, [props.data]);

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

    const clickOutSide = (event: any) => {
        const modal = document.querySelector('.view');
        if (modal && !modal.contains(event.target)) {
            setScClick(Array(props.data.length).fill(0));
        }
    };

    const viewData = (idx:number) => {
        scClick[idx] = 1;
        for(let i=0; i<scClick.length; i++){
            if(i !== idx){
                scClick[i] = 0;
            }
        }
        setScClick([...scClick]);
    }

    const ChangeScClick = () => {
        setScClick(Array(props.data.length).fill(0));
    }

    function mouseLiHover(idx : number){
        setLiHover(idx);
    }
    function mouseLiOut(){
        setLiHover(-1);
    }

    const liStyle = (idx: number) => {
        if(liHover === idx) {
            let obj = {
                top: '-15%',
                left: '-40%'
            }
            return obj;
        }
        return undefined;
    }

    return(
        <div className='SDLwrap' ref={scrollRef} onWheel={handleWheel}>
            <p>
                {props.click.findIndex((data)=>{return data === 1}) !== -1 ?
                    filteredTitle[0]?.title :
                    noneChoose
                }
            </p>
            <p>Choose a sentence that you are confident in pronouncing it</p>
            <ul className='subDataWrap'>
                {props.click.findIndex((data)=>{return data === 1}) != -1 ? (
                    props.data.map((item,i) =>
                        <>
                            <li key={item.id} onClick={()=>{
                                viewData(i);
                            }} onMouseOver={() => mouseLiHover(i)} onMouseOut={mouseLiOut}>
                                <div className='tContentWrap'>
                                    <span>{i+1}</span>
                                    <p className='scP'>{item.script}</p>
                                    <span>{i+1}</span>
                                </div>
                                <div className='elem' style={liStyle(i)}></div>
                            </li>
                            <div className='wheelP'>Use the mouse wheel!</div>
                        </>
                    )) : undefined
                }
            </ul>
            {scClick.findIndex((data) => {
                return data === 1
            }) !== -1 ? (
                <DataView scClick={scClick} ChangeScClick={ChangeScClick} data={props.data}/>
            ) : undefined
            }
            {loading ? <PartLoading /> : undefined}
        </div>
    )
}