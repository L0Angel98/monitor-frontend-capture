const mySessionStorage = (() => {
  return {
    set: (key, value) => {
      sessionStorage.setItem(key, JSON.stringify(value));
    },
    get: key => {
      const data = sessionStorage.getItem(key);
      if (data === undefined || data === "undefined") return undefined;
      return JSON.parse(data);
    },
    remove: key => {
      sessionStorage.removeItem(key);
    }
  };
})();

export default mySessionStorage;
