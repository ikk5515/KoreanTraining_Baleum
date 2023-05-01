import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import clickSlice from "./slice/clickSlice";

const rootReducer = combineReducers({
    click: clickSlice.reducer
});

const initailState = {};

export const store = configureStore({
    reducer : rootReducer,
    devTools: process.env.Node_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
