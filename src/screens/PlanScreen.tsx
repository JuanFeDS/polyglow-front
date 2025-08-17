import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { styles } from './PlanScreen.styles';
import { setDailyPlan } from '@/state/planStore';

type Block = {
  id: string;
  title: string;
  minutes: number;
};

const MIN_MINUTES = 5;

const PlanScreen = () => {
  const [minutes, setMinutes] = useState<string>('20');
  const [plan, setPlan] = useState<Block[]>([]);

  const total = useMemo(() => {
    const n = parseInt(minutes, 10);
    return Number.isNaN(n) ? 0 : Math.max(0, n);
  }, [minutes]);

  const generatePlan = () => {
    const m = total;
    if (m < MIN_MINUTES) {
      setPlan([]);
      setDailyPlan(null);
      return;
    }

    // Lógica inicial sencilla: distribuir en 3 bloques base y adaptar proporciones
    // 40% vocabulario, 40% práctica rápida, 20% repaso. Asegurar mínimos de 5 min cuando sea posible.
    const vocab = Math.max(5, Math.floor(m * 0.4));
    const practice = Math.max(5, Math.floor(m * 0.4));
    let review = m - vocab - practice;

    // Ajustes si el total no cuadra o si m es pequeño
    if (review < 0) review = 0;

    const blocks: Block[] = [];
    if (vocab > 0) blocks.push({ id: 'vocab', title: 'Vocabulario', minutes: vocab });
    if (practice > 0) blocks.push({ id: 'quick', title: 'Práctica rápida', minutes: practice });

    // Si hay tiempo suficiente, incluir repaso; de lo contrario, redistribuir
    if (review >= 5) {
      blocks.push({ id: 'streak', title: 'Repaso de racha', minutes: review });
    } else if (review > 0) {
      // Suma los minutos residuales al bloque más corto
      const idx = blocks.reduce((minIdx, b, i, arr) => (b.minutes < arr[minIdx].minutes ? i : minIdx), 0);
      blocks[idx] = { ...blocks[idx], minutes: blocks[idx].minutes + review };
    }

    // En planes muy cortos (<10), asegurar al menos 2 bloques
    if (m < 10 && blocks.length === 1) {
      const half = Math.floor(blocks[0].minutes / 2);
      blocks[0].minutes = blocks[0].minutes - half;
      blocks.push({ id: 'quick-mini', title: 'Práctica rápida', minutes: half });
    }

    setPlan(blocks);
    setDailyPlan({ totalMinutes: m, blocks, generatedAt: Date.now() });
  };

  const renderItem = ({ item }: { item: Block }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardMinutes}>{item.minutes} min</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Plan del día</Text>
      <Text style={styles.subtitle}>¿Cuántos minutos tienes hoy?</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          value={minutes}
          onChangeText={setMinutes}
          maxLength={3}
          placeholder="20"
        />
        <TouchableOpacity style={styles.button} onPress={generatePlan}>
          <Text style={styles.buttonText}>Generar plan</Text>
        </TouchableOpacity>
      </View>

      {plan.length > 0 ? (
        <FlatList
          data={plan}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          scrollEnabled={false}
        />)
        : (
        <Text style={styles.helper}>
          Ingresa minutos y presiona "Generar plan" para ver tus bloques.
        </Text>
      )}
    </ScrollView>
  );
};

export default PlanScreen;
