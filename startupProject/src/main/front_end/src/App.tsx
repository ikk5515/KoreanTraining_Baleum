/* eslint-disable */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from './component/Header';
import Summary from './component/firstPage/Summary';
import Slidemenu from './component/Slidemenu';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FuncApp from './component/secondPage/FuncApp';
import DataView from "./component/secondPage/DataView";
import ScoreView from "./component/secondPage/ScoreView";

function App() {
    return (
        <BrowserRouter>
            <Header >
                <Slidemenu/>
            </Header>
            <Routes>
                <Route path='/' element={<Summary/>}/>
                <Route path='/func' element={<FuncApp />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;