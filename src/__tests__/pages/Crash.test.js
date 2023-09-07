import React from "react";
import { render } from "@testing-library/react";
import Crash from "../../pages/Crash/Crash";

describe("Crash Page", () => {
  test("Page text should load", () => {
    const { getByText } = render(<Crash />);

    const h1Element = getByText("Try again.");
    const pElement = getByText("Sorry, something went wrong!");
    expect(h1Element).toBeInTheDocument();
    expect(pElement).toBeInTheDocument();
  });
});