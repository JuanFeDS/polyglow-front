import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importar pantallas
import HomeScreen from '@/screens/HomeScreen';
import SessionScreen from '@/screens/SessionScreen';
import ProgressScreen from '@/screens/ProgressScreen';
import PlanScreen from '@/screens/PlanScreen';

export type RootStackParamList = {
  Home: undefined;
  Session: undefined;
  Progress: undefined;
  Plan: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Polyglow' }} 
      />
      <Stack.Screen 
        name="Session" 
        component={SessionScreen} 
        options={{ title: 'Sesión' }} 
      />
      <Stack.Screen 
        name="Progress" 
        component={ProgressScreen} 
        options={{ title: 'Mi Progreso' }} 
      />
      <Stack.Screen 
        name="Plan" 
        component={PlanScreen} 
        options={{ title: 'Plan del día' }} 
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
