import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../services/api";

const defaultSettings = {
  announcement: {
    enabled: true,
    text: "New subsidy scheme available - Apply now",
    link: "/#contact"
  },
  contact: {
    phone: "+91 9509868673",
    whatsappNumber: "919509868673",
    email: "support@aivillagebrain.com",
    location: "India",
    workingHours: "Mon - Fri: 9:00 AM to 6:00 PM"
  },
  content: {
    heroTitle: "Smart AI Farming Starts Here",
    heroSubtitle: "Crop intelligence, sensors, satellite signals, and market timing in one command layer.",
    featuresHeadline: "Built for modern farm intelligence across advice, monitoring, and automation",
    footerDescription:
      "A premium agriculture SaaS platform bringing together AI advisory, sensor intelligence, satellite monitoring, and operator-ready analytics."
  }
};

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadSettings() {
      try {
        const response = await api.get("/settings");
        if (mounted) {
          setSettings((current) => ({
            ...current,
            ...(response.data || {})
          }));
          setError("");
        }
      } catch (requestError) {
        if (mounted) {
          setError(requestError.message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadSettings();

    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      settings,
      loading,
      error,
      setSettings
    }),
    [settings, loading, error]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  return useContext(SettingsContext);
}
