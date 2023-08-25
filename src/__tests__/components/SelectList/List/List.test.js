import React from "react";
import { render, fireEvent } from "@testing-library/react";
import List from "../../../../components/SelectList/List/List";

describe("List", () => {
  const items = [
    { value: 1, label: "Item 1" },
    { value: 2, label: "Item 2" },
    { value: 3, label: "Item 3" }
  ];

  const onChangeMock = jest.fn();

  beforeEach(() => {
    onChangeMock.mockClear();
  });

  it("should callback onChange if select item", () => {
    const { getByText } = render(
      <List items={items} onChange={onChangeMock} value={2} name="test" />
    );

    const itemToSelect = getByText("Item 3");
    fireEvent.click(itemToSelect);

    expect(onChangeMock).toHaveBeenCalledWith({ value: 3, name: "test" });
  });

  it("should have a element selected", () => {
    const { getByText, container } = render(
      <List items={items} onChange={onChangeMock} value={2} name="test" />
    );

    const itemToSelect = getByText("Item 3");
    fireEvent.click(itemToSelect);

    const itemsSelecteds = container.getElementsByClassName("itemSelected");

    expect(itemsSelecteds.length).toBe(1);
  });

  // Puedes agregar más pruebas aquí para otros escenarios
});
