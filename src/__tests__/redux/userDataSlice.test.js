import { configureStore } from "@reduxjs/toolkit";
import { waitFor } from "@testing-library/react";
import axiosInstance from "../../../axiosConfig";
import userDataSlice, { getUserData } from "../../redux/user/userDataSlice";
import mySessionStorage from "../../controllers/sessionStorage.controllers";

// Mock axiosInstance para evitar hacer solicitudes HTTP reales
jest.mock("../../../axiosConfig", () => ({
  get: jest.fn()
}));

// Mock de react-secure-storage
jest.mock("react-secure-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn()
}));

jest.mock("../../controllers/sessionStorage.controllers");

mySessionStorage.get = jest.fn();
mySessionStorage.set = jest.fn();

describe("userDataSlice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({ reducer: { userData: userDataSlice } });
  });

  test("should not fetch user data successfully and update the state", async () => {
    // Datos simulados de la respuesta
    const mockedUserData = {
      user: {
        type: "ADAC"
      },
      company: { name: "Sample Company" },
      schedules: [
        /* Array de horarios simulados */
      ]
    };

    // Configuramos el mock para que resuelva con los datos simulados
    axiosInstance.get.mockResolvedValueOnce({
      data: { items: mockedUserData }
    });

    // Ejecutamos la acción asincrónica
    store.dispatch(getUserData());

    // Esperamos a que se resuelva la promesa (esperamos a que se complete la acción)
    await waitFor(() => {
      // Verificamos que el estado se haya actualizado correctamente
      const state = store.getState().userData;
      expect(state.sessionADAC).toBe(true);
      expect(state.user).toEqual(mockedUserData.user);
      expect(state.company).toEqual(mockedUserData.company);
      expect(state.schedules).toEqual(mockedUserData.schedules);
      expect(state.loading).toBe(false);

      // Verificamos que se haya llamado a react-secure-storage.setItem con los datos correctos
      expect(mySessionStorage.set).toHaveBeenCalledWith("sessionADAC", true);
      expect(mySessionStorage.set).toHaveBeenCalledWith(
        "user",
        mockedUserData.user
      );
      expect(mySessionStorage.set).toHaveBeenCalledWith(
        "company",
        mockedUserData.company
      );
      expect(mySessionStorage.set).toHaveBeenCalledWith(
        "schedules",
        mockedUserData.schedules
      );
    });
  });

  test("should not update the state session ADAC if it isn't type ADAC", async () => {
    // Datos simulados de la respuesta
    const mockedUserData = {
      user: {
        type: "Supervisor"
      },
      company: { name: "Sample Company" },
      schedules: [
        /* Array de horarios simulados */
      ]
    };

    // Configuramos el mock para que resuelva con los datos simulados
    axiosInstance.get.mockResolvedValueOnce({
      data: { items: mockedUserData }
    });

    // Ejecutamos la acción asincrónica
    store.dispatch(getUserData());

    // Esperamos a que se resuelva la promesa (esperamos a que se complete la acción)
    await waitFor(() => {
      // Verificamos que el estado se haya actualizado correctamente
      const state = store.getState().userData;
      expect(state.sessionADAC).toBeFalsy();
      expect(state.user).toEqual(mockedUserData.user);
      expect(state.company).toEqual(mockedUserData.company);
      expect(state.schedules).toEqual(mockedUserData.schedules);
      expect(state.loading).toBe(false);

      // Verificamos que se haya llamado a react-secure-storage.setItem con los datos correctos
      expect(mySessionStorage.set).toHaveBeenCalledWith("sessionADAC", false);
      expect(mySessionStorage.set).toHaveBeenCalledWith(
        "user",
        mockedUserData.user
      );
      expect(mySessionStorage.set).toHaveBeenCalledWith(
        "company",
        mockedUserData.company
      );
      expect(mySessionStorage.set).toHaveBeenCalledWith(
        "schedules",
        mockedUserData.schedules
      );
    });
  });

  test("should handle errors when fetching user data", async () => {
    // Configuramos el mock para que rechace la promesa con un error simulado
    axiosInstance.get.mockRejectedValueOnce(new Error("API Error"));

    // Ejecutamos la acción asincrónica
    store.dispatch(getUserData());

    // Esperamos a que se resuelva la promesa (esperamos a que se complete la acción)
    await waitFor(() => {
      // Verificamos que el estado se haya actualizado correctamente
      const state = store.getState().userData;
      expect(state.sessionADAC).toBeNull();
      expect(state.user).toEqual({});
      expect(state.company).toEqual({});
      expect(state.schedules).toEqual([]);
      expect(state.loading).toBe(false);
    });
  });
});
