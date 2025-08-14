import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import AppNavigator from '../src/navigation/AppNavigator';

export default function RootLayout() {
  return (
    <>
      <AppNavigator />
      <StatusBar style="auto" />
    </>
  );
}
