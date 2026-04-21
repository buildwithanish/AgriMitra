import {
  createSensorData as createSensorRecord,
  findFarmByOwner,
  listSensorData
} from "../repositories/platformRepository.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const listSensors = asyncHandler(async (req, res) => {
  const sensors = await listSensorData();
  res.json({ success: true, data: { sensors } });
});

export const createSensorData = asyncHandler(async (req, res) => {
  const farm =
    req.body.farmId ||
    (await findFarmByOwner(req.user._id).then((record) => record?._id));

  if (!farm) {
    res.status(400);
    throw new Error("A farm is required before recording sensor data");
  }

  const sensor = await createSensorRecord({
    farm,
    sensorType: req.body.sensorType,
    value: req.body.value,
    unit: req.body.unit,
    status: req.body.status || "active"
  });

  res.status(201).json({ success: true, data: sensor });
});
