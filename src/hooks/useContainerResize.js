import { useState, useEffect } from "react";

export default function useContainerResize(containerId) {
  const [containerWidth, setContainerWidth] = useState(0);

  function handleContainerResize() {
    const container = document.getElementById(containerId);
    if (container) {
      setContainerWidth(container.clientWidth);
    }
  }

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) {
      return;
    }

    handleContainerResize(); // Obtiene el ancho inicial del contenedor

    // Agrega el evento 'resize' al contenedor para actualizar el ancho en tiempo real
    window.addEventListener("resize", handleContainerResize);

    // Limpia el evento 'resize' cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", handleContainerResize);
    };
  }, [containerId]);

  return containerWidth;
}
