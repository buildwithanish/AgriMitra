import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        features: "Features",
        about: "About",
        login: "Login",
        dashboard: "Dashboard"
      },
      common: {
        getStarted: "Get Started",
        demo: "Book Demo",
        live: "Live intelligence for every acre",
        viewPlan: "Choose \u20B999 plan"
      },
      hero: {
        badge: "AI-powered village operating system",
        slides: {
          oneTitle: "Smart Farming AI",
          oneDesc: "Turn soil, climate, crop cycles, and local demand into profitable planting decisions.",
          twoTitle: "IoT + Satellite Integration",
          twoDesc: "Blend sensors, field devices, and remote imagery into one village-wide intelligence graph.",
          threeTitle: "Increase Farmer Income",
          threeDesc: "Improve yield, cut waste, reduce risk, and unlock stronger market timing for every farmer."
        }
      },
      landing: {
        trusted: "Built for farmer producer groups, agritech startups, NGOs, and district programs",
        featuresTitle: "Twenty-two intelligence layers in one operating system",
        featuresBody:
          "From recommendations and risk scoring to sensor orchestration and WhatsApp copilots, every workflow is designed for scale.",
        aboutTitle: "Village intelligence, not just another dashboard",
        aboutBody:
          "AI Village Brain turns fragmented agriculture data into coordinated action across crops, people, devices, and revenue streams.",
        testimonialsTitle: "Teams using AI Village Brain move faster",
        testimonialsBody: "Built to look boardroom-ready while staying practical for field teams.",
        pricingTitle: "Simple subscription for village-scale impact",
        pricingBody: "Start with a flat monthly plan and mock checkout flow, then connect a real payment gateway later."
      },
      auth: {
        title: "Sign in to your village intelligence workspace",
        subtitle: "Use demo accounts or create a new farmer/admin profile.",
        login: "Login",
        signup: "Create account"
      },
      dashboard: {
        title: "Farmer command center",
        subtitle: "Recommendations, alerts, weather, and profitability trends in one panel."
      },
      admin: {
        title: "Admin intelligence suite",
        subtitle: "Operations, revenue, adoption, and AI performance at portfolio level."
      }
    }
  },
  hi: {
    translation: {
      nav: {
        home: "होम",
        features: "फ़ीचर्स",
        about: "जानकारी",
        login: "लॉगिन",
        dashboard: "डैशबोर्ड"
      },
      common: {
        getStarted: "शुरू करें",
        demo: "डेमो देखें",
        live: "हर खेत के लिए लाइव इंटेलिजेंस",
        viewPlan: "\u20B999 प्लान चुनें"
      },
      hero: {
        badge: "गांवों के लिए AI ऑपरेटिंग सिस्टम",
        slides: {
          oneTitle: "स्मार्ट फार्मिंग AI",
          oneDesc: "मिट्टी, मौसम, फसल चक्र और बाज़ार मांग को लाभकारी फैसलों में बदलें।",
          twoTitle: "IoT + सैटेलाइट इंटीग्रेशन",
          twoDesc: "सेंसर, डिवाइस और सैटेलाइट डेटा को एक ही इंटेलिजेंस लेयर में देखें।",
          threeTitle: "किसान आय बढ़ाएं",
          threeDesc: "उपज बढ़ाएं, लागत घटाएं और सही समय पर सही बाज़ार चुनें।"
        }
      },
      landing: {
        trusted: "FPO, एग्रीटेक स्टार्टअप, NGO और जिला कार्यक्रमों के लिए तैयार",
        featuresTitle: "एक ही प्लेटफ़ॉर्म में 22 इंटेलिजेंस लेयर्स",
        featuresBody:
          "सलाह, जोखिम स्कोरिंग, सेंसर ऑर्केस्ट्रेशन और WhatsApp copilot जैसे सभी वर्कफ़्लो एक जगह।",
        aboutTitle: "सिर्फ एक और डैशबोर्ड नहीं, पूरा village intelligence stack",
        aboutBody:
          "AI Village Brain कृषि डेटा को जोड़कर फसल, लोगों, डिवाइस और आय के लिए कार्रवाई योग्य निर्णय बनाता है।",
        testimonialsTitle: "AI Village Brain के साथ टीमें तेज़ी से काम करती हैं",
        testimonialsBody: "प्रीमियम SaaS लुक के साथ ग्राउंड ऑपरेशंस के लिए व्यावहारिक डिज़ाइन।",
        pricingTitle: "गांव स्तर के प्रभाव के लिए आसान सब्सक्रिप्शन",
        pricingBody: "\u20B999 मासिक प्लान से शुरू करें और बाद में असली payment gateway जोड़ें।"
      },
      auth: {
        title: "अपने village intelligence workspace में लॉगिन करें",
        subtitle: "डेमो अकाउंट इस्तेमाल करें या नया किसान/एडमिन प्रोफाइल बनाएं।",
        login: "लॉगिन",
        signup: "अकाउंट बनाएं"
      },
      dashboard: {
        title: "किसान कमांड सेंटर",
        subtitle: "सलाह, अलर्ट, मौसम और लाभ ट्रेंड्स एक ही पैनल में।"
      },
      admin: {
        title: "एडमिन इंटेलिजेंस सूट",
        subtitle: "ऑपरेशन, राजस्व, adoption और AI performance का पोर्टफोलियो व्यू।"
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("ai-village-brain-language") || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
