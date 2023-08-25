import React from "react";
import { render, screen } from "@testing-library/react";
import ActivedParts from "../../../../../../pages/WorkstationsList/Status/WorkstationCard/ActivedParts/ActivedParts";

describe("ActivedParts", () => {
  const mockParts = [
    { type: "main", name: "Part A", code: "PA-001" },
    { type: "associated", name: "Part B", code: "PA-002" }
  ];

  const mockManufacturingOrders = [
    { type: "main", code: "MO-001" },
    { type: "associated", code: "MO-002" }
  ];

  test("renders 'No hay parte seleccionada' when no part is provided", () => {
    render(<ActivedParts />);
    expect(screen.getByText("No hay parte seleccionada")).toBeInTheDocument();
  });

  test("renders selected part and manufacturing order for main type", () => {
    render(
      <ActivedParts
        type="main"
        parts={mockParts}
        manufacturingOrders={mockManufacturingOrders}
      />
    );

    expect(screen.getByText("MO-001")).toBeInTheDocument();
    expect(screen.getByText("Part A - PA-001")).toBeInTheDocument();
    expect(screen.queryByText("MO-002")).not.toBeInTheDocument();
    expect(screen.queryByText("Part B - PA-002")).not.toBeInTheDocument();
  });

  test("renders selected part and manufacturing order for associated type", () => {
    render(
      <ActivedParts
        type="associated"
        parts={mockParts}
        manufacturingOrders={mockManufacturingOrders}
      />
    );

    expect(screen.getByText("MO-002")).toBeInTheDocument();
    expect(screen.getByText("Part B - PA-002")).toBeInTheDocument();
    expect(screen.queryByText("MO-001")).not.toBeInTheDocument();
    expect(screen.queryByText("Part A - PA-001")).not.toBeInTheDocument();
  });
});
