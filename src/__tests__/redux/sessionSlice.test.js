import { configureStore } from "@reduxjs/toolkit";
import sessionReducer, {
  checkStatusSession,
  login,
  loginWithAccessCode
} from "../../redux/session/sessionSlice";
import auth from "../../controllers/auth.controllers";
import secureLocalStorage from "react-secure-storage";
import lolex from "lolex";
import { waitFor } from "@testing-library/react";
import axiosInstance from "../../../axiosConfig";
import myLocalStorage from "../../controllers/localStorage.controller";
import mySessionStorage from "../../controllers/sessionStorage.controllers";

describe("sessionSlice", () => {
  jest.mock("../../../axiosConfig.js");
  axiosInstance.post = jest.fn();
  axiosInstance.get = jest.fn();

  beforeEach(() => {
    secureLocalStorage.clear();
    axiosInstance.post.mockClear();
    axiosInstance.get.mockClear();
  });

  describe("login", () => {
    test("should handle login.fulfilled and saved token", async () => {
      const mockData = {
        status: "success",
        data: { code: 1, access_token: "fakeAccessToken" }
      };

      axiosInstance.post.mockResolvedValue(mockData);

      const store = configureStore({ reducer: { session: sessionReducer } });

      const fakeUserData = {
        user: "fakeuser@example.com",
        password: "fakepassword"
      };

      await store.dispatch(login(fakeUserData));

      const state = store.getState();
      expect(state.session.textBtn).toBe("");
      expect(secureLocalStorage.getItem("token")).toBe("fakeAccessToken");
      expect(myLocalStorage.get("session")).toBe("active");
    });

    test("should handle login.pending", async () => {
      const mockData = {
        status: "success",
        data: { code: 1, access_token: "fakeAccessToken" }
      };

      axiosInstance.post.mockResolvedValue(mockData);

      const store = configureStore({ reducer: { session: sessionReducer } });

      const fakeUserData = {
        user: "fakeuser@example.com",
        password: "fakepassword"
      };

      store.dispatch(login(fakeUserData));

      await waitFor(() =>
        expect(store.getState().session.textBtn).toBe("Login...")
      );

      const state = store.getState();

      expect(state.session.textBtn).toBe("Login...");
    });

    test("should handle login.rejected", async () => {
      axiosInstance.post.mockRejectedValue(new Error("Network error"));

      const store = configureStore({ reducer: { session: sessionReducer } });

      const fakeUserData = {
        user: "fakeuser@example.com",
        password: "fakepassword"
      };

      await store.dispatch(login(fakeUserData));

      const state = store.getState();

      expect(state.session.textBtn).toBe("Error");
    });
  });

  // describe("checkStatusSession", () => {
  //   test("should handle if session is validate and return true and set token in redux store", async () => {
  //     const mockData = {
  //       status: 200,
  //       data: {
  //         code: 1
  //       }
  //     };

  //     auth.create("fakeAccessToken");

  //     axiosInstance.get.mockResolvedValue(mockData);

  //     const store = configureStore({ reducer: { session: sessionReducer } });

  //     await store.dispatch(checkStatusSession());

  //     const state = store.getState();

  //     expect(axiosInstance.get).not.toHaveBeenCalled();
  //     expect(state.session.isAuth).toBeTruthy();
  //     expect(state.session.token).toBe("fakeAccessToken");
  //   });

  //   test("should handle if session is invalidate and return false", async () => {
  //     const mockData = {
  //       status: 200,
  //       data: {
  //         code: 1
  //       }
  //     };

  //     axiosInstance.get.mockResolvedValue(mockData);

  //     const store = configureStore({ reducer: { session: sessionReducer } });

  //     await store.dispatch(checkStatusSession());

  //     const state = store.getState();

  //     expect(axiosInstance.get).not.toHaveBeenCalled();
  //     expect(state.session.isAuth).toBeFalsy();
  //   });

  //   test("should handle if have token, send logout to server and return false", async () => {
  //     const clock = lolex.install();
  //     const creationTime = new Date("2023-01-01T12:00:00").getTime();
  //     const threeMonthsInMilliseconds = 90 * 24 * 60 * 60 * 1001; // 90 días x 24 horas x 60 minutos x 60 segundos x 1000 milisegundos
  //     const expirationTime = creationTime + threeMonthsInMilliseconds;

  //     clock.setSystemTime(creationTime);

  //     const token = "WQIH23984Y32";

  //     auth.create(token);

  //     clock.setSystemTime(expirationTime);
  //     const mockData = {
  //       status: 200,
  //       data: {
  //         code: 1
  //       }
  //     };

  //     axiosInstance.get.mockResolvedValue(mockData);

  //     const store = configureStore({ reducer: { session: sessionReducer } });

  //     await store.dispatch(checkStatusSession());

  //     const state = store.getState();

  //     expect(axiosInstance.get).toHaveBeenCalled();
  //     expect(axiosInstance.get).toHaveBeenCalledWith("/signout", {
  //       headers: { Authorization: "Token WQIH23984Y32" }
  //     });
  //     expect(state.session.isAuth).toBeFalsy();
  //     expect(secureLocalStorage.getItem("token")).toBeNull();
  //     expect(secureLocalStorage.getItem("expirationTime")).toBeNull();

  //     clock.uninstall();
  //   });

  //   test("should handle if have token, send logout server to return error and return true auth", async () => {
  //     const clock = lolex.install();
  //     const creationTime = new Date("2023-01-01T12:00:00").getTime();
  //     const threeMonthsInMilliseconds = 90 * 24 * 60 * 60 * 1001; // 90 días x 24 horas x 60 minutos x 60 segundos x 1000 milisegundos
  //     const expirationTime = creationTime + threeMonthsInMilliseconds;

  //     clock.setSystemTime(creationTime);

  //     const token = "WQIH23984Y32";

  //     auth.create(token);

  //     clock.setSystemTime(expirationTime);
  //     axiosInstance.get.mockRejectedValue(new Error("Network error"));

  //     const store = configureStore({ reducer: { session: sessionReducer } });

  //     await store.dispatch(checkStatusSession());

  //     const state = store.getState();

  //     expect(axiosInstance.get).toHaveBeenCalled();
  //     expect(axiosInstance.get).toHaveBeenCalledWith("/signout", {
  //       headers: { Authorization: "Token WQIH23984Y32" }
  //     });
  //     expect(state.session.isAuth).toBeTruthy;
  //     expect(secureLocalStorage.getItem("token")).toBe("WQIH23984Y32");
  //     expect(secureLocalStorage.getItem("expirationTime")).toBe(
  //       creationTime + 90 * 24 * 60 * 60 * 1000
  //     );
  //     clock.uninstall();
  //   });
  // });

  describe("loginWithAccessCode", () => {
    test("should it login with code and set session with code access with loginWithAccessCode.fullfilled", async () => {
      const mockData = {
        status: "success",
        data: { code: 1, access_token: "fakeAccessToken" }
      };

      axiosInstance.post.mockResolvedValue(mockData);

      const store = configureStore({ reducer: { session: sessionReducer } });

      const fakeUserData = {
        user: "fakeuser@example.com",
        password: "fakepassword"
      };

      await store.dispatch(login(fakeUserData));

      const mockDataWithCode = {
        status: 200,
        data: { code: 1, access_token: "fakeAccessTokenWithCode" }
      };

      const fakeAccessCode = {
        access_code: "TEST-4",
        company: 1
      };

      axiosInstance.post.mockResolvedValue(mockDataWithCode);

      await store.dispatch(loginWithAccessCode(fakeAccessCode));

      const state = store.getState();

      expect(secureLocalStorage.getItem("token")).toBe(
        "fakeAccessTokenWithCode"
      );
      expect(mySessionStorage.get("sessionWithCode", true));
      expect(state.session.sessionWithCode).toBeTruthy();
      expect(state.session.token).toBe("fakeAccessTokenWithCode");
      expect(state.session.textAccessCode).toBe("");
    });

    test("should it set error text access code loginWithAccessCode.reject", async () => {
      const mockData = {
        status: "success",
        data: { code: 1, access_token: "fakeAccessToken" }
      };

      axiosInstance.post.mockResolvedValue(mockData);

      const store = configureStore({ reducer: { session: sessionReducer } });

      const fakeUserData = {
        user: "fakeuser@example.com",
        password: "fakepassword"
      };

      await store.dispatch(login(fakeUserData));

      const fakeAccessCode = {
        access_code: "TEST-4",
        company: 1
      };

      axiosInstance.post.mockRejectedValue(new Error("Network error"));

      await store.dispatch(loginWithAccessCode(fakeAccessCode));

      const state = store.getState();

      expect(state.session.textAccessCode).toBe("Error");
    });
  });
});
