import {
  Activity,
  ArrowUpRight,
  AudioLines,
  BadgeHelp,
  BookOpenText,
  BellRing,
  BrainCircuit,
  BriefcaseBusiness,
  Bug,
  CalendarDays,
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
  Newspaper,
  PhoneCall,
  Rocket,
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
          { label: "Contact", href: "/#contact", description: "Talk to our agriculture specialists", action: "contact-modal" },
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
    ],
    spotlight: {
      title: "Operator services built for real farm workflows",
      description: "From AI advisory to finance and remote monitoring, every service is packaged like a premium product module.",
      chips: ["Advisory", "Monitoring", "Automation"],
      href: "/#services"
    }
  },
  {
    label: "Projects",
    type: "dropdown",
    groups: [
      {
        title: "Project Menu",
        items: [
          { label: "Project Overview", href: "/#projects" },
          {
            label: "Project Details",
            children: [
              { label: "Project Left", href: "/#projects" },
              { label: "Project Right", href: "/#projects" },
              { label: "Project Single", href: "/#projects" }
            ]
          }
        ]
      }
    ],
    spotlight: {
      title: "Deployment stories, rollout snapshots, and village case views",
      description: "Showcase polished project highlights instead of empty menu space.",
      chips: ["Case Studies", "Rollouts", "Impact"],
      href: "/#projects"
    }
  },
  {
    label: "Blog",
    type: "dropdown",
    groups: [
      {
        title: "Blog Menu",
        items: [
          { label: "Blog Overview", href: "/#blog" },
          {
            label: "Blog Details",
            children: [
              { label: "Blog Left", href: "/#blog" },
              { label: "Blog Right", href: "/#blog" },
              { label: "Blog Single", href: "/#blog" }
            ]
          }
        ]
      }
    ],
    spotlight: {
      title: "Content that explains the product in a clear, startup-ready way",
      description: "Product notes, advisory articles, and launch-style blog cards for visitors and partners.",
      chips: ["Insights", "Updates", "Field Notes"],
      href: "/#blog"
    }
  },
  {
    label: "Contact",
    href: "/#contact",
    action: "contact-modal",
    type: "link"
  }
];

export const topBarInfo = {
  message: "Are you ready to grow your farm?",
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
    secondaryCta: "See Platform Tour",
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
      "From fertilizer optimization to WhatsApp AI and digital twin scenario modeling, every module is designed to improve margins.",
    primaryCta: "View Dashboard Preview",
    secondaryCta: "Subscribe for Updates",
    primaryHref: "/#dashboard-preview",
    secondaryHref: "/#newsletter",
    metrics: [
      { label: "Income lift identified", value: "\u20B94.2L" },
      { label: "Risk leakage reduced", value: "18%" }
    ]
  },
  {
    id: "hero-4",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
    eyebrow: "Yield control room",
    title: "Forecast harvest performance with sharper operational visibility",
    description:
      "Monitor crop strength, irrigation timing, weather shifts, and market confidence from one premium analytics layer.",
    primaryCta: "Open Farmer Panel",
    secondaryCta: "See AI Features",
    primaryHref: "/login",
    secondaryHref: "/features",
    metrics: [
      { label: "Yield confidence", value: "94%" },
      { label: "Field alerts", value: "24" }
    ]
  },
  {
    id: "hero-5",
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1600&q=80",
    eyebrow: "Farmer network ops",
    title: "Run village programs with dashboards that feel enterprise-ready",
    description:
      "Coordinate advisory campaigns, sensor fleets, and field teams across clusters without losing simplicity for daily use.",
    primaryCta: "View Admin Workspace",
    secondaryCta: "Meet the Team",
    primaryHref: "/login",
    secondaryHref: "/#team",
    metrics: [
      { label: "Clusters active", value: "36" },
      { label: "Program uptime", value: "99.2%" }
    ]
  },
  {
    id: "hero-6",
    image:
      "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1600&q=80",
    eyebrow: "Precision nutrition",
    title: "Reduce input waste with fertilizer optimization that stays actionable",
    description:
      "Translate soil and crop signals into nutrient strategies that protect margins and improve consistency across seasons.",
    primaryCta: "Explore Services",
    secondaryCta: "Talk to Us",
    primaryHref: "/#services",
    secondaryHref: "/#contact",
    metrics: [
      { label: "Input savings", value: "11%" },
      { label: "Soil scans", value: "8.2K" }
    ]
  },
  {
    id: "hero-7",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80",
    eyebrow: "Satellite intelligence",
    title: "Detect crop stress earlier with remote monitoring layers",
    description:
      "Use satellite-style health scoring and plot-level pattern recognition to prioritize on-ground action faster.",
    primaryCta: "View Dashboard Preview",
    secondaryCta: "Read Testimonials",
    primaryHref: "/#dashboard-preview",
    secondaryHref: "/#testimonials",
    metrics: [
      { label: "Plots scored", value: "14.5K" },
      { label: "Stress zones found", value: "312" }
    ]
  },
  {
    id: "hero-8",
    image:
      "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=1600&q=80",
    eyebrow: "Market timing",
    title: "Spot stronger selling windows before price moves pass you by",
    description:
      "Blend mandi trend signals with yield expectations so growers can make better timing decisions with more confidence.",
    primaryCta: "See Market Signals",
    secondaryCta: "Subscribe for Updates",
    primaryHref: "/#dashboard-preview",
    secondaryHref: "/#newsletter",
    metrics: [
      { label: "Price lift tracked", value: "+17%" },
      { label: "Markets watched", value: "84" }
    ]
  },
  {
    id: "hero-9",
    image:
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1600&q=80",
    eyebrow: "Voice + WhatsApp AI",
    title: "Reach farmers through familiar channels, not just dashboards",
    description:
      "Deploy multilingual chat, voice support, and alert workflows that make intelligence accessible beyond the screen.",
    primaryCta: "Open WhatsApp AI",
    secondaryCta: "Contact Team",
    primaryHref: "/#whatsapp",
    secondaryHref: "/#contact",
    metrics: [
      { label: "Messages sent", value: "51K" },
      { label: "Voice sessions", value: "9.8K" }
    ]
  },
  {
    id: "hero-10",
    image:
      "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=1600&q=80",
    eyebrow: "Insurance + resilience",
    title: "Model risk before it becomes a costly season surprise",
    description:
      "Use insurance prediction, digital twin scenario modeling, and alerting to manage uncertainty with a more strategic view.",
    primaryCta: "Start Growing Now",
    secondaryCta: "Explore Platform",
    primaryHref: "/login",
    secondaryHref: "/features",
    metrics: [
      { label: "Risk score checks", value: "12.4K" },
      { label: "Scenarios modeled", value: "3.1K" }
    ]
  }
];

