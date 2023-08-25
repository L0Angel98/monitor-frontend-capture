import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Item from "../../../../../components/SelectList/List/Item/Item";

describe("Item", () => {
  it("should handle click and change state correctly", () => {
    const label = "Item Label";
    const value = 1;
    const onChangeMock = jest.fn();
    const itemSelected = 1;

    const { getByText } = render(
      <Item
        label={label}
        value={value}
        onChange={onChangeMock}
        itemSelected={itemSelected}
      />
    );

    const button = getByText(label);

    fireEvent.click(button);

    expect(onChangeMock).toHaveBeenCalledWith(value);
  });

  it("should add class to item selected", () => {
    const label = "Item Label";
    const value = 1;
    const onChangeMock = jest.fn();
    const itemSelected = 1;

    const { getByText } = render(
      <Item
        label={label}
        value={value}
        onChange={onChangeMock}
        itemSelected={itemSelected}
      />
    );

    const button = getByText(label);

    expect(button).toHaveClass("itemSelected");
  });

  // Puedes agregar más pruebas aquí para otros escenarios
});
