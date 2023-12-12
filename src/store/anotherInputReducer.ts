import { createSlice } from "@reduxjs/toolkit";
import { ActionType } from "./store";

type InitialStateType = {
  anotherParams: string[];
};

export const initialState: InitialStateType = { anotherParams: [] };

const anotherInputSlice = createSlice({
  name: "anotherInputReducer",
  initialState,
  reducers: {
    setAnotherParams: (state, action: ActionType<string[]>) => {
      state.anotherParams = action.payload;
    },
  },
});

export const { name: anotherInputReducerName, reducer: anotherInputReducer } =
  anotherInputSlice;
export const { setAnotherParams } = anotherInputSlice.actions;
