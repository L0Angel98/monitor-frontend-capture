import { useEffect } from "react";

const handleUpdateSessionAllWindows = () => {
  const handleUpdateSession = event => {
    if (
      (event.key === "session" && !!!event.oldValue && !!event.newValue) ||
      [event.key, event.oldValue, event.newValue].every(value => value === null)
    ) {
      history.pushState(null, "", "/");
      location.reload();
    }
  };

  useEffect(() => {
    window.addEventListener("storage", handleUpdateSession, false);

    return () => {
      window.removeEventListener("storage", handleUpdateSession, false);
    };
  }, []);
};

export default handleUpdateSessionAllWindows;
