declare module '*.tsx' {
  import { ReactNode } from 'react';
  import { NativeStackScreenProps } from '@react-navigation/native-stack';
  import { RootStackParamList } from '../navigation/AppNavigator';

  type ScreenProps = NativeStackScreenProps<RootStackParamList, keyof RootStackParamList>;
  
  const Component: React.FC<ScreenProps>;
  export default Component;
}
