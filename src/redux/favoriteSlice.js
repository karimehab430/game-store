import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    add: (state, action) => {
      state.value.push(action.payload);
    },
    remove: (state, action) => {
      const idx = state.value.findIndex((ele) => ele.id === action.payload.id);
      state.value.splice(idx, 1);
    },
  },
});

export const { add, remove } = favoriteSlice.actions;
export default favoriteSlice.reducer;
