import './global.css';
import React, { ReactNode } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AppProvider from './src/contexts/AppContext';
import { useAppContext } from './src/hooks/useAppContext';
import OnBoarding from './src/components/OnBoarding';
import { AuthProvider, useAuth } from '~/contexts/AuthContext';
import Dashboard from './src/components/Dashboard';

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <SafeAreaProvider>
          <SafeAreaView className="flex-1 bg-dark">
            <AppContainer />
          </SafeAreaView>
        </SafeAreaProvider>
      </AppProvider>
    </AuthProvider>
  );
}

function AppContainer() {
  const appContext = useAppContext();
  const authContext = useAuth();

  return <>{authContext.authState?.authenticated ? <Dashboard /> : <OnBoarding />}</>;
}
