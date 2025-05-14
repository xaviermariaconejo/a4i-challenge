/*
The approach is to not handle the disconnection of the
socket, since the App does not make sense to be build
or rendered without a socket connection
*/

import { io } from "socket.io-client";
import { API_KEY } from "../config/constants";
import { SOCKET_URL } from "./constants";

export const socket = io("/", {
  path: SOCKET_URL,
  transports: ["websocket"],
  extraHeaders: { "x-api-key": API_KEY || "" },
});
