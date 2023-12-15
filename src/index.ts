import { WebSocket, WebSocketServer } from "ws";
import http from "http";
import { uuid } from "uuidv4";
import mongoose from "mongoose";
import dotenv from "dotenv";

// schemas
import { dataUserSchema } from "./userData/userData.schemas";
import { dataLocationUserSchema } from "./geolocation/geolocation.schemas";
import {
  getGeolocationUsers,
  setGeolocationUser,
} from "./geolocation/geolocation";
import { SendDataType } from "./index.types";

dotenv.config();
const db = `mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.xva1z4o.mongodb.net/motosect?retryWrites=true&w=majority`;

mongoose
  .connect(db)
  .then(() => {
    console.log("Connect to db");
  })
  .catch((error: Error) => {
    console.log(error);
  });

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

  clients[userId] = connection;
  console.log(`${userId} connected.`);

  const intervalId = setInterval(() => {
    const currentTime = new Date().toLocaleTimeString();
    const geolocationUsers = getGeolocationUsers();
    const isGeolocationUsers = Object.keys(geolocationUsers).length;
    const data: SendDataType = {
      currentTime,
      connection: true,
      userIdDB,
      geolocationUsers: isGeolocationUsers ? geolocationUsers : null,
    };

    connection.send(JSON.stringify(data));
  }, 2000);

  connection.on("message", (message) => {
    try {
      const parsedMessage = JSON.parse(message as unknown as string);

      // info user
      const userInfo = dataUserSchema.safeParse(parsedMessage);
      if (userInfo.success) userIdDB = userInfo.data.userData.id;

      // geolocation user
      const geolocationUser = dataLocationUserSchema.safeParse(parsedMessage);
      if (geolocationUser.success) setGeolocationUser(geolocationUser.data);
    } catch (error) {
      console.error("Помилка при розборі отриманого повідомлення:", error);
    }
  });

  connection.on("close", () => {
    console.log("Клієнт відключився");
    clearInterval(intervalId);
  });
});
