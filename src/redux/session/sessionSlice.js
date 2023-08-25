import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import auth from "../../controllers/auth.controllers";
import secureLocalStorage from "react-secure-storage";
import { SESSION } from "../../routes";
import axiosInstance from "../../../axiosConfig";
import myLocalStorage from "../../controllers/localStorage.controller";
import mySessionStorage from "../../controllers/sessionStorage.controllers";
import { validationValue } from "../../utils/validations";

export const login = createAsyncThunk(
  "session/login",
  async ({ user, password }) => {
    try {
      const patternByEmails = new RegExp(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      );
      const isEmail = patternByEmails.test(user);

      let params = {
        session: {
          password: password,
          [isEmail ? "email" : "alias"]: user,
          service: "capture"
        }
      };
      const response = await axiosInstance.post(SESSION.LOGIN, params);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const loginWithAccessCode = createAsyncThunk(
  "session/loginWithAccessCode",
  async ({ access_code, company_id }) => {
    let params = {
      access_code,
      company_id
    };

    try {
      const response = await axiosInstance.post(
        SESSION.LOGIN_ACCESS_CODE,
        params,
        {
          headers: {
            Authorization: `Token ${secureLocalStorage.getItem("token")}`
          }
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const checkStatusSession = createAsyncThunk(
  "session/checkStatus",
  async () => {
    const isAuth = await auth.checkTokenSavedAndValidated();
    return isAuth;
  }
);

export const logout = createAsyncThunk("session/logout", async () => {
  try {
    const status = await auth.logout();
    return status;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  isAuth: false,
  token: validationValue(secureLocalStorage.getItem("token"), ""),
  textBtn: "",
  textAccessCode: "",
  sessionWithCode: validationValue(
    mySessionStorage.get("sessionWithCode"),
    null
  ),
  loadingCheckSession: false
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    logoutAccessCode: state => {
      mySessionStorage.remove("sessionWithCode");
      state.sessionWithCode = false;
    }
  },
  extraReducers: builder => {
    //builder login
    builder.addCase(login.pending, state => {
      state.textBtn = "Login...";
    });

    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload.code) {
        auth.create(action.payload.access_token);
        state.textBtn = "";
        state.isAuth = true;
        myLocalStorage.set("session", "active");
      } else {
        state.textBtn = "Usuario o contraseña incorrectos";
      }
    });

    builder.addCase(login.rejected, state => {
      state.textBtn = "Error";
    });

    //builder checkStatusSession
    builder.addCase(checkStatusSession.fulfilled, (state, action) => {
      const isAuth = action.payload;
      if (isAuth) {
        state.token = secureLocalStorage.getItem("token");
      }
      state.isAuth = isAuth;
      state.loadingCheckSession = false;
    });

    builder.addCase(checkStatusSession.pending, state => {
      state.loadingCheckSession = true;
    });

    builder.addCase(checkStatusSession.rejected, state => {
      state.isAuth = false;
      state.loadingCheckSession = false;
    });

    //builder Logout
    builder.addCase(logout.fulfilled, (state, action) => {
      const status = action.payload;
      state.sessionWithCode = mySessionStorage.get("sessionWithCode");
      state.isAuth = !status;
    });

    //builder Login with access code
    builder.addCase(loginWithAccessCode.fulfilled, (state, action) => {
      if (action.payload.code) {
        mySessionStorage.set("sessionWithCode", true);
        state.sessionWithCode = true;
        auth.create(action.payload.access_token);
        state.token = action.payload.access_token;
        state.textAccessCode = "";
      } else {
        state.textAccessCode = "Código de acceso incorrecto";
      }
    });

    builder.addCase(loginWithAccessCode.pending, state => {
      state.textAccessCode = "Accediendo...";
    });

    builder.addCase(loginWithAccessCode.rejected, state => {
      state.textAccessCode = "Error";
    });
  }
});

export const { logoutAccessCode } = sessionSlice.actions;

export default sessionSlice.reducer;
