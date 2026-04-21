const LOCAL_API_URL = "http://localhost:5000/api";
const REMOTE_API_URL = "https://agrimitra-z5r6.onrender.com/api";
const LOCAL_SOCKET_URL = "http://localhost:5000";
const REMOTE_SOCKET_URL = "https://agrimitra-z5r6.onrender.com";

function normalizeValue(value) {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

function isLocalHost(hostname) {
  return ["localhost", "127.0.0.1"].includes(hostname);
}

function isLocalUrl(value) {
  if (!value) {
    return false;
  }

  try {
    return isLocalHost(new URL(value).hostname);
  } catch {
    return value.includes("localhost") || value.includes("127.0.0.1");
  }
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

export function getApiBaseCandidates() {
  const envApiUrl = normalizeValue(import.meta.env?.VITE_API_URL);

  if (typeof window === "undefined") {
    return unique([envApiUrl, LOCAL_API_URL, REMOTE_API_URL]);
  }

  if (isLocalHost(window.location.hostname)) {
    return unique([envApiUrl, LOCAL_API_URL, REMOTE_API_URL]);
  }

  return unique([envApiUrl, "/api", REMOTE_API_URL]);
}

export function getSocketBaseUrl() {
  const envSocketUrl = normalizeValue(import.meta.env?.VITE_SOCKET_URL);

  if (envSocketUrl) {
    if (
      typeof window !== "undefined" &&
      !isLocalHost(window.location.hostname) &&
      isLocalUrl(envSocketUrl)
    ) {
      return REMOTE_SOCKET_URL;
    }

    return envSocketUrl;
  }

  if (typeof window === "undefined") {
    return LOCAL_SOCKET_URL;
  }

  return isLocalHost(window.location.hostname) ? LOCAL_SOCKET_URL : REMOTE_SOCKET_URL;
}

export function getConnectionHelpMessage() {
  return "Cannot connect to the AI Village Brain backend. Check Vercel proxy rewrites, backend status, or VITE_API_URL.";
}
