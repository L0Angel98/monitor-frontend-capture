import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import TabsMenu from "../../../components/TabsMenu/TabsMenu";
import Tab from "../../../components/TabsMenu/Tab/Tab";

describe("TabsMenu", () => {
  const MockChild = () => <div>Mock Child</div>;

  const defaultTab = "tab1";

  test("renders the TabSelector and children", () => {
    render(
      <MemoryRouter initialEntries={[`/path/${defaultTab}`]}>
        <TabsMenu defaultTab={defaultTab} path="/path">
          <Tab title="Tab 1" keyTab="tab1">
            <MockChild />
          </Tab>
        </TabsMenu>
      </MemoryRouter>
    );

    // Verifica que TabSelector se renderice
    expect(screen.getByTestId("tab-selector")).toBeInTheDocument();

    // Verifica que los children se rendericen
    expect(screen.getByText("Mock Child")).toBeInTheDocument();
  });

  test("sets the tabSelected state correctly based on the URL param", () => {
    render(
      <MemoryRouter initialEntries={[`/path/${defaultTab}`]}>
        <TabsMenu defaultTab={defaultTab} path="/path">
          <Tab title="Tab 1" keyTab="tab1">
            <MockChild />
          </Tab>
        </TabsMenu>
      </MemoryRouter>
    );

    // Verifica que la pestaña seleccionada sea la correcta según el parámetro de la URL
    expect(screen.getByText("Tab 1")).toHaveClass("tabSelected");
  });

  test("sets the tabSelected state to defaultTab if URL param is invalid", () => {
    // Simula una URL con un parámetro de pestaña no válido
    render(
      <MemoryRouter initialEntries={[`/path/invalidTab`]}>
        <TabsMenu defaultTab={defaultTab} path="/path">
          <Tab title="Tab 1" keyTab="tab1">
            <MockChild />
          </Tab>
        </TabsMenu>
      </MemoryRouter>
    );

    // Verifica que la pestaña seleccionada sea la pestaña predeterminada (defaultTab)
    expect(screen.getByText("Tab 1")).toHaveClass("tabSelected");
  });
});
