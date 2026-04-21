const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("ai-village-brain-token");
  const headers = options.body instanceof FormData ? {} : { "Content-Type": "application/json" };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    method: options.method || "GET",
    headers: {
      ...headers,
      ...(options.headers || {})
    },
    body:
      options.body instanceof FormData
        ? options.body
        : options.body
          ? JSON.stringify(options.body)
          : undefined
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || "Something went wrong");
  }

  return payload;
}

export const api = {
  get: (path) => request(path),
  post: (path, body, custom = {}) => request(path, { method: "POST", body, ...custom }),
  put: (path, body) => request(path, { method: "PUT", body })
};
