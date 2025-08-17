import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import PlanIndicator from '@/components/PlanIndicator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a Polyglow!</Text>
      <Text style={styles.subtitle}>Aprende inglés técnico de manera divertida</Text>
      <PlanIndicator onPress={() => navigation.navigate('Plan')} />
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Session')}
        >
          <Text style={styles.buttonText}>Comenzar Sesión</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate('Progress')}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>Mi Progreso</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.planButton]}
          onPress={() => navigation.navigate('Plan')}
        >
          <Text style={styles.buttonText}>Plan del día</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: '#666',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  button: {
    backgroundColor: '#f4511e',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#f4511e',
  },
  secondaryButtonText: {
    color: '#f4511e',
  },
  planButton: {
    backgroundColor: '#1e88e5',
  },
});

export default HomeScreen;
