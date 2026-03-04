import React, { createContext, useCallback, useContext, useState } from 'react';

import type { League } from '@/models/league';

type LeaguesContextValue = {
  leagues: League[];
  addLeague: (league: League) => void;
  removeLeague: (id: string) => void;
};

const LeaguesContext = createContext<LeaguesContextValue | null>(null);

export function LeaguesProvider({ children }: { children: React.ReactNode }) {
  const [leagues, setLeagues] = useState<League[]>([]);

  const addLeague = useCallback((league: League) => {
    setLeagues((prev) => [...prev, league]);
  }, []);

  const removeLeague = useCallback((id: string) => {
    setLeagues((prev) => prev.filter((l) => l.id !== id));
  }, []);

  return (
    <LeaguesContext.Provider value={{ leagues, addLeague, removeLeague }}>
      {children}
    </LeaguesContext.Provider>
  );
}

export function useLeagues(): LeaguesContextValue {
  const ctx = useContext(LeaguesContext);
  if (!ctx) throw new Error('useLeagues must be used within LeaguesProvider');
  return ctx;
}
