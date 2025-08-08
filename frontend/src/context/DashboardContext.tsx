import React, { createContext, useState, useContext } from 'react';

interface DashboardContextProps {
  startDate: string | null;
  endDate: string | null;
  setStartDate: (date: string | null) => void;
  setEndDate: (date: string | null) => void;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

interface DashboardProviderProps {
  children: React.ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  return (
    <DashboardContext.Provider value={{ startDate, endDate, setStartDate, setEndDate }}>
      {children}
    </DashboardContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
