const rotatingAlerts = [
  {
    severity: "medium",
    title: "Pest risk signal",
    message: "Humidity spike detected. Scout fungal pressure in the next 24 hours."
  },
  {
    severity: "low",
    title: "Market signal",
    message: "Tomato mandi pricing is showing an upward bias for the next session."
  },
  {
    severity: "high",
    title: "Sensor anomaly",
    message: "One moisture sensor cluster shows abrupt drop. Field verification recommended."
  }
];

export function registerAlertSocket(io) {
  io.on("connection", (socket) => {
    socket.emit("alert:welcome", { message: "Connected to AI Village Brain alert stream" });
  });

  let index = 0;
  setInterval(() => {
    const alert = {
      _id: `socket-${Date.now()}`,
      ...rotatingAlerts[index % rotatingAlerts.length]
    };

    io.emit("alert:new", alert);
    index += 1;
  }, 20000);
}
