import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import WorkstationCard from "../../../../../pages/WorkstationsList/Status/WorkstationCard/WorkstationCard";

describe("WorkstationCard", () => {
  const mockWorkstation = {
    status: "available",
    id: 1,
    name: "Workstation 1",
    alias: "WS-001",
    user: { name: "Roberto Velázquez Rodríguez" },
    activated_parts: [
      { type: "main", name: "Part A", code: "PA-001" },
      { type: "associated", name: "Part B", code: "PA-002" }
    ],
    actived_manufacturing_orders: [
      { type: "main", code: "MO-001" },
      { type: "associated", code: "MO-002" }
    ]
  };

  const mockOnChange = jest.fn();

  test("renders workstation card with correct content", () => {
    render(
      <Router>
        <WorkstationCard {...mockWorkstation} onChange={mockOnChange} />
      </Router>
    );

    // Check if workstation name and alias are displayed
    expect(screen.getByText("WS-001")).toBeInTheDocument();

    // Check if PartSwitch component is rendered correctly with 2 parts
    expect(screen.getByTestId("part-switch")).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(1);

    // Check if ActivedParts component is rendered with the correct parts and manufacturing orders
    expect(screen.getByText("Part A - PA-001")).toBeInTheDocument();
    expect(screen.getByText("MO-001")).toBeInTheDocument();

    // Check if status is displayed as "Disponible"
    const statusElement = screen.getByTestId("workstation-status");
    expect(statusElement.getAttribute("status")).toBe(mockWorkstation.status);
  });

  test("renders workstation with one icon part card and status", () => {
    const mockWorkstationOnePart = {
      status: "unavailable",
      id: 1,
      name: "Workstation 1",
      alias: "WS-001",
      user: { name: "Roberto Velázquez Rodríguez" },
      activated_parts: [{ type: "main", name: "Part A", code: "PA-001" }],
      actived_manufacturing_orders: [{ type: "main", code: "MO-001" }]
    };
    render(
      <Router>
        <WorkstationCard {...mockWorkstationOnePart} onChange={mockOnChange} />
      </Router>
    );

    expect(screen.getAllByRole("img")).toHaveLength(1);

    const statusElement = screen.getByTestId("workstation-status");
    expect(statusElement.getAttribute("status")).toBe(
      mockWorkstationOnePart.status
    );
  });

  test("calls onChange function when clicked on available workstation", () => {
    render(
      <Router>
        <WorkstationCard {...mockWorkstation} onChange={mockOnChange} />
      </Router>
    );

    // Click on the workstation card
    fireEvent.click(screen.getByText("WS-001"));

    // Check if the onChange function is called with the correct workstation data
    expect(mockOnChange).toHaveBeenCalledWith({
      id: mockWorkstation.id,
      name: mockWorkstation.name,
      alias: mockWorkstation.alias
    });
  });

  test("displays user's short name when workstation status is 'unavailable'", () => {
    const mockWorkstationUnavailable = {
      ...mockWorkstation,
      status: "unavailable"
    };
    render(
      <Router>
        <WorkstationCard
          {...mockWorkstationUnavailable}
          onChange={mockOnChange}
        />
      </Router>
    );

    // Check if user's short name is displayed
    expect(screen.getByText("Roberto Velázquez")).toBeInTheDocument();
  });

  // You can add more test cases for other props and interactions if needed
});
