import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";
import { Link } from "react-router-dom";
import { initializeGA, checkAndInitializeGA } from "@/lib/analytics";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return;
      
      const consent = localStorage.getItem("cookie-consent");
      if (!consent) {
        // Small delay for better UX
        const timer = setTimeout(() => setIsVisible(true), 1000);
        return () => clearTimeout(timer);
      } else {
        // Initialize GA if already accepted
        checkAndInitializeGA();
      }
    } catch (e) {
      console.warn('Cookie consent check failed:', e);
    }
  }, []);

  const handleAccept = () => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem("cookie-consent", "accepted");
      }
    } catch (e) {
      console.warn('Failed to save cookie consent:', e);
    }
    initializeGA();
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem("cookie-consent", "declined");
      }
    } catch (e) {
      console.warn('Failed to save cookie consent:', e);
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-5 duration-500">
      <div className="max-w-4xl mx-auto bg-card/95 backdrop-blur-xl border border-border rounded-2xl p-4 md:p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="p-2 bg-primary/20 rounded-lg shrink-0">
              <Cookie className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-foreground">Cookie Consent</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We use cookies to enhance your experience and analyze site traffic. 
                By clicking "Accept", you consent to our use of cookies. 
                Read our{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>{" "}
                for more information.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecline}
              className="flex-1 md:flex-none"
            >
              Decline
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="flex-1 md:flex-none"
            >
              Accept
            </Button>
          </div>
          
          <button
            onClick={handleDecline}
            className="absolute top-2 right-2 md:static p-1 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close cookie banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
