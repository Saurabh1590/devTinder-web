import { createSlice } from "@reduxjs/toolkit";
import { removeUser } from "./userSlice";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequests: (state, action) => {
      const newArray = state.filter((r) => r._id != action.payload);
      return newArray;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(removeUser, (_state, _action) => {
      return null;
    });
  },
});

export const { addRequests, removeRequests } = requestSlice.actions;

export default requestSlice.reducer;
