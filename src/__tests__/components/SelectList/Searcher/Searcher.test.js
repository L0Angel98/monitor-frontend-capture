import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Searcher from "../../../../components/SelectList/Searcher/Searcher";

describe("Searcher", () => {
  it("should call onChangeText function when changing the text", () => {
    const onChangeTextMock = jest.fn();
    const placeholder = "Search";
    const valueText = "Sample text";

    const { getByPlaceholderText } = render(
      <Searcher
        placeholder={placeholder}
        valueText={valueText}
        onChangeText={onChangeTextMock}
      />
    );

    const input = getByPlaceholderText(placeholder);
    fireEvent.change(input, { target: { value: "New text" } });

    expect(onChangeTextMock).toHaveBeenCalledWith("New text");
  });

  it("should display the default input value", () => {
    const placeholder = "Search";
    const defaultValue = "Default value";

    const { getByDisplayValue } = render(
      <Searcher placeholder={placeholder} valueText={defaultValue} />
    );

    const input = getByDisplayValue(defaultValue);
    expect(input).toBeInTheDocument();
  });

  it("should display button text and icon", () => {
    const placeholder = "Search";
    const btnTitle = "My Button";
    const { getByText } = render(
      <Searcher placeholder={placeholder} btnTitle={btnTitle} />
    );

    const buttonText = getByText(btnTitle);
    expect(buttonText).toBeInTheDocument();
  });
});
