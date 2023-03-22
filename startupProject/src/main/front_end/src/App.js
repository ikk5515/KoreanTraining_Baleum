import React, {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
   const [test, setTest] = useState('')

    useEffect(() => {
        axios.get('/test')
        .then(response => setTest(response.data))
        .catch(error => console.log(error))
    }, []);

    return (
        <div>
            Spring과 React연동 Test : {test}
        </div>
    );
}

export default App;