import mySessionStorage from "../../controllers/sessionStorage.controllers";

describe("mySessionStorage", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test("save number sessionStorage", () => {
    mySessionStorage.set("value", 5);
    expect(mySessionStorage.get("value")).toBe(5);
  });

  test("save object", () => {
    const user = {
      id: 1,
      name: "Pedro"
    };
    mySessionStorage.set("user", user);

    const userSaved = mySessionStorage.get("user");
    expect(userSaved).toEqual(user);
    expect(userSaved.name).toEqual("Pedro");
    expect(userSaved.id).toEqual(1);
  });

  test("clear values", () => {
    mySessionStorage.set("value", 1);
    expect(mySessionStorage.get("value")).toEqual(1);
    mySessionStorage.remove("value");
    expect(mySessionStorage.get("value")).toBeNull();
  });

  test("clear objets", () => {
    const user = {
      id: 1,
      name: "Pedro"
    };
    mySessionStorage.set("user", user);

    let userSaved = mySessionStorage.get("user");

    expect(userSaved).toEqual(user);
    expect(userSaved.name).toEqual("Pedro");
    expect(userSaved.id).toEqual(1);

    mySessionStorage.remove("user");

    userSaved = mySessionStorage.get("user");
    expect(userSaved).toBeNull();
  });

  test("saved value undefined", () => {
    const value = undefined;

    mySessionStorage.set("value", value);

    let valueSaved = mySessionStorage.get("value");

    expect(valueSaved).toBeUndefined();
  });
});
