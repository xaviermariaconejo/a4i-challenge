import { API_KEY, API_URL } from "../../../config/constants";
import type { Message } from "../../../types/Message";

const URL = "messages";

export async function getMessages(): Promise<Message[]> {
  const res = await fetch(`${API_URL}/${URL}`, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY || "",
    },
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  return res.json();
}
