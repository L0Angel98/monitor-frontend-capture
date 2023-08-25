import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Importa esta línea para tener acceso a las funciones de jest-dom
import TabsMenuContext from "../../../../components/TabsMenu/TabsMenuContext";
import Tab from "../../../../components/TabsMenu/Tab/Tab";

// Mock del contexto TabsMenuContext para las pruebas
const mockTabsMenuContext = {
  addTab: jest.fn(),
  tabSelected: "tab1",
  allTabs: [
    { title: "Tab 1", keyTab: "tab1" },
    { title: "Tab 2", keyTab: "tab2" }
    // Agrega más elementos si es necesario para tus pruebas
  ]
};

describe("Tab", () => {
  test("renders children when keyTab matches tabSelected", () => {
    render(
      <TabsMenuContext.Provider value={mockTabsMenuContext}>
        <Tab title="Tab 1" keyTab="tab1">
          <p>Content of Tab 1</p>
        </Tab>
      </TabsMenuContext.Provider>
    );

    // Verifica que los children se rendericen correctamente cuando keyTab coincide con tabSelected
    expect(screen.getByText("Content of Tab 1")).toBeInTheDocument();
  });

  test("calls handleAddTab when mounted", () => {
    // Utiliza un mock de la función handleAddTab para ver si se llama al montar el componente

    render(
      <TabsMenuContext.Provider value={mockTabsMenuContext}>
        <Tab title="Tab 3" keyTab="tab3">
          <p>Content of Tab 3</p>
        </Tab>
      </TabsMenuContext.Provider>
    );

    // Verifica que handleAddTab se haya llamado al montar el componente
    expect(mockTabsMenuContext.addTab).toHaveBeenCalled();
  });
});
