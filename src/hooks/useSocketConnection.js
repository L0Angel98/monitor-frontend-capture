import { useEffect, useState } from "react";

import io from "socket.io-client";

const SOCKET_URL = process.env.SOCKET_HOST;
const MAX_CONNECTION_ATTEMPTS = 3;
const CONNECTION_RETRY_INTERVAL = 15000;

const useSocketConnection = room => {
  const [socket, setSocket] = useState(null);
  const [connectionAttempts, setConnectionAttempts] = useState(0);

  let timer = 0;

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      reconnection: false
    });

    newSocket.on("connect", () => {
      // console.log("Connected successfully!");
      if (room) {
        newSocket.emit("joinRoom", room); // Unirse a la sala si se proporciona un nombre de sala.
      }
      setConnectionAttempts(0); // Restablecer el contador de intentos cuando se conecta correctamente.
    });

    newSocket.on("connect_error", error => {
      console.error("Error de conexión:", error.message);
      if (connectionAttempts < MAX_CONNECTION_ATTEMPTS) {
        if (!timer) {
          timer = setTimeout(() => {
            setConnectionAttempts(prevAttempts => prevAttempts + 1);
          }, CONNECTION_RETRY_INTERVAL);
        }
      } else {
        console.error(
          "No se pudo conectar después de 3 intentos. Deteniendo la conexión."
        );
        newSocket.close(); // Cerrar el socket después de los intentos fallidos.
      }
    });

    setSocket(newSocket);

    return () => {
      clearTimeout(timer);
      if (socket) {
        socket.close(); // Cerrar el socket al desmontar el componente.
      }
    };
  }, [connectionAttempts, room]);

  return socket;
};

export default useSocketConnection;
