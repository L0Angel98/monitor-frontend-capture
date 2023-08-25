import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  updateDataWorkstation: {}
};

const workstationsListSlice = createSlice({
  name: "workstationsList",
  initialState,
  reducers: {
    handleUpdateDataWorkstation: (state, action) => {
      if (action.payload.id) {
        state.updateDataWorkstation = action.payload;
      }
    }
  }
});

export const { handleUpdateDataWorkstation } = workstationsListSlice.actions;

export default workstationsListSlice.reducer;
