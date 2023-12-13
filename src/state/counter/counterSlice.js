import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      if (state.value <= 6) {
        state.value += 1;
      } else {
        console.log("list exhausted");
      }
    },
    decrement: (state) => {
      if (state.value !== 0) {
        state.value -= 1;
      }
    },
    setCounter: (state, action) => {
      // Assuming action.payload is the input number
      state.value = action.payload;
    },
  },
});

export const { increment, decrement,setCounter } = counterSlice.actions;

export default counterSlice.reducer;
