import secureLocalStorage from "react-secure-storage";
import { SESSION } from "../routes/index";
import axiosInstance from "../../axiosConfig";
import mySessionStorage from "./sessionStorage.controllers";

const auth = (() => ({
  create: token => {
    const creationTime = new Date().getTime();
    const threeMonthsInMilliseconds = 90 * 24 * 60 * 60 * 1000; // 90 días x 24 horas x 60 minutos x 60 segundos x 1000 milisegundos

    const expirationTime = creationTime + threeMonthsInMilliseconds;
    secureLocalStorage.setItem("expirationTime", expirationTime);
    secureLocalStorage.setItem("token", token);
  },

  logout: async () => {
    if (mySessionStorage.get("sessionWithCode")) {
      mySessionStorage.remove("sessionWithCode");
      return false;
    }

    try {
      await axiosInstance.get(SESSION.SIGNOUT, {
        headers: {
          Authorization: `Token ${secureLocalStorage.getItem("token")}`
        }
      });

      secureLocalStorage.clear();
      sessionStorage.clear();
      history.pushState(null, "", "/");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  checkTokenSavedAndValidated: async () => {
    const token = secureLocalStorage.getItem("token");
    const storedExpirationTime = secureLocalStorage.getItem("expirationTime");
    const currentTime = new Date().getTime();

    if (token) {
      if (currentTime <= storedExpirationTime) {
        return true;
      }

      const statusLogout = await auth.logout();

      if (!statusLogout) {
        return true;
      }
    }

    return false;
  }
}))();

export default auth;
