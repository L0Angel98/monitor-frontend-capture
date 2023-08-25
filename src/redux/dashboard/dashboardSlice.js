import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { validationValue } from "../../utils/validations";
import myLocalStorage from "../../controllers/localStorage.controller";
import axiosInstance from "../../../axiosConfig";
import secureLocalStorage from "react-secure-storage";
import moment from "moment";
import { DASHBOARD } from "../../routes";

export const startWorkingWorkstation = createAsyncThunk(
  "dashboard/start-working-workstation",
  async workstation => {
    const { id } = workstation;
    try {
      const resp = await axiosInstance.post(
        DASHBOARD.START_WORKING,
        {
          id
        },
        {
          headers: {
            Authorization: `Token ${secureLocalStorage.getItem("token")}`
          }
        }
      );
      return { ...resp.data, workstation };
    } catch (error) {
      throw error;
    }
  }
);

export const stopWorkingWorkstation = createAsyncThunk(
  "dashboard/stop-working-workstation",
  async (_, { getState }) => {
    const { dashboard } = getState();
    const { workstationSelected } = dashboard;
    try {
      if (!workstationSelected) {
        return { code: 0, messages: ["No hay una estación activa"] };
      }
      const resp = await axiosInstance.post(
        DASHBOARD.STOP_WORKING,
        {
          id: workstationSelected.id
        },
        {
          headers: {
            Authorization: `Token ${secureLocalStorage.getItem("token")}`
          }
        }
      );
      return resp.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getWorkstationData = createAsyncThunk(
  "dashboard/workstation",
  async (_, { getState }) => {
    const { dashboard } = getState();
    const { workstationSelected } = dashboard;
    try {
      if (!workstationSelected) {
        return { code: 0, messages: ["No hay una estación activa"] };
      }
      const resp = await axiosInstance.get(DASHBOARD.WORKSTATION_INFO, {
        params: {
          workstation_id: workstationSelected.id,
          even_time: moment().format("YYYY-MM-DD HH:mm:ss")
        },
        headers: {
          Authorization: `Token ${secureLocalStorage.getItem("token")}`
        }
      });
      return { ...resp.data };
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  workstationSelected: validationValue(
    myLocalStorage.get("workstationSelected"),
    null
  ),
  loading: false,
  errorsStartWorking: [],
  errorsStopWorking: [],
  errors: [],
  workstation: null,
  changePart: false
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    changeWorkstationSelect: (state, action) => {
      const { id } = action.payload;
      if (id) {
        state.workstationSelected = action.payload;
        myLocalStorage.set("workstationSelected", action.payload);
      }
    },
    handleChangePart: (state, action) => {
      state.changePart = action.payload;
    }
  },
  extraReducers: builders => {
    // start working workstation
    builders.addCase(startWorkingWorkstation.pending, state => {
      state.loading = true;
      state.errorsStartWorking = [];
    });
    builders.addCase(startWorkingWorkstation.rejected, (state, action) => {
      state.loading = false;
      state.errorsStartWorking = [action.error.message];
    });
    builders.addCase(startWorkingWorkstation.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.code) {
        state.workstationSelected = action.payload.workstation;
        myLocalStorage.set("workstationSelected", action.payload.workstation);
      } else {
        const messages = action.payload.messages;
        if (!!messages && messages.length > 0) {
          state.errorsStartWorking = [...messages];
        } else {
          state.errorsStartWorking = ["Error al activar la estación"];
        }
      }
    });

    // stop working workstation
    builders.addCase(stopWorkingWorkstation.pending, state => {
      state.loading = true;
      state.errorsStopWorking = [];
    });
    builders.addCase(stopWorkingWorkstation.rejected, (state, action, a) => {
      state.loading = false;
      state.errorsStopWorking = [action.error.message];
    });
    builders.addCase(stopWorkingWorkstation.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.code) {
        state.workstationSelected = null;
        state.workstation = null;
        state.changePart = false;
        myLocalStorage.remove("workstationSelected");
      } else {
        const messages = action.payload.messages;
        if (!!messages && messages.length > 0) {
          state.errorsStopWorking = [...messages];
        } else {
          state.errorsStopWorking = ["Error al desactivar la estación"];
        }
      }
    });

    //get data workstation
    builders.addCase(getWorkstationData.pending, state => {
      state.loading = true;
    });
    builders.addCase(getWorkstationData.rejected, (state, action) => {
      state.loading = false;
      state.errors = [action.error.message];
    });
    builders.addCase(getWorkstationData.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.code === 0) {
        state.errors = action.payload.messages;
      } else {
        state.errors = [];
        state.workstation = action.payload.items;
      }
    });
  }
});

export const { changeWorkstationSelect, handleChangePart } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
