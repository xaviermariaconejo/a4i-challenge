import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { useChat } from "../../context/Chat/hook";
import { USER_MESSAGE } from "../../types/Message";

import { ChatPanel } from "./index";
import { renderWithProviders } from "../../tests/render";

/*
TODO:
Not the best approach.
Should avoid to mock Context.
Integrate MSW to help with correctly mocking BE
*/
vi.mock("../../context/Chat/hook");

describe("<ChatPanel />", () => {
  const sendMessageMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useChat as Mock).mockReturnValue({
      messages: [
        { id: 1, content: "Hola", type: "agentMessage" },
        { id: 2, content: "¿Qué tal?", type: USER_MESSAGE },
      ],
      sendMessage: sendMessageMock,
    });
  });

  it("muestra la lista de mensajes que viene del contexto", () => {
    renderWithProviders(<ChatPanel />);
    act(() => {
      vi.advanceTimersToNextTimer();
    });

    expect(screen.getByText("Hola")).toBeInTheDocument();
    expect(screen.getByText("¿Qué tal?")).toBeInTheDocument();

    const userMsg = screen.getByText("¿Qué tal?");
    expect(userMsg).toHaveClass("self-end");
  });

  it("al escribir y enviar el formulario llama a sendMessage y limpia el input", async () => {
    renderWithProviders(<ChatPanel />);
    act(() => {
      vi.advanceTimersToNextTimer();
    });
    vi.useRealTimers();

    const input = screen.getByPlaceholderText("Type a message...");
    const button = screen.getByRole("button", { name: /send/i });

    await userEvent.type(input, "¡Hola mundo!");
    expect(input).toHaveValue("¡Hola mundo!");

    await userEvent.click(button);

    expect(sendMessageMock).toHaveBeenCalledTimes(1);
    expect(sendMessageMock).toHaveBeenCalledWith("¡Hola mundo!");

    expect(input).toHaveValue("");
  });
});
