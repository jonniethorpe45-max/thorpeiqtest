import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { trackEvent } from '@/lib/analytics';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isPremium: boolean;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  checkPremiumStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

  const checkPremiumStatus = async () => {
    if (!session) {
      setIsPremium(false);
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('check-premium');
      if (!error && data?.isPremium) {
        setIsPremium(true);
      } else {
        setIsPremium(false);
      }
    } catch (err) {
      console.error('Error checking premium status:', err);
      setIsPremium(false);
    }
  };

  useEffect(() => {
    let subscription: { unsubscribe: () => void } | null = null;
    
    const initAuth = async () => {
      try {
        // Set up auth state listener FIRST
        const { data } = supabase.auth.onAuthStateChange(
          (event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setIsLoading(false);

            // Check premium status after auth change (deferred to avoid deadlock)
            if (session?.user) {
              setTimeout(() => {
                checkPremiumStatus();
              }, 0);
            } else {
              setIsPremium(false);
            }
          }
        );
        subscription = data.subscription;

        // THEN check for existing session
        const { data: sessionData } = await supabase.auth.getSession();
        setSession(sessionData.session);
        setUser(sessionData.session?.user ?? null);
        setIsLoading(false);

        if (sessionData.session?.user) {
          setTimeout(() => {
            checkPremiumStatus();
          }, 0);
        }
      } catch (e) {
        console.warn('Auth initialization failed:', e);
        setIsLoading(false);
      }
    };

    initAuth();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    const redirectUrl = typeof window !== 'undefined' ? `${window.location.origin}/` : '/';
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });
    
    if (!error) {
      trackEvent('user_signed_up');
    } else {
      trackEvent('signup_error', { error_message: error.message });
    }
    
    return { error: error as Error | null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (!error) {
      trackEvent('user_signed_in');
    } else {
      trackEvent('signin_error', { error_message: error.message });
    }
    
    return { error: error as Error | null };
  };

  const signOut = async () => {
    trackEvent('user_signed_out');
    await supabase.auth.signOut();
    setIsPremium(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isPremium,
        signUp,
        signIn,
        signOut,
        checkPremiumStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
