import { Alert } from "../models/Alert.js";
import { Farm } from "../models/Farm.js";
import { Prediction } from "../models/Prediction.js";
import { SensorData } from "../models/SensorData.js";
import { User } from "../models/User.js";
import { isMockDatabase } from "../config/database.js";

const mockStore = {
  users: [],
  farms: [],
  sensorData: [],
  predictions: [],
  alerts: []
};

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
    farms: user.farmCount
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
