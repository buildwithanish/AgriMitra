import {
  Activity,
  ArrowUpRight,
  AudioLines,
  BadgeHelp,
  BellRing,
  BrainCircuit,
  BriefcaseBusiness,
  Bug,
  ChartColumnIncreasing,
  CloudRainWind,
  Cpu,
  DatabaseZap,
  Droplets,
  Factory,
  Facebook,
  Globe2,
  Leaf,
  Mail,
  Linkedin,
  MapPin,
  MessageCircleMore,
  PhoneCall,
  Radar,
  ScanSearch,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Sprout,
  Tractor,
  TrendingUp,
  Twitter,
  Users,
  Wheat,
  Youtube
} from "lucide-react";

export const headerNavigation = [
  {
    label: "Home",
    href: "/",
    type: "link"
  },
  {
    label: "Pages",
    type: "mega",
    sections: [
      {
        title: "Company",
        items: [
          { label: "About Us", href: "/#about", description: "Platform story and mission" },
          { label: "Our Team", href: "/#team", description: "Meet the people behind the product" },
          { label: "Team Details", href: "/#team", description: "Leadership and specialist roles" }
        ]
      },
      {
        title: "Trust",
        items: [
          { label: "Testimonials", href: "/#testimonials", description: "What operators and partners say" },
          { label: "Contact", href: "/#contact", description: "Talk to our agriculture specialists" },
          { label: "404 Page", href: "/features", description: "Preview branded utility pages" }
        ]
      }
    ],
    spotlight: {
      title: "Village intelligence for modern agriculture teams",
      description:
        "A polished SaaS experience for agritech operators, field teams, and farmer networks.",
      chips: ["Startup-grade UI", "Farm analytics", "Actionable AI"]
    }
  },
  {
    label: "Services",
    type: "dropdown",
    groups: [
      {
        title: "Service Menu",
        items: [
          { label: "Service Overview", href: "/#services" },
          {
            label: "Service Details",
            children: [
              { label: "Service Left", href: "/#services" },
              { label: "Service Right", href: "/#services" },
              { label: "Service Single", href: "/#services" }
            ]
          }
        ]
      }
    ]
  },
  {
    label: "Projects",
    type: "dropdown",
    groups: [
      {
        title: "Project Menu",
        items: [
          { label: "Project Overview", href: "/#dashboard-preview" },
          {
            label: "Project Details",
            children: [
              { label: "Project Left", href: "/#dashboard-preview" },
              { label: "Project Right", href: "/#dashboard-preview" },
              { label: "Project Single", href: "/#dashboard-preview" }
            ]
          }
        ]
      }
    ]
  },
  {
    label: "Blog",
    type: "dropdown",
    groups: [
      {
        title: "Blog Menu",
        items: [
          { label: "Blog Overview", href: "/#newsletter" },
          {
            label: "Blog Details",
            children: [
              { label: "Blog Left", href: "/#newsletter" },
              { label: "Blog Right", href: "/#newsletter" },
              { label: "Blog Single", href: "/#newsletter" }
            ]
          }
        ]
      }
    ]
  },
  {
    label: "Contact",
    href: "/#contact",
    type: "link"
  }
];

export const topBarInfo = {
  message: "Are you ready to grow your farm? Contact Us",
  email: "support@aivillagebrain.com",
  hours: "Mon - Fri: 9:00 AM to 6:00 PM"
};

export const headerUtility = {
  cartCount: 2,
  cartIcon: ShoppingCart
};

export const premiumHeroSlides = [
  {
    id: "hero-1",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=80",
    eyebrow: "AI Village Brain",
    title: "Smart AI Farming Starts Here",
    description:
      "Blend crop intelligence, sensor telemetry, satellite monitoring, and market timing into one beautiful command layer.",
    primaryCta: "Start Growing Now",
    secondaryCta: "See Platform Demo",
    primaryHref: "/login",
    secondaryHref: "/#dashboard-preview",
    metrics: [
      { label: "Yield opportunity", value: "+21%" },
      { label: "Advisories automated", value: "93K" }
    ]
  },
  {
    id: "hero-2",
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1600&q=80",
    eyebrow: "Satellite + IoT stack",
    title: "Village-scale intelligence built for modern agriculture operators",
    description:
      "Track plots, devices, alerts, and profitability with a SaaS interface that feels investor-ready and field-friendly.",
    primaryCta: "Explore Services",
    secondaryCta: "Meet the Team",
    primaryHref: "/#services",
    secondaryHref: "/#team",
    metrics: [
      { label: "Sensor feeds", value: "2,480" },
      { label: "Villages tracked", value: "128" }
    ]
  },
  {
    id: "hero-3",
    image:
      "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1600&q=80",
    eyebrow: "Profitability engine",
    title: "Turn farm data into stronger income decisions",
    description:
      "From fertilizer optimization to WhatsApp AI and digital twin simulations, every module is designed to improve margins.",
    primaryCta: "View Dashboard Preview",
    secondaryCta: "Subscribe for Updates",
    primaryHref: "/#dashboard-preview",
    secondaryHref: "/#newsletter",
    metrics: [
      { label: "Income lift identified", value: "\u20B94.2L" },
      { label: "Risk leakage reduced", value: "18%" }
    ]
  }
];

export const aboutHighlights = [
  "Premium startup-grade interface inspired by modern SaaS product templates",
  "Field-first intelligence for AI planning, alerts, weather, and revenue insights",
  "Designed to scale from demo environments to real deployments"
];

