function clamp(number, min, max) {
  return Math.max(min, Math.min(max, number));
}

function toPercent(number) {
  return `${Math.round(number)}%`;
}

export function getCropRecommendation(input = {}) {
  const soilType = (input.soilType || "loamy").toLowerCase();
  const season = (input.season || "rabi").toLowerCase();
  const waterAvailability = (input.waterAvailability || "medium").toLowerCase();
  const marketDemand = Number(input.marketDemand || 72);
  const ph = Number(input.ph || 6.6);

  const cropMatrix = {
    rabi: ["Wheat", "Chickpea", "Mustard"],
    kharif: ["Rice", "Maize", "Soybean"],
    zaid: ["Mung Bean", "Watermelon", "Cucumber"]
  };

  const baseCrops = cropMatrix[season] || cropMatrix.rabi;
  const moistureBoost = waterAvailability === "high" ? 6 : waterAvailability === "low" ? -6 : 0;
  const phBoost = ph >= 6 && ph <= 7.2 ? 8 : 2;
  const soilBoost = ["loamy", "clay loam"].includes(soilType) ? 10 : 4;

  const recommendations = baseCrops.map((crop, index) => {
    const score = clamp(72 + soilBoost + phBoost + moistureBoost - index * 4 + marketDemand * 0.08, 60, 97);

    return {
      crop,
      score: Math.round(score),
      rationale:
        crop === "Wheat"
          ? "Stable fit for current soil profile and high seasonal demand."
          : crop === "Chickpea"
            ? "Offers strong margin potential with moderate input cost."
            : "Adds resilience and market diversification to the planting plan."
    };
  });

  return {
    summary: "AI Village Brain suggests a balanced crop mix led by profitability and field suitability.",
    recommendations
  };
}

export function getFertilizerOptimization(input = {}) {
  const crop = input.crop || "Wheat";
  const acreage = Number(input.acreage || 1.5);
  const nitrogen = Number(input.nitrogen || 42);
  const phosphorous = Number(input.phosphorous || 27);
  const potassium = Number(input.potassium || 24);

  const targetNitrogen = clamp(58 - nitrogen * 0.18, 16, 64);
  const targetPhosphorous = clamp(34 - phosphorous * 0.12, 12, 40);
  const targetPotassium = clamp(28 - potassium * 0.1, 10, 34);
  const savings = Math.round(acreage * 320);

  return {
    crop,
    plan: {
      nitrogenKg: Math.round(targetNitrogen),
      phosphorousKg: Math.round(targetPhosphorous),
      potassiumKg: Math.round(targetPotassium),
      bioStimulent: "Add seaweed-based foliar spray at tillering stage",
      savings: `\u20B9${savings}`
    },
    insight: "Optimization reduces excess urea and improves nutrient balance for stronger root development."
  };
}

export function getPestDetection(input = {}) {
  const crop = input.crop || "Wheat";
  const filename = (input.filename || "leaf-scan.jpg").toLowerCase();
  const symptoms = (input.symptoms || "").toLowerCase();
  const isRust = filename.includes("rust") || symptoms.includes("spots");
  const pest = isRust ? "Leaf Rust" : "Aphid Pressure";
  const confidence = isRust ? 91 : 84;

  return {
    crop,
    detectedPest: pest,
    confidence: toPercent(confidence),
    severity: confidence > 88 ? "moderate" : "low",
    action: isRust
      ? "Scout affected blocks, improve airflow, and evaluate fungicide intervention."
      : "Inspect under-leaf clusters and apply targeted biocontrol if threshold increases."
  };
}

