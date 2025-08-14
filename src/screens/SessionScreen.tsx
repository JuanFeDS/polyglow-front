import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Session'>;

const SessionScreen = ({ navigation }: Props) => {
  const modules = [
    { id: '1', title: 'Listening', description: 'Mejora tu comprensión auditiva' },
    { id: '2', title: 'Speaking', description: 'Practica tu pronunciación' },
    { id: '3', title: 'Writing', description: 'Escribe con precisión' },
    { id: '4', title: 'Vocabulario', description: 'Amplía tu vocabulario técnico' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Módulos de Aprendizaje</Text>
      
      {modules.map((module) => (
        <TouchableOpacity 
          key={module.id}
          style={styles.card}
          onPress={() => {
            // Navegar al módulo específico cuando esté implementado
            console.log(`Iniciando módulo: ${module.title}`);
          }}
        >
          <Text style={styles.cardTitle}>{module.title}</Text>
          <Text style={styles.cardDescription}>{module.description}</Text>
        </TouchableOpacity>
      ))}
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Volver al Inicio</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    color: '#f4511e',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
  backButton: {
    marginTop: 10,
    padding: 15,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#f4511e',
    fontWeight: '600',
  },
});

export default SessionScreen;