export const services = [
  {
    title: "AI Advisory Programs",
    description: "Deploy multilingual agronomy guidance workflows across village clusters.",
    icon: BrainCircuit
  },
  {
    title: "Sensor Intelligence",
    description: "Monitor soil moisture, pH, EC, and temperature with unified device visibility.",
    icon: Radar
  },
  {
    title: "Satellite Insights",
    description: "Visualize crop health and field stress using remote monitoring layers.",
    icon: Globe2
  },
  {
    title: "Voice & IVR Automation",
    description: "Reach low-literacy users through voice advisories, IVR prompts, and call workflows.",
    icon: PhoneCall
  },
  {
    title: "Farm Finance Signals",
    description: "Forecast profitability, insurance exposure, and lender readiness with confidence.",
    icon: ShieldCheck
  },
  {
    title: "Supply Chain Coordination",
    description: "Track harvest movement, buyer timing, and mandi readiness in one dashboard.",
    icon: Factory
  }
];

export const highlightedFeatures = [
  {
    title: "Crop Planning",
    description: "AI crop sequencing based on soil, market demand, and climate fit.",
    icon: Leaf
  },
  {
    title: "Fertilizer Optimization",
    description: "Precision nutrient recommendations that reduce waste and input cost.",
    icon: Droplets
  },
  {
    title: "Pest Detection",
    description: "Image-led diagnosis for disease and pest risk with guided actions.",
    icon: Bug
  },
  {
    title: "Yield Prediction",
    description: "Forecast output with scenario bands and confidence-based projections.",
    icon: TrendingUp
  },
  {
    title: "Market Prediction",
    description: "Identify better selling windows using mandi pricing intelligence.",
    icon: ChartColumnIncreasing
  },
  {
    title: "IoT Sensors",
    description: "Live data streams for soil, irrigation, microclimate, and equipment health.",
    icon: Cpu
  },
  {
    title: "Satellite Monitoring",
    description: "Remote crop health scoring and stress-zone identification across plots.",
    icon: ScanSearch
  },
  {
    title: "Voice AI",
    description: "Advisories and query flows built for voice-first field operations.",
    icon: AudioLines
  },
  {
    title: "WhatsApp AI",
    description: "Campaigns, support, and recommendations delivered in familiar chat flows.",
    icon: MessageCircleMore
  }
];

export const dashboardPreviewMetrics = [
  { label: "Net margin outlook", value: "+18%", delta: "This cycle" },
  { label: "Live alerts", value: "24", delta: "Real-time stream" },
  { label: "Crop health", value: "91/100", delta: "Satellite score" }
];

export const dashboardPreviewCharts = {
  revenue: [
    { week: "W1", value: 32 },
    { week: "W2", value: 38 },
    { week: "W3", value: 44 },
    { week: "W4", value: 51 },
    { week: "W5", value: 58 }
  ],
  market: [
    { day: "Mon", price: 22 },
    { day: "Tue", price: 23 },
    { day: "Wed", price: 25 },
    { day: "Thu", price: 27 },
    { day: "Fri", price: 29 }
  ]
};

export const teamMembers = [
  {
    name: "Aarav Menon",
    role: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com", icon: Linkedin },
      { label: "Twitter", href: "https://x.com", icon: Twitter }
    ]
  },
  {
    name: "Naina Kapoor",
    role: "Head of Agronomy AI",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com", icon: Linkedin },
      { label: "YouTube", href: "https://www.youtube.com", icon: Youtube }
    ]
  },
  {
    name: "Rohan Patel",
    role: "IoT Systems Lead",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com", icon: Linkedin },
      { label: "Twitter", href: "https://x.com", icon: Twitter }
    ]
  },
  {
    name: "Ishita Rao",
    role: "Product Design Director",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80",
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com", icon: Linkedin },
      { label: "Facebook", href: "https://www.facebook.com", icon: Facebook }
    ]
  }
];

export const testimonials = [
  {
    quote:
      "AI Village Brain looks like a premium SaaS product but solves grounded agriculture problems our field teams actually face.",
    name: "Meera Sethi",
    role: "Program Director, Rural Forward"
  },
  {
    quote:
      "The dashboards, alerts, and village analytics helped us present a much stronger story to investors and implementation partners.",
    name: "Karthik Rao",
    role: "Founder, AgroMesh Labs"
  },
  {
    quote:
      "This feels far beyond a pilot dashboard. It has the polish, motion, and structure of a serious startup platform.",
    name: "Ritika Jain",
    role: "Head of Operations, FarmLink Network"
  }
];

export const footerSocials = [
  { label: "Facebook", href: "https://www.facebook.com", icon: Facebook },
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: Linkedin },
  { label: "YouTube", href: "https://www.youtube.com", icon: Youtube },
  { label: "Twitter", href: "https://x.com", icon: Twitter }
];

export const footerTopLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
  { label: "Blog", href: "/#newsletter" }
];

export const footerFeatureLinks = [
  { label: "Crop Planning", href: "/#features" },
  { label: "Pest Detection", href: "/#features" },
  { label: "Yield Prediction", href: "/#features" },
  { label: "Market Prediction", href: "/#features" },
  { label: "IoT Sensors", href: "/#features" }
];

export const footerContactStrip = [
  {
    title: "Location",
    value: "India",
    icon: MapPin
  },
  {
    title: "Email",
    value: "support@aivillagebrain.com",
    icon: Mail
  },
  {
    title: "Phone",
    value: "+91 XXXXX XXXXX",
    icon: PhoneCall
  }
];

export const footerHours = [
  { label: "Mon - Fri", value: "09:00 AM - 06:00 PM" },
  { label: "Sunday", value: "10:00 AM - 02:00 PM" },
  { label: "Saturday", value: "Closed" }
];

export const footerAppLinks = {
  playStore: "https://play.google.com/store/apps/details?id=aivillagebrain",
  appStore: "https://apps.apple.com/app/id123456789"
};
