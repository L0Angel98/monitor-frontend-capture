const myLocalStorage = (function () {
  return {
    set: (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    get: key => {
      let data = localStorage[key];
      if (data === undefined || data === "undefined") return undefined;
      return JSON.parse(data);
    },
    remove: key => {
      localStorage.removeItem(key);
    }
  };
})();

export default myLocalStorage;
