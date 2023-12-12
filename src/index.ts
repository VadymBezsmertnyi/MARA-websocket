import { WebSocket, WebSocketServer } from "ws";
import http from "http";
import { uuid } from "uuidv4";

const server = http.createServer();
const wsServer = new WebSocketServer({ server });

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});

const clients: Record<string, WebSocket> = {};

wsServer.on("connection", function (connection) {
  const userId = uuid();
  let userIdDB: number | null = null;
  console.log(`Recieved a new connection.`);

  clients[userId] = connection;
  console.log(`${userId} connected.`);

  const intervalId = setInterval(() => {
    const currentTime = new Date().toLocaleTimeString();

    connection.send(
      JSON.stringify({ currentTime, connection: true, userIdDB })
    );
  }, 2000);

  connection.on("message", (message) => {
    // Обробка отриманих даних з фронта
    console.log(`Received message from ${userId}: ${message}`);

    try {
      const parsedMessage = JSON.parse(message as unknown as string);
      userIdDB = parsedMessage.id;
    } catch (error) {
      console.error("Помилка при розборі отриманого повідомлення:", error);
    }
  });

  connection.on("close", () => {
    console.log("Клієнт відключився");
    clearInterval(intervalId);
  });
});
