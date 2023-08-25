import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import TabSelector from "../../../../components/TabsMenu/TabSelector/TabSelector";
import TabsMenuContext from "../../../../components/TabsMenu/TabsMenuContext";

describe("TabSelector", () => {
  const mockTabs = [
    { title: "Tab 1", keyTab: "tab1" },
    { title: "Tab 2", keyTab: "tab2" }
    // Agrega más elementos si es necesario para tus pruebas
  ];

  const mockTabsMenuContext = {
    allTabs: mockTabs,
    tabSelected: "tab1"
  };

  test("renders the correct tabs", () => {
    render(
      <TabsMenuContext.Provider value={mockTabsMenuContext}>
        <Router>
          <TabSelector />
        </Router>
      </TabsMenuContext.Provider>
    );

    // Verifica que todos los títulos de las pestañas se rendericen correctamente
    mockTabs.forEach(tab => {
      const tabElement = screen.getByText(tab.title);
      expect(tabElement).toBeInTheDocument();
    });
  });

  test("calls onChange when a tab is clicked", () => {
    // Crea una función mock para onChange
    const mockOnChange = jest.fn();

    render(
      <TabsMenuContext.Provider value={mockTabsMenuContext}>
        <Router>
          <TabSelector onChange={mockOnChange} />
        </Router>
      </TabsMenuContext.Provider>
    );

    // Simula hacer clic en la segunda pestaña
    const secondTab = screen.getByText("Tab 2");
    fireEvent.click(secondTab);

    // Verifica que la función onChange haya sido llamada con el id correcto de la pestaña
    expect(mockOnChange).toHaveBeenCalledWith("tab2");
  });

  test("adds the 'tabSelected' class to the selected tab", () => {
    render(
      <TabsMenuContext.Provider value={mockTabsMenuContext}>
        <Router>
          <TabSelector />
        </Router>
      </TabsMenuContext.Provider>
    );

    // Verifica que la clase 'tabSelected' se agregue a la pestaña seleccionada
    const selectedTab = screen.getByText("Tab 1");
    expect(selectedTab).toHaveClass("tabSelected");
  });
});
