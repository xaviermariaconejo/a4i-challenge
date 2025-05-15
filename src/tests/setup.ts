import "@testing-library/jest-dom";
import { EventEmitter } from "events";
import { afterEach, beforeEach, vi } from "vitest";

// Global Mock socket.io-client
vi.mock("socket.io-client", () => {
  return {
    io: (_url: string, _opts: any) => {
      const socket = new EventEmitter() as any;
      socket.connected = true;
      socket.on = socket.addListener;
      socket.off = socket.removeListener;
      socket.disconnect = () => {
        socket.connected = false;
      };
      setTimeout(() => socket.emit("connect"), 0);
      return socket;
    },
  };
});

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});
