import { API_URL } from "../../../config/constants";
import type { Message } from "../../../types/Message";

import { ENDPOINT } from "../constants";

export async function updateMessages(
  message: {
    content: string;
  },
  options: RequestInit = {}
): Promise<Message> {
  const res = await fetch(`${API_URL}${ENDPOINT}`, {
    method: "POST",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: JSON.stringify(message),
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  return res.json();
}
