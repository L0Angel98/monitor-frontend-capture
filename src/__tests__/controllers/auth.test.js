import auth from "../../controllers/auth.controllers";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import lolex from "lolex";
import axiosInstance from "../../../axiosConfig";
import mySessionStorage from "../../controllers/sessionStorage.controllers";

describe("Authorized controller", () => {
  let originalPathname;
  let originalSearch;
  jest.mock("../../../axiosConfig.js");
  axiosInstance.get = jest.fn();

  jest.mock("axios");
  axios.get = jest.fn();

  beforeEach(() => {
    originalPathname = window.location.pathname;
    originalSearch = window.location.search;
    secureLocalStorage.clear();
    axios.get.mockClear();

    axiosInstance.get.mockClear();
  });

  afterEach(() => {
    window.location.pathname = originalPathname;
    window.location.search = originalSearch;
  });

  describe("create function", () => {
    test("should it saved token", () => {
      const token = "WQIH23984Y32";

      auth.create(token);

      expect(secureLocalStorage.getItem("token")).toBeTruthy();
      expect(secureLocalStorage.getItem("token")).toBe(token);
    });

    test("should it saved expirationTime and date after three months", () => {
      const clock = lolex.install();
      const creationTime = new Date("2023-01-01T12:00:00").getTime();
      const threeMonthsInMilliseconds = 90 * 24 * 60 * 60 * 1000; // 90 días x 24 horas x 60 minutos x 60 segundos x 1000 milisegundos
      const expirationTime = creationTime + threeMonthsInMilliseconds;

      clock.setSystemTime(creationTime);

      const token = "WQIH23984Y32";

      auth.create(token);

      expect(secureLocalStorage.getItem("expirationTime")).toBeTruthy();
      expect(secureLocalStorage.getItem("expirationTime")).toBe(expirationTime);
      clock.uninstall();
    });
  });

  describe("logout function", () => {
    test("should it send signout to micro", async () => {
      secureLocalStorage.setItem("token", "123456GH");

      const mockData = {
        status: "success",
        data: {
          code: 1
        }
      };

      axiosInstance.get.mockResolvedValue(mockData);

      await auth.logout();

      expect(axiosInstance.get).toHaveBeenCalledTimes(1);
      expect(axiosInstance.get).toHaveBeenCalledWith("/signout", {
        headers: { Authorization: "Token 123456GH" }
      });
    });

    test("should it clear variable in local storage", async () => {
      secureLocalStorage.setItem("token", "123456GH");
      secureLocalStorage.setItem("item", { element: "value" });

      const mockData = {
        status: "success",
        data: {
          code: 1
        }
      };
      axiosInstance.get.mockResolvedValue(mockData);

      await auth.logout();

      expect(axiosInstance.get).toHaveBeenCalledTimes(1);
      expect(axiosInstance.get).toHaveBeenCalledWith("/signout", {
        headers: { Authorization: "Token 123456GH" }
      });
      expect(secureLocalStorage.getItem("token")).toBeNull();
      expect(secureLocalStorage.getItem("item")).toBeNull();
    });

    test("should it clear sessionWithCode if has session with code in session storage and return false", async () => {
      secureLocalStorage.setItem("token", "123456GH");
      secureLocalStorage.setItem("item", { element: "value" });
      mySessionStorage.set("sessionWithCode", true);

      const mockData = {
        status: "success",
        data: {
          code: 1
        }
      };
      axiosInstance.get.mockResolvedValue(mockData);

      const status = await auth.logout();

      expect(axiosInstance.get).toHaveBeenCalledTimes(0);
      expect(secureLocalStorage.getItem("token")).toBe("123456GH");
      expect(secureLocalStorage.getItem("item")).toEqual({ element: "value" });
      expect(mySessionStorage.get("sessionWithCode")).toBeNull();
      expect(status).toBeFalsy();
    });
  });

  describe("checkTokenSavedAndValidated", () => {
    test("should it return false and clear secureLocalStorage if now time >= expiration time", async () => {
      const clock = lolex.install();
      const creationTimeToSaved = new Date("2023-01-01T12:00:00").getTime();
      const threeMonthsInMilliseconds = 90 * 24 * 60 * 60 * 1001; // 90 días x 24 horas x 60 minutos x 60 segundos x 1000 milisegundos
      const expirationTime = creationTimeToSaved + threeMonthsInMilliseconds;

      clock.setSystemTime(creationTimeToSaved);

      const token = "WQIH23984Y32";

      auth.create(token);

      const mockData = {
        status: "success",
        data: {
          code: 1
        }
      };

      axiosInstance.get.mockResolvedValue(mockData);

      clock.setSystemTime(expirationTime);

      const isAuth = await auth.checkTokenSavedAndValidated();

      expect(isAuth).toBeFalsy();
      expect(secureLocalStorage.getItem("token")).toBeNull();

      clock.uninstall();
    });

    test("should it return true if now time < expiration time", async () => {
      const clock = lolex.install();

      const creationTimeToSaved = new Date("2023-01-01T12:00:00").getTime();

      clock.setSystemTime(creationTimeToSaved);

      const token = "WQIH23984Y32";

      auth.create(token);

      const isAuth = await auth.checkTokenSavedAndValidated();

      expect(isAuth).toBeTruthy();

      clock.uninstall();
    });
  });
});
