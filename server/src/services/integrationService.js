export function getWeatherSimulation(location = "Nashik, Maharashtra") {
  return {
    location,
    temperature: 28,
    humidity: 64,
    rainfallChance: 32,
    windSpeed: 12,
    condition: "Clouds with light wind",
    advisory: "Light irrigation is sufficient. Keep scouting for fungal pressure in humid pockets."
  };
}

export function simulateWhatsApp(payload = {}) {
  return {
    delivered: true,
    threadId: `wa-${Date.now()}`,
    phone: payload.phone || "+91XXXXXXXXXX",
    preview: payload.message || "Demo WhatsApp advisory sent",
    status: "sent"
  };
}

export function simulateVoice(payload = {}) {
  return {
    status: "generated",
    language: payload.language || "en-IN",
    transcript: payload.text || "Voice advisory synthesized successfully.",
    audioUrl: "https://example.com/mock-audio/advisory.mp3"
  };
}

export function simulateFirebase(payload = {}) {
  return {
    status: "queued",
    topic: payload.topic || "farmer-alerts",
    title: payload.title || "AI Village Brain Alert",
    message: payload.message || "Mock Firebase notification dispatched."
  };
}
