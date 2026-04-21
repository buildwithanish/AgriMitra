import { Alert } from "../models/Alert.js";
import { ContactLead } from "../models/ContactLead.js";
import { Farm } from "../models/Farm.js";
import { PlatformSetting } from "../models/PlatformSetting.js";
import { Prediction } from "../models/Prediction.js";
import { SensorData } from "../models/SensorData.js";
import { User } from "../models/User.js";
import { isMockDatabase } from "../config/database.js";

const mockStore = {
  users: [],
  farms: [],
  sensorData: [],
  predictions: [],
  alerts: [],
  contactLeads: [],
  platformSettings: null
};

export const defaultPlatformSettings = {
  key: "main",
  announcement: {
    enabled: true,
    text: "New subsidy scheme available - Apply now",
    link: "/#contact"
  },
  announcements: [
    {
      id: "announcement-default",
      enabled: true,
      text: "New subsidy scheme available - Apply now",
      link: "/#contact"
    }
  ],
  contact: {
    phone: "+91 9509868673",
    whatsappNumber: "919509868673",
    email: "support@aivillagebrain.com",
    location: "India",
    workingHours: "Mon - Fri: 9:00 AM to 6:00 PM"
  },
  content: {
    heroTitle: "Smart AI Farming Starts Here",
    heroSubtitle:
      "Crop intelligence, sensors, satellite signals, and market timing in one command layer.",
    featuresHeadline:
      "Built for modern farm intelligence across advice, monitoring, and automation",
    featuresDescription:
      "A refined product surface that turns advanced agriculture capabilities into clear, usable workflows.",
    footerDescription:
      "A premium agriculture SaaS platform bringing together AI advisory, sensor intelligence, satellite monitoring, and operator-ready analytics."
  },
  aiKeys: {
    openAiKey: "",
    weatherApiKey: "",
    satelliteProviderKey: "",
    whatsappToken: "",
    firebaseServerKey: ""
  },
  apiKeyToggles: {
    openAiKey: true,
    weatherApiKey: true,
    satelliteProviderKey: true,
    whatsappToken: true,
    firebaseServerKey: true
  }
};

function mergeDeep(target, source) {
  const output = { ...target };

  for (const [key, value] of Object.entries(source || {})) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      output[key] = mergeDeep(output[key] || {}, value);
    } else if (value !== undefined) {
      output[key] = value;
    }
  }

  return output;
}

