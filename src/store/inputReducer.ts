import { createSlice } from "@reduxjs/toolkit";
import { ActionType } from "./store";

type InitialStateType = {
  params: string[];
};

export const initialState: InitialStateType = { params: [] };

const inputSlice = createSlice({
  name: "inputReducer",
  initialState,
  reducers: {
    setParams: (state, action: ActionType<string[]>) => {
      state.params = action.payload;
    },
  },
});

export const { name: inputReducerName, reducer: inputReducer } = inputSlice;
export const { setParams } = inputSlice.actions;
