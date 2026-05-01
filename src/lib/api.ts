const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export type ApiError = {
  message: string;
};

type RequestOptions = {
  method?: "GET" | "POST";
  body?: unknown;
  token?: string;
};

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error((data as ApiError).message || "Request failed.");
  }

  return data as T;
}

export { API_BASE_URL };
