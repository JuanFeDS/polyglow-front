import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { setDailyPlan, confirmDailyPlan, getDailyPlan, subscribe, DailyPlan } from '@/state/planStore';
import { styles } from './PlanSetupModal.styles';

export type Props = {
  visible: boolean;
  onClose?: () => void;
  onConfirmed?: () => void;
};

export default function PlanSetupModal({ visible, onClose, onConfirmed }: Props) {
  const existing = getDailyPlan();
  const [minutes, setMinutes] = useState<string>(existing ? String(existing.totalMinutes) : '20');
  const [error, setError] = useState<string>('');
  const [plan, setPlan] = useState<DailyPlan | null>(existing);

  useEffect(() => {
    if (!visible) return;
    setError('');
    const current = getDailyPlan();
    setMinutes(current ? String(current.totalMinutes) : '20');
  }, [visible]);

  useEffect(() => {
    const unsub = subscribe(setPlan);
    return unsub;
  }, []);

  const handleGenerate = () => {
    const m = parseInt(minutes, 10);
    if (Number.isNaN(m) || m < 5) {
      setError('Ingresa al menos 5 minutos.');
      return;
    }
    // Distribución exacta con Largest Remainder Method (40/40/20)
    const weights = [0.4, 0.4, 0.2];
    const ids = ['vocab', 'quick', 'streak'] as const;
    const titles = ['Vocabulario', 'Práctica rápida', 'Repaso de racha'];

    const raw = weights.map((w) => m * w);
    const base = raw.map(Math.floor);
    const used = base.reduce((a, b) => a + b, 0);
    let rest = m - used;
    const fracs = raw.map((v, i) => ({ i, frac: v - base[i] })).sort((a, b) => b.frac - a.frac);
    for (let k = 0; k < rest; k++) base[fracs[k % fracs.length].i] += 1;

    let items = base.map((min, idx) => ({ id: ids[idx], title: titles[idx], minutes: min }));
    const smallIdxs = items.map((b, i) => ({ i, min: b.minutes })).filter(x => x.min > 0 && x.min < 5).map(x => x.i);
    if (smallIdxs.length) {
      const largestIdx = items.reduce((maxIdx, b, i, arr) => (b.minutes > arr[maxIdx].minutes ? i : maxIdx), 0);
      let added = 0;
      smallIdxs.forEach(i => { added += items[i].minutes; items[i].minutes = 0; });
      items[largestIdx].minutes += added;
    }

    let blocks = items.filter(b => b.minutes > 0);
    if (m >= 10 && blocks.length === 1) {
      const half = Math.floor(blocks[0].minutes / 2);
      const first = blocks[0];
      blocks[0] = { ...first, minutes: first.minutes - half };
      const secondId = first.id === 'quick' ? 'vocab' : 'quick';
      const secondTitle = secondId === 'quick' ? 'Práctica rápida' : 'Vocabulario';
      blocks.push({ id: secondId, title: secondTitle, minutes: half });
    }

    setDailyPlan({ totalMinutes: m, blocks, generatedAt: Date.now() });
  };

  const handleConfirm = () => {
    confirmDailyPlan();
    onConfirmed && onConfirmed();
    onClose && onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Define tu plan de hoy</Text>
          <Text style={styles.subtitle}>¿Cuántos minutos tienes hoy?</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={minutes}
            onChangeText={setMinutes}
            maxLength={3}
            placeholder="20"
          />
          {!!error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity style={styles.primary} onPress={handleGenerate}>
            <Text style={styles.primaryText}>Generar plan</Text>
          </TouchableOpacity>

          {plan && plan.blocks?.length > 0 && (
            <View style={styles.previewBox}>
              <Text style={styles.previewTitle}>Previsualización</Text>
              <FlatList
                data={plan.blocks}
                keyExtractor={(b) => b.id}
                renderItem={({ item }) => (
                  <View style={styles.blockRow}>
                    <Text style={styles.blockTitle}>{item.title}</Text>
                    <Text style={styles.blockMinutes}>{item.minutes} min</Text>
                  </View>
                )}
              />
            </View>
          )}

          <TouchableOpacity
            style={[styles.primary, styles.confirm, !plan ? styles.disabled : null]}
            onPress={handleConfirm}
            disabled={!plan}
          >
            <Text style={styles.primaryText}>Confirmar plan</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkBtn} onPress={onClose}>
            <Text style={styles.link}>Más tarde</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
