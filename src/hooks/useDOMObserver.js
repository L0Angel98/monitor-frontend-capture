import { useEffect, useState, useRef } from "react";

function useDOMObserver(targetNodeId, options) {
  const [mutations, setMutations] = useState([]);
  const targetNodeRef = useRef(null);

  useEffect(() => {
    const targetNode = document.getElementById(targetNodeId);
    targetNodeRef.current = targetNode;

    if (!targetNode) return;

    // Crear una nueva instancia de MutationObserver con una función de callback
    const observer = new MutationObserver((mutationsList, observer) => {
      // Actualizar el estado con los cambios detectados
      setMutations(mutationsList);
    });

    // Iniciar la observación del targetNode con las opciones configuradas
    observer.observe(targetNode, options);

    // Detener la observación cuando el componente se desmonte
    return () => {
      observer.disconnect();
    };
  }, [targetNodeId, options]);

  return mutations;
}

export default useDOMObserver;