export function getYieldPrediction(input = {}) {
  const acreage = Number(input.acreage || 2);
  const historicalYield = Number(input.historicalYield || 31);
  const rainfall = Number(input.rainfall || 78);
  const soilMoisture = Number(input.soilMoisture || 40);
  const projectedYield = historicalYield + rainfall * 0.06 + soilMoisture * 0.11;

  return {
    projectedYield: `${projectedYield.toFixed(1)} quintals`,
    confidence: toPercent(clamp(82 + soilMoisture * 0.08, 80, 95)),
    perAcreYield: `${(projectedYield / acreage).toFixed(1)} quintals/acre`,
    scenarios: [
      { label: "Conservative", yield: `${(projectedYield * 0.93).toFixed(1)} quintals` },
      { label: "Base", yield: `${projectedYield.toFixed(1)} quintals` },
      { label: "Upside", yield: `${(projectedYield * 1.07).toFixed(1)} quintals` }
    ]
  };
}

export function getMarketPricePrediction(input = {}) {
  const crop = input.crop || "Tomato";
  const demandIndex = Number(input.demandIndex || 67);
  const supplyIndex = Number(input.supplyIndex || 54);
  const basePrice = Number(input.basePrice || 24);
  const delta = (demandIndex - supplyIndex) * 0.18;

  return {
    crop,
    predictedPrice: `\u20B9${(basePrice + delta).toFixed(2)}/kg`,
    direction: delta > 0 ? "Uptrend" : "Softening",
    recommendedWindow: delta > 0 ? "Sell in 3-5 days" : "Hold and reassess after next mandi cycle",
    weeklyTrend: Array.from({ length: 5 }).map((_, index) => ({
      day: `D${index + 1}`,
      price: Number((basePrice + delta * (0.55 + index * 0.18)).toFixed(2))
    }))
  };
}

export function getCropHealthScore(input = {}) {
  const ndvi = Number(input.ndvi || 0.74);
  const canopyTemperature = Number(input.canopyTemperature || 29);
  const moisture = Number(input.moisture || 42);
  const score = clamp(ndvi * 100 + moisture * 0.45 - canopyTemperature * 0.35, 58, 96);

  return {
    score: `${Math.round(score)}/100`,
    band: score > 85 ? "Healthy" : score > 72 ? "Watchlist" : "At risk",
    stressHotspots: ["North-east boundary", "Low-lying corner near canal"],
    ndvi: ndvi.toFixed(2),
    note: "Satellite simulation suggests localized stress rather than whole-field decline."
  };
}

export function getInsuranceRiskPrediction(input = {}) {
  const rainfallVariance = Number(input.rainfallVariance || 18);
  const pestRisk = Number(input.pestRisk || 27);
  const claimHistory = Number(input.claimHistory || 1);
  const score = clamp(28 + rainfallVariance * 0.8 + pestRisk * 0.7 + claimHistory * 9, 22, 89);

  return {
    riskScore: `${Math.round(score)}/100`,
    riskBand: score > 65 ? "Elevated" : score > 45 ? "Moderate" : "Low",
    premiumGuidance: score > 65 ? "Expect higher premium loading" : "Standard premium band expected",
    mitigation: "Combine weather alerts and pest surveillance logs to strengthen claim readiness."
  };
}

export function getDigitalTwinSimulation(input = {}) {
  const irrigationDelayDays = Number(input.irrigationDelayDays || 1);
  const fertilizerDelayDays = Number(input.fertilizerDelayDays || 0);
  const acreage = Number(input.acreage || 2);
  const yieldImpact = clamp(100 - irrigationDelayDays * 2.8 - fertilizerDelayDays * 1.9, 81, 100);
  const marginImpact = clamp(100 - irrigationDelayDays * 1.4 - fertilizerDelayDays * 1.1, 86, 100);

  return {
    acreage,
    scenario: "Delayed irrigation and nutrient adjustment",
    yieldRetention: toPercent(yieldImpact),
    marginRetention: toPercent(marginImpact),
    actions: [
      "Advance the next irrigation cycle by 24 hours",
      "Add foliar micronutrients during evening window",
      "Monitor moisture sensor variance every 6 hours"
    ]
  };
}
