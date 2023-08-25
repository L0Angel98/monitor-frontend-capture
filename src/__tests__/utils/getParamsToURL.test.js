import getParamsToURL from "../../utils/getParamsToURL";

describe("getParamsByQuery", () => {
  let originalPathname;
  let originalSearch;

  beforeEach(() => {
    originalPathname = window.location.pathname;
    originalSearch = window.location.search;
  });

  afterEach(() => {
    window.location.pathname = originalPathname;
    window.location.search = originalSearch;
  });

  test("should get param value to url", () => {
    let paramsQuery = new URLSearchParams();
    paramsQuery.append("value", "123HGTL");
    const paramsString = paramsQuery.toString();

    const pathname = "/login";
    const search = "?" + paramsString;

    Object.defineProperty(window, "location", {
      value: {
        ...window.location,
        pathname,
        search
      }
    });

    const value = getParamsToURL("value");

    expect(value).toEqual("123HGTL");
  });

  test("should return null if not found param", () => {
    let paramsQuery = new URLSearchParams();
    paramsQuery.append("value2", "123HGTL");
    const paramsString = paramsQuery.toString();

    const pathname = "/login";
    const search = "?" + paramsString;

    Object.defineProperty(window, "location", {
      value: {
        ...window.location,
        pathname,
        search
      }
    });

    const value = getParamsToURL("value");

    expect(value).toBeNull();
  });

  test("should return null if not have value param", () => {
    let paramsQuery = new URLSearchParams();
    paramsQuery.append("value2", "");
    const paramsString = paramsQuery.toString();

    const pathname = "/login";
    const search = "?" + paramsString;

    Object.defineProperty(window, "location", {
      value: {
        ...window.location,
        pathname,
        search
      }
    });

    const value = getParamsToURL("value");

    expect(value).toBeNull();
  });
});
