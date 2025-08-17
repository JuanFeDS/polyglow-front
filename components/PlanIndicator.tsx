import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getDailyPlan, subscribe, DailyPlan } from '@/state/planStore';

type Props = {
  onPress?: () => void;
};

const PlanIndicator: React.FC<Props> = ({ onPress }) => {
  const [plan, setPlan] = useState<DailyPlan | null>(getDailyPlan());

  useEffect(() => {
    const unsub = subscribe(setPlan);
    return unsub;
  }, []);

  if (!plan) return null;

  const total = plan.totalMinutes;
  const blocks = plan.blocks.map((b) => `${b.title.split(' ')[0]} ${b.minutes}m`).join(' · ');

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.wrapper}>
      <View style={styles.row}>
        <Text style={styles.title}>Plan de hoy</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{total}m</Text>
        </View>
      </View>
      <Text style={styles.subtitle} numberOfLines={1}>{blocks}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: '#fff3e0',
    borderColor: '#ffe0b2',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e65100',
  },
  badge: {
    backgroundColor: '#ff9800',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    color: '#fff',
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 6,
    color: '#7a5d3b',
  },
});

export default PlanIndicator;
