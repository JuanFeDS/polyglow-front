import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { styles } from './PlanScreen.styles';
import { setDailyPlan, confirmDailyPlan } from '@/state/planStore';

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

    // Distribución exacta con Largest Remainder Method (40/40/20)
    const weights = [0.4, 0.4, 0.2];
    const ids = ['vocab', 'quick', 'streak'] as const;
    const titles = ['Vocabulario', 'Práctica rápida', 'Repaso de racha'];

    const raw = weights.map((w) => m * w);
    const base = raw.map(Math.floor);
    let used = base.reduce((a, b) => a + b, 0);
    let rest = m - used; // distribuir 1 min a los mayores residuales
    const fracs = raw.map((v, i) => ({ i, frac: v - base[i] }));
    fracs.sort((a, b) => b.frac - a.frac);
    for (let k = 0; k < rest; k++) base[fracs[k % fracs.length].i] += 1;

    // Construcción de bloques y fusión de bloques muy pequeños (<5)
    let items: Block[] = base.map((min, idx) => ({ id: ids[idx], title: titles[idx], minutes: min }));
    const smallIdxs = items.map((b, i) => ({ i, min: b.minutes })).filter(x => x.min > 0 && x.min < 5).map(x => x.i);
    if (smallIdxs.length) {
      // fusionar pequeños al bloque más grande
      const largestIdx = items.reduce((maxIdx, b, i, arr) => (b.minutes > arr[maxIdx].minutes ? i : maxIdx), 0);
      let added = 0;
      smallIdxs.forEach(i => { added += items[i].minutes; items[i].minutes = 0; });
      items[largestIdx].minutes += added;
    }

    // Filtrar cero
    let blocks: Block[] = items.filter(b => b.minutes > 0);

    // Para planes muy cortos, intenta mantener al menos 2 bloques cuando sea razonable
    if (m >= 10 && blocks.length === 1) {
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

      {plan.length > 0 && (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#1e88e5' }]}
          onPress={confirmDailyPlan}
        >
          <Text style={styles.buttonText}>Confirmar plan</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default PlanScreen;
