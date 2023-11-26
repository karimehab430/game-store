import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    value: JSON.parse(localStorage.getItem("favorites")) || [],
  },
  reducers: {
    add: (state, action) => {
      state.value.push(action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.value));
    },
    remove: (state, action) => {
      state.value = state.value.filter((game) => game.id !== action.payload.id);
      localStorage.setItem("favorites", JSON.stringify(state.value));
    },
  },
});

export const { add, remove } = favoritesSlice.actions;
export default favoritesSlice.reducer;
