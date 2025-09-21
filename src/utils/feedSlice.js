import { createSlice } from "@reduxjs/toolkit";
import { removeUser } from "./userSlice";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeUserFromFeed: (state, action) => {
      const newFeed = state.filter((user) => user._id != action.payload);
      return newFeed;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(removeUser, (_state, _action) => {
      return null;
    });
  },
});

export const { addFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;