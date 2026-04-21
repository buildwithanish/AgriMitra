const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+\d\s-]{8,20}$/;

function readValue(req, source, field) {
  if (source === "body") {
    return req.body?.[field];
  }

  if (source === "params") {
    return req.params?.[field];
  }

  return req.query?.[field];
}

function isEmpty(value) {
  return value === undefined || value === null || String(value).trim() === "";
}

export function validateRequest(schema) {
  return (req, res, next) => {
    for (const [source, rules] of Object.entries(schema || {})) {
      for (const [field, config] of Object.entries(rules || {})) {
        const value = readValue(req, source, field);

        if (config.required && isEmpty(value)) {
          res.status(400);
          throw new Error(config.message || `${field} is required`);
        }

        if (isEmpty(value)) {
          continue;
        }

        if (config.type === "email" && !emailPattern.test(String(value).trim())) {
          res.status(400);
          throw new Error(config.message || `Invalid ${field}`);
        }

        if (config.type === "phone" && !phonePattern.test(String(value).trim())) {
          res.status(400);
          throw new Error(config.message || `Invalid ${field}`);
        }

        if (config.enum && !config.enum.includes(value)) {
          res.status(400);
          throw new Error(config.message || `${field} must be one of ${config.enum.join(", ")}`);
        }

        if (config.minLength && String(value).trim().length < config.minLength) {
          res.status(400);
          throw new Error(config.message || `${field} must be at least ${config.minLength} characters`);
        }
      }
    }

    next();
  };
}
