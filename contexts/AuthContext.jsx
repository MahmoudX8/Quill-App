import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { migrateLocalNotesToSupabase } from "../service/noteService";
const AuthContext = createContext({ session: null, loading: true });

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if(session) migrateLocalNotesToSupabase(session);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);