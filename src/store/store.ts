import { configureStore } from "@reduxjs/toolkit";
import { inputReducer, inputReducerName } from "./inputReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { anotherInputReducer, anotherInputReducerName } from "./anotherInputReducer";

export type ActionType<T> ={
    payload: T;
    type: string;
}

export const store = configureStore({
  reducer: {
    [inputReducerName]: inputReducer,
    [anotherInputReducerName]: anotherInputReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
