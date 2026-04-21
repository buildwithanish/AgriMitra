import { getApiBaseCandidates, getConnectionHelpMessage } from "../config/runtime";

function isNetworkLikeError(error) {
  if (!error) {
    return false;
  }

  const message = String(error.message || error);
  return (
    error instanceof TypeError ||
    message.includes("Failed to fetch") ||
    message.includes("NetworkError") ||
    message.includes("Load failed") ||
    message.includes("Invalid API response")
  );
}

async function request(path, options = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("ai-village-brain-token") : null;
  const headers = options.body instanceof FormData ? {} : { "Content-Type": "application/json" };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const apiBases = getApiBaseCandidates();
  let lastError = null;

  for (const baseUrl of apiBases) {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
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

      const contentType = response.headers.get("content-type") || "";
      const isJson = contentType.includes("application/json");
      const payload = isJson ? await response.json().catch(() => ({})) : null;

      if (!response.ok) {
        const message = payload?.message || payload?.error;

        if (!isJson && baseUrl !== apiBases[apiBases.length - 1]) {
          lastError = new Error(`Invalid API response from ${baseUrl}`);
          continue;
        }

        throw new Error(message || `Request failed (${response.status})`);
      }

      if (!isJson || !payload) {
        lastError = new Error(`Invalid API response from ${baseUrl}`);
        continue;
      }

      return payload;
    } catch (error) {
      if (isNetworkLikeError(error) && baseUrl !== apiBases[apiBases.length - 1]) {
        lastError = error;
        continue;
      }

      if (isNetworkLikeError(error)) {
        throw new Error(getConnectionHelpMessage());
      }

      throw error;
    }
  }

  throw new Error(lastError?.message || getConnectionHelpMessage());
}

export const api = {
  get: (path) => request(path),
  post: (path, body, custom = {}) => request(path, { method: "POST", body, ...custom }),
  put: (path, body) => request(path, { method: "PUT", body })
};
