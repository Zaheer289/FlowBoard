import { createSlice } from '@reduxjs/toolkit';
import undoable from 'redux-undo';

const boardSlice = createSlice({
  name: 'board',
  initialState: {
    elements: [],
  },
  reducers: {
    setElements: (state, action) => {
      state.elements = action.payload;
    },
  },
});

export const { setElements } = boardSlice.actions;

export default undoable(boardSlice.reducer, {
  limit: 50,
});
