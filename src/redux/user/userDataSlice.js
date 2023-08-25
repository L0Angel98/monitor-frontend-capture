import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import mySessionStorage from "../../controllers/sessionStorage.controllers";
import { validationValue } from "../../utils/validations";
import axiosInstance from "../../../axiosConfig";
import { USER } from "../../routes";
import secureLocalStorage from "react-secure-storage";

const initialState = {
  user: validationValue(mySessionStorage.get("user"), {}),
  company: validationValue(mySessionStorage.get("company"), {}),
  schedules: validationValue(mySessionStorage.get("schedules"), []),
  sessionADAC: validationValue(mySessionStorage.get("sessionADAC"), null),
  loading: false
};

export const getUserData = createAsyncThunk("user/userData", async token => {
  try {
    const resp = await axiosInstance.get(USER.DATA_USER, {
      headers: {
        Authorization: `Token ${secureLocalStorage.getItem("token")}`
      }
    });
    return resp.data.items;
  } catch (error) {
    throw error;
  }
});

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  extraReducers: builder => {
    builder.addCase(getUserData.pending, state => {
      state.loading = true;
    });

    builder.addCase(getUserData.fulfilled, (state, action) => {
      if (action.payload) {
        if (!!!mySessionStorage.get("sessionADAC")) {
          const isSessionADAC = action.payload.user.type === "ADAC";
          state.sessionADAC = isSessionADAC;
          mySessionStorage.set("sessionADAC", isSessionADAC);
        }

        Object.keys(action.payload).forEach(key => {
          if ((key, action.payload[key])) {
            mySessionStorage.set(key, action.payload[key]);
            state[key] = action.payload[key];
          }
        });
      }

      state.loading = false;
    });

    builder.addCase(getUserData.rejected, state => {
      state.loading = false;
    });
  }
});

export default userDataSlice.reducer;
