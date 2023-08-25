const getParamsToURL = key => {
  const search = window.location.search;
  const params = new URLSearchParams(search);

  if (key) {
    const value = params.get(key);

    if (value) {
      return value;
    }
  }

  return null;
};

export default getParamsToURL;
