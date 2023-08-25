import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import Status from "../../../../pages/WorkstationsList/Status/Status";
import { renderWithProviders } from "../../../../utils/testUtils";
import { BrowserRouter } from "react-router-dom";
import axiosInstance from "../../../../../axiosConfig";

describe("Status", () => {
  const mockWorkstations = [
    {
      id: 1,
      status: "available",
      name: "Workstation 1",
      alias: "WS-001",
      user: { id: 1, name: "User Testing" }
    },
    {
      id: 2,
      status: "unavailable",
      name: "Workstation 2",
      alias: "WS-002",
      user: { id: 1, name: "User Testing" }
    },
    {
      id: 3,
      status: "available",
      name: "Workstation 3",
      alias: "WS-003",
      user: { id: 1, name: "User Testing" }
    }
    // Add more mockWorkstations as needed for testing different scenarios
  ];

  jest.mock("../../../../../axiosConfig");
  axiosInstance.post = jest.fn();

  beforeEach(() => {
    axiosInstance.post.mockClear();
  });

  test("renders only workstations with the given status", () => {
    renderWithProviders(
      <BrowserRouter>
        <Status type="available" workstations={mockWorkstations} />
      </BrowserRouter>
    );

    // Get all WorkstationCard elements
    const workstationCards = screen.getAllByTestId("workstation-card");

    // Verify that only workstations with status "available" are rendered
    expect(workstationCards).toHaveLength(2);
  });

  test("save workstation when a WorkstationCard is selected", async () => {
    const mockData = {
      status: "success",
      data: {
        code: 1
      }
    };

    axiosInstance.post.mockResolvedValue(mockData);

    // Create a mock function for handleSelectWorkstation

    const { store } = renderWithProviders(
      <BrowserRouter>
        <Status type="available" workstations={mockWorkstations} />
      </BrowserRouter>
    );

    // Get all WorkstationCard elements
    const workstationCards = screen.getAllByTestId("workstation-card");

    // Click on the first WorkstationCard
    const firstWorkstationCard = workstationCards[0];
    fireEvent.click(firstWorkstationCard);

    await waitFor(() => {
      const states = store.getState();
      expect(states.dashboard.workstationSelected).toEqual({
        id: mockWorkstations[0].id,
        name: mockWorkstations[0].name,
        alias: mockWorkstations[0].alias
      });
    });
  });

  test("shouldn't save the station if it's not available and render user name", () => {
    // Create a mock function for handleSelectWorkstation

    const { store } = renderWithProviders(
      <BrowserRouter>
        <Status type="unavailable" workstations={mockWorkstations} />
      </BrowserRouter>
    );

    // Get all WorkstationCard elements
    const workstationCards = screen.getAllByTestId("workstation-card");

    // Click on the first WorkstationCard
    const firstWorkstationCard = workstationCards[0];

    fireEvent.click(firstWorkstationCard);

    const states = store.getState();

    expect(screen.getByText("User Testing")).toBeInTheDocument();
    expect(states.dashboard.workstationSelected).toBeNull();
  });
});