export const aboutHighlights = [
  "Premium startup-grade interface with a custom agriculture product language",
  "Field-first intelligence for AI planning, alerts, weather, and revenue insights",
  "Designed to scale from local pilots to live district deployments"
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

export const projectShowcase = [
  {
    title: "Village rollout command center",
    description: "A multi-cluster pilot where alerts, IoT telemetry, and advisory workflows were unified in one dashboard.",
    metric: "128 villages",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80",
    icon: Rocket
  },
  {
    title: "Market timing intelligence",
    description: "A pricing-monitoring deployment designed to help growers choose better selling windows and reduce margin leakage.",
    metric: "+17% price lift",
    image:
      "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=1200&q=80",
    icon: TrendingUp
  },
  {
    title: "Satellite health monitoring",
    description: "Plot health visualization with remote stress signals layered into daily operational decision-making.",
    metric: "14.5K plots",
    image:
      "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1200&q=80",
    icon: ScanSearch
  }
];

export const blogPosts = [
  {
    title: "How AI crop planning improves farmer income decisions",
    excerpt: "A practical breakdown of crop selection, margin signals, and field-level planning in one workflow.",
    meta: "Product Insight",
    image:
      "https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=1200&q=80",
    icon: BookOpenText
  },
  {
    title: "Why WhatsApp and voice workflows matter in rural operations",
    excerpt: "Modern interfaces matter, but channel accessibility is what drives adoption on the ground.",
    meta: "Field Note",
    image:
      "https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?auto=format&fit=crop&w=1200&q=80",
    icon: Newspaper
  },
  {
    title: "Building a polished agritech dashboard that feels investor-ready",
    excerpt: "Design patterns, analytics layers, and product storytelling for a premium agriculture SaaS experience.",
    meta: "Launch Story",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    icon: CalendarDays
  }
];

export const teamMembers = [
  {
    name: "Anish Raj",
    role: "CEO & Founder",
    image: "/anish-raj.jpg",
    imagePosition: "center top",
    featured: true,
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com", icon: Linkedin },
      { label: "Twitter", href: "https://x.com", icon: Twitter }
    ]
  },
  {
    name: "Aarav Menon",
    role: "Chief Strategy Advisor",
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
  { label: "Contact", href: "/#contact", action: "contact-modal" },
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
    value: "+91 9509868673",
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
