import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SelectList from "../../../components/SelectList/SelectList";

describe("SelectList", () => {
  const mockItems = [
    { value: 1, label: "Item 1" },
    { value: 2, label: "Item 2" },
    { value: 3, label: "Another Item" }
  ];

  it("should filter items when using the Searcher", () => {
    const onChangeMock = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <SelectList items={mockItems} onChange={onChangeMock} />
    );

    const input = getByPlaceholderText("Buscar");
    fireEvent.change(input, { target: { value: "Another" } });

    const filteredItem = getByText("Another Item");
    expect(filteredItem).toBeInTheDocument();
  });

  it("should call onChange function when selecting an item", () => {
    const onChangeMock = jest.fn();

    const { getByText } = render(
      <SelectList items={mockItems} onChange={onChangeMock} />
    );

    const itemToSelect = getByText("Item 2");
    fireEvent.click(itemToSelect);

    expect(onChangeMock).toHaveBeenCalledWith({
      value: 2,
      name: undefined
    });
  });
});
