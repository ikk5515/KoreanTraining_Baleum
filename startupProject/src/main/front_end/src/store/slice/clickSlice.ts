import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface CommonState{
    value: number[]
}

const initialState : CommonState = {
    value: [0,0,0,0,0]
};

export const clickSlice = createSlice({
    name: 'click',
    initialState,
    reducers: {
        setClick(state, action: PayloadAction<[]>){
            state.value = action.payload;
        }
    }
});

export const {setClick} = clickSlice.actions;

export default clickSlice;