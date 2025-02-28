import { createContext, useState } from 'react';

export interface AppContextInterface {
  isOnBoarding: boolean;
  setIsOnBoarding: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextInterface | null>(null);

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const [isOnBoarding, setIsOnBoarding] = useState<boolean>(true);
  return (
    <AppContext.Provider value={{ isOnBoarding, setIsOnBoarding }}>{children}</AppContext.Provider>
  );
}
