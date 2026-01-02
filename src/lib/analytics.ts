const GA_MEASUREMENT_ID = "G-9W7HWN1E2T";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export const initializeGA = () => {
  if (typeof window === "undefined") return;
  
  // Check if already initialized
  if (window.gtag) return;

  // Load gtag script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);
};

export const checkAndInitializeGA = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const consent = localStorage.getItem("cookie-consent");
      if (consent === "accepted") {
        initializeGA();
      }
    }
  } catch (e) {
    console.warn('Failed to check GA consent:', e);
  }
};

export const trackPageView = (pageName: string) => {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_title: pageName,
    page_location: window.location.href,
  });
};

export const trackEvent = (
  eventName: string,
  params?: Record<string, string | number | boolean>
) => {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, params);
};