function createId(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

function toPlain(record) {
  if (!record) {
    return null;
  }

  if (typeof record.toObject === "function") {
    return record.toObject();
  }

  return { ...record };
}

function withAliases(user) {
  return {
    ...user,
    plan: user.subscriptionPlan,
    farms: user.farmCount,
    status: user.isBlocked ? "blocked" : "active"
  };
}

function sanitizeUser(user, options = {}) {
  if (!user) {
    return null;
  }

  const plain = toPlain(user);

  if (!options.includePassword) {
    delete plain.password;
  }

  return options.includeAliases ? withAliases(plain) : plain;
}

function sortByNewest(items) {
  return [...items].sort((left, right) => {
    const leftTime = new Date(left.createdAt || left.timestamp || 0).getTime();
    const rightTime = new Date(right.createdAt || right.timestamp || 0).getTime();
    return rightTime - leftTime;
  });
}

function applyLimit(items, limit) {
  return typeof limit === "number" ? items.slice(0, limit) : items;
}

function createTimestampedRecord(prefix, payload) {
  const now = new Date();
  return {
    _id: createId(prefix),
    createdAt: now,
    updatedAt: now,
    ...payload
  };
}

function mapSensorWithFarm(sensor) {
  const farm = mockStore.farms.find((item) => String(item._id) === String(sensor.farm));

  return {
    ...sensor,
    farm: farm
      ? {
          _id: farm._id,
          name: farm.name,
          currentCrop: farm.currentCrop
        }
      : null
  };
}

export async function countUsers() {
  return isMockDatabase() ? mockStore.users.length : User.countDocuments();
}

export async function findUserByEmail(email, options = {}) {
  if (isMockDatabase()) {
    const user = mockStore.users.find((item) => item.email === String(email).toLowerCase());
    return sanitizeUser(user, options);
  }

  const user = await User.findOne({ email: String(email).toLowerCase() }).lean();
  return sanitizeUser(user, options);
}

export async function findUserById(userId, options = {}) {
  if (isMockDatabase()) {
    const user = mockStore.users.find((item) => String(item._id) === String(userId));
    return sanitizeUser(user, options);
  }

  const user = await User.findById(userId).lean();
  return sanitizeUser(user, options);
}

export async function createUser(payload, options = {}) {
  if (isMockDatabase()) {
    const user = createTimestampedRecord("user", {
      language: "en",
      subscriptionPlan: "starter",
      farmCount: 1,
      role: "farmer",
      isBlocked: false,
      ...payload,
      email: String(payload.email).toLowerCase()
    });

    mockStore.users.push(user);
    return sanitizeUser(user, { includePassword: true, ...options });
  }

  const user = await User.create({
    ...payload,
    email: String(payload.email).toLowerCase()
  });

  return sanitizeUser(user, { includePassword: true, ...options });
}

export async function updateUserLastLogin(userId) {
  const now = new Date();

  if (isMockDatabase()) {
    const user = mockStore.users.find((item) => String(item._id) === String(userId));

    if (!user) {
      return null;
    }

    user.lastLogin = now;
    user.updatedAt = now;
    return sanitizeUser(user, { includePassword: true });
  }

  const user = await User.findByIdAndUpdate(userId, { lastLogin: now }, { new: true });
  return sanitizeUser(user, { includePassword: true });
}

export async function listUsers() {
  if (isMockDatabase()) {
    return sortByNewest(mockStore.users).map((user) => sanitizeUser(user, { includeAliases: true }));
  }

  const users = await User.find().sort({ createdAt: -1 }).lean();
  return users.map((user) => sanitizeUser(user, { includeAliases: true }));
}

export async function updateUser(userId, payload) {
  const allowed = {};

  for (const key of ["name", "role", "subscriptionPlan", "farmCount", "language", "isBlocked"]) {
    if (payload[key] !== undefined) {
      allowed[key] = payload[key];
    }
  }

  if (allowed.isBlocked === true) {
    allowed.blockedAt = new Date();
  }

  if (allowed.isBlocked === false) {
    allowed.blockedAt = null;
  }

  allowed.updatedAt = new Date();

  if (isMockDatabase()) {
    const user = mockStore.users.find((item) => String(item._id) === String(userId));

    if (!user) {
      return null;
    }

    Object.assign(user, allowed);
    return sanitizeUser(user, { includeAliases: true });
  }

  const user = await User.findByIdAndUpdate(userId, allowed, { new: true }).lean();
  return sanitizeUser(user, { includeAliases: true });
}

export async function createFarm(payload) {
  if (isMockDatabase()) {
    const farm = createTimestampedRecord("farm", payload);
    mockStore.farms.push(farm);
    return toPlain(farm);
  }

  const farm = await Farm.create(payload);
  return toPlain(farm);
}

export async function findFarmByOwner(ownerId) {
  if (isMockDatabase()) {
    return toPlain(mockStore.farms.find((farm) => String(farm.owner) === String(ownerId)));
  }

  const farm = await Farm.findOne({ owner: ownerId }).lean();
  return toPlain(farm);
}

export async function createSensorData(payload) {
  if (isMockDatabase()) {
    const sensor = createTimestampedRecord("sensor", {
      status: "active",
      timestamp: new Date(),
      ...payload
    });

    mockStore.sensorData.push(sensor);
    return mapSensorWithFarm(sensor);
  }

  const sensor = await SensorData.create(payload);
  const populatedSensor = await SensorData.findById(sensor._id).populate("farm", "name currentCrop").lean();
  return populatedSensor;
}

export async function listSensorData(options = {}) {
  const { farmId, limit } = options;

  if (isMockDatabase()) {
    const filtered = mockStore.sensorData.filter((sensor) => {
      if (!farmId) {
        return true;
      }

      return String(sensor.farm) === String(farmId);
    });

    return applyLimit(sortByNewest(filtered).map(mapSensorWithFarm), limit);
  }

  const query = SensorData.find(farmId ? { farm: farmId } : {})
    .populate("farm", "name currentCrop")
    .sort({ createdAt: -1 });

  if (typeof limit === "number") {
    query.limit(limit);
  }

  return query.lean();
}

export async function countSensors() {
  return isMockDatabase() ? mockStore.sensorData.length : SensorData.countDocuments();
}

export async function createPrediction(payload) {
  if (isMockDatabase()) {
    const prediction = createTimestampedRecord("prediction", payload);
    mockStore.predictions.push(prediction);
    return toPlain(prediction);
  }

  const prediction = await Prediction.create(payload);
  return toPlain(prediction);
}

export async function listPredictions(options = {}) {
  const { userId, limit } = options;

  if (isMockDatabase()) {
    const filtered = mockStore.predictions.filter((prediction) => {
      if (!userId) {
        return true;
      }

      return String(prediction.user) === String(userId);
    });

    return applyLimit(sortByNewest(filtered), limit).map(toPlain);
  }

  const query = Prediction.find(userId ? { user: userId } : {}).sort({ createdAt: -1 });

  if (typeof limit === "number") {
    query.limit(limit);
  }

  return query.lean();
}

export async function countPredictions() {
  return isMockDatabase() ? mockStore.predictions.length : Prediction.countDocuments();
}

export async function createAlerts(records) {
  const alerts = Array.isArray(records) ? records : [records];

  if (isMockDatabase()) {
    const createdAlerts = alerts.map((alert) =>
      createTimestampedRecord("alert", {
        severity: "medium",
        channel: "dashboard",
        read: false,
        ...alert
      })
    );

    mockStore.alerts.push(...createdAlerts);
    return createdAlerts.map(toPlain);
  }

  const createdAlerts = await Alert.insertMany(alerts);
  return createdAlerts.map(toPlain);
}

export async function listAlerts(options = {}) {
  const { userId, limit } = options;

  if (isMockDatabase()) {
    const filtered = mockStore.alerts.filter((alert) => String(alert.user) === String(userId));
    return applyLimit(sortByNewest(filtered), limit).map(toPlain);
  }

  const query = Alert.find({ user: userId }).sort({ createdAt: -1 });

  if (typeof limit === "number") {
    query.limit(limit);
  }

  return query.lean();
}

export async function createContactLead(payload) {
  if (isMockDatabase()) {
    const lead = createTimestampedRecord("lead", {
      status: "new",
      source: "website",
      ...payload
    });

    mockStore.contactLeads.push(lead);
    return toPlain(lead);
  }

  const lead = await ContactLead.create(payload);
  return toPlain(lead);
}

export async function listContactLeads(options = {}) {
  const { limit } = options;

  if (isMockDatabase()) {
    return applyLimit(sortByNewest(mockStore.contactLeads), limit).map(toPlain);
  }

  const query = ContactLead.find().sort({ createdAt: -1 });

  if (typeof limit === "number") {
    query.limit(limit);
  }

  return query.lean();
}

export async function countContactLeads() {
  return isMockDatabase() ? mockStore.contactLeads.length : ContactLead.countDocuments();
}

export async function getPlatformSettings() {
  if (isMockDatabase()) {
    if (!mockStore.platformSettings) {
      mockStore.platformSettings = createTimestampedRecord("settings", defaultPlatformSettings);
    }

    if (!mockStore.platformSettings.announcements?.length) {
      mockStore.platformSettings.announcements = [
        {
          id: "announcement-default",
          enabled: true,
          text: mockStore.platformSettings.announcement?.text || defaultPlatformSettings.announcement.text,
          link: mockStore.platformSettings.announcement?.link || defaultPlatformSettings.announcement.link
        }
      ];
    }

    if (!mockStore.platformSettings.apiKeyToggles) {
      mockStore.platformSettings.apiKeyToggles = { ...defaultPlatformSettings.apiKeyToggles };
    }

    if (!mockStore.platformSettings.content?.featuresDescription) {
      mockStore.platformSettings.content = {
        ...mockStore.platformSettings.content,
        featuresDescription: defaultPlatformSettings.content.featuresDescription
      };
    }

    return toPlain(mockStore.platformSettings);
  }

  const settings = await PlatformSetting.findOneAndUpdate(
    { key: "main" },
    { $setOnInsert: defaultPlatformSettings },
    { new: true, upsert: true }
  ).lean();
  const normalized = toPlain(settings);

  if (!normalized.announcements?.length) {
    normalized.announcements = [
      {
        id: "announcement-default",
        enabled: true,
        text: normalized.announcement?.text || defaultPlatformSettings.announcement.text,
        link: normalized.announcement?.link || defaultPlatformSettings.announcement.link
      }
    ];
  }

  if (!normalized.apiKeyToggles) {
    normalized.apiKeyToggles = { ...defaultPlatformSettings.apiKeyToggles };
  }

  if (!normalized.content?.featuresDescription) {
    normalized.content = {
      ...normalized.content,
      featuresDescription: defaultPlatformSettings.content.featuresDescription
    };
  }

  return normalized;
}

export async function updatePlatformSettings(payload) {
  const current = await getPlatformSettings();
  const merged = mergeDeep(current, payload);
  const announcements = Array.isArray(merged.announcements) && merged.announcements.length
    ? merged.announcements
    : [
        {
          id: "announcement-default",
          enabled: Boolean(merged.announcement?.enabled),
          text: merged.announcement?.text || defaultPlatformSettings.announcement.text,
          link: merged.announcement?.link || defaultPlatformSettings.announcement.link
        }
      ];

  const activeAnnouncement =
    announcements.find((item) => item.enabled && item.text) || announcements[0] || defaultPlatformSettings.announcement;

  merged.announcements = announcements.map((item, index) => ({
    id: item.id || `announcement-${index + 1}`,
    enabled: item.enabled !== false,
    text: item.text || "",
    link: item.link || "/#contact"
  }));
  merged.announcement = {
    enabled: activeAnnouncement?.enabled !== false,
    text: activeAnnouncement?.text || defaultPlatformSettings.announcement.text,
    link: activeAnnouncement?.link || defaultPlatformSettings.announcement.link
  };
  merged.apiKeyToggles = {
    ...defaultPlatformSettings.apiKeyToggles,
    ...(merged.apiKeyToggles || {})
  };
  merged.key = "main";
  merged.updatedAt = new Date();

  if (isMockDatabase()) {
    mockStore.platformSettings = merged;
    return toPlain(mockStore.platformSettings);
  }

  const { _id, createdAt, ...updatePayload } = merged;

  const settings = await PlatformSetting.findOneAndUpdate(
    { key: "main" },
    { $set: updatePayload },
    { new: true, upsert: true }
  ).lean();

  return toPlain(settings);
}
