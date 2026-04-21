import {
  AudioLines,
  BarChart3,
  BellRing,
  Bug,
  CloudRainWind,
  Cpu,
  DatabaseZap,
  Droplets,
  Factory,
  Globe2,
  HandCoins,
  Landmark,
  Leaf,
  MapPinned,
  MessageCircleMore,
  Microscope,
  PhoneCall,
  Radar,
  ShieldCheck,
  Tractor,
  TrendingUp,
  Wallet
} from "lucide-react";

export const heroSlides = [
  {
    key: "one",
    metric: "21% uplift",
    statLabel: "avg. income opportunity identified",
    chips: ["AI planning", "Field advisory", "Revenue signals"]
  },
  {
    key: "two",
    metric: "48 feeds",
    statLabel: "live sensor + satellite channels connected",
    chips: ["IoT mesh", "Remote sensing", "Village map"]
  },
  {
    key: "three",
    metric: "\u20B94.2L",
    statLabel: "annual risk leakage avoided per cluster",
    chips: ["Market timing", "Claims insight", "Input savings"]
  }
];

export const platformFeatures = [
  {
    title: "AI Crop Planning",
    description: "Recommends crop mixes using soil, climate, market demand, and farmer goals.",
    icon: Leaf,
    tag: "AI"
  },
  {
    title: "Fertilizer Optimization",
    description: "Balances NPK and micronutrients to reduce cost and over-application.",
    icon: Droplets,
    tag: "Yield"
  },
  {
    title: "Pest Detection",
    description: "Flag likely infestations from uploaded images and symptom descriptions.",
    icon: Bug,
    tag: "Vision"
  },
  {
    title: "Yield Prediction",
    description: "Forecast harvest output with stage-wise confidence bands and trend curves.",
    icon: TrendingUp,
    tag: "Forecasting"
  },
  {
    title: "Market Price Prediction",
    description: "Project mandi price swings and suggest the strongest selling windows.",
    icon: BarChart3,
    tag: "Markets"
  },
  {
    title: "Insurance Predictor",
    description: "Estimate climate, crop, and claims risk before policy selection.",
    icon: ShieldCheck,
    tag: "Risk"
  },
  {
    title: "Digital Twin",
    description: "Model farm scenarios for irrigation, yield, and intervention planning.",
    icon: Cpu,
    tag: "Scenario"
  },
  {
    title: "IoT Sensors",
    description: "Unify pH, moisture, temperature, and EC streams into one control layer.",
    icon: Radar,
    tag: "IoT"
  },
  {
    title: "Satellite Monitoring",
    description: "Track vegetation health and stress zones with NDVI-style remote sensing overlays.",
    icon: Globe2,
    tag: "Remote Sensing"
  },
  {
    title: "Weather Data",
    description: "Bring hyperlocal temperature, rain, humidity, and wind alerts to field teams.",
    icon: CloudRainWind,
    tag: "Climate"
  },
  {
    title: "WhatsApp AI",
    description: "Offer advisory journeys and campaign messaging inside WhatsApp-style flows.",
    icon: MessageCircleMore,
    tag: "Engagement"
  },
  {
    title: "Voice AI",
    description: "Use speech input and TTS workflows for low-literacy field interactions.",
    icon: AudioLines,
    tag: "Voice"
  },
  {
    title: "IVR System",
    description: "Route automated calls for advisories, reminders, and escalation workflows.",
    icon: PhoneCall,
    tag: "Automation"
  },
  {
    title: "Supply Chain",
    description: "Monitor post-harvest movement, logistics timing, and buyer readiness.",
    icon: Factory,
    tag: "Ops"
  },
  {
    title: "Alerts System",
    description: "Push real-time triggers for pests, climate shifts, and sensor anomalies.",
    icon: BellRing,
    tag: "Realtime"
  },
  {
    title: "Farm Ledger",
    description: "Track input spend, expected output, and margin snapshots across seasons.",
    icon: Wallet,
    tag: "Finance"
  },
  {
    title: "Carbon Scoring",
    description: "Estimate regenerative practice impact with a simple sustainability index.",
    icon: Tractor,
    tag: "ESG"
  },
  {
    title: "Water Analytics",
    description: "Model irrigation intervals, water stress risk, and conservation efficiency.",
    icon: DatabaseZap,
    tag: "Resource"
  },
  {
    title: "Community Advisory",
    description: "Distribute multilingual village-wide notices by zone and crop segment.",
    icon: MapPinned,
    tag: "Coordination"
  },
  {
    title: "Credit Readiness",
    description: "Summarize operational health signals into lender-friendly credit views.",
    icon: Landmark,
    tag: "Capital"
  },
  {
    title: "Subscription Billing",
    description: "Offer farmer and enterprise plans with checkout-ready subscription workflows.",
    icon: HandCoins,
    tag: "Business"
  },
  {
    title: "Admin Intelligence",
    description: "See adoption, revenue, device health, and AI performance across the network.",
    icon: Microscope,
    tag: "Portfolio"
  }
];

export const landingStats = [
  { label: "Villages monitored", value: "128" },
  { label: "Sensors onboarded", value: "2,480" },
  { label: "AI recommendations", value: "93k" },
  { label: "Insurance risk scans", value: "12.4k" }
];

export const testimonials = [
  {
    name: "Riya Menon",
    role: "Head of Product, SoilRoute",
    quote:
      "AI Village Brain feels enterprise-ready from day one. The dashboards are crisp enough for investors and practical enough for field officers."
  },
  {
    name: "Mahesh Verma",
    role: "Program Lead, Rural Growth Mission",
    quote:
      "We finally have one platform where alerts, recommendations, sensors, and village communication live together."
  },
  {
    name: "Anita Singh",
    role: "Agri Operations Director, Harvest Mesh",
    quote:
      "The admin insights and forecasting layer make it look like a premium SaaS product instead of a stitched-together pilot."
  }
];

export const pricingPlans = [
  {
    name: "Village Starter",
    price: "\u20B999",
    period: "/month",
    summary: "Perfect for individual farmers and small advisory teams.",
    features: [
      "AI crop planning",
      "Pest and fertilizer intelligence",
      "Weather and alerts feed",
      "WhatsApp and voice workflows"
    ],
    highlighted: true
  },
  {
    name: "Enterprise Cluster",
    price: "Custom",
    period: "",
    summary: "For FPOs, NGOs, and district-level deployments.",
    features: [
      "Admin analytics suite",
      "Sensor fleet management",
      "Portfolio-level AI oversight",
      "Custom integration layer"
    ],
    highlighted: false
  }
];
