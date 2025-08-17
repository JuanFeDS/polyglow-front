import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getDailyPlan, subscribe, DailyPlan, updateBlockStatus } from '@/state/planStore';
import { styles } from './PlanIndicator.styles';

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

  const cycleStatus = (current: 'to_do' | 'in_progress' | 'done' | undefined) => {
    if (current === 'to_do' || current === undefined) return 'in_progress' as const;
    if (current === 'in_progress') return 'done' as const;
    return 'to_do' as const;
  };

  const onChipPress = (id: string, status: 'to_do' | 'in_progress' | 'done' | undefined) => {
    const next = cycleStatus(status);
    updateBlockStatus(id, next);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
        <View style={styles.row}>
          <Text style={styles.title}>Plan de hoy</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{total}m</Text>
          </View>
        </View>
        <View style={styles.chipsRow}>
          {plan.blocks.map((b) => (
            <TouchableOpacity
              key={b.id}
              onPress={() => onChipPress(b.id, b.status)}
              style={[
                styles.chip,
                b.status === 'to_do' && styles.chipTodo,
                b.status === 'in_progress' && styles.chipInProgress,
                b.status === 'done' && styles.chipDone,
              ]}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.chipText,
                b.status === 'done' && styles.chipTextDone,
              ]}>
                {b.title} {b.minutes}m
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.progressContainer}>
          {(() => {
            const doneMinutes = plan.blocks.filter(b => b.status === 'done').reduce((s, b) => s + b.minutes, 0);
            const inProgressHalf = plan.blocks
              .filter(b => b.status === 'in_progress')
              .reduce((s, b) => s + b.minutes * 0.5, 0);
            const weighted = doneMinutes + inProgressHalf;
            const pct = total > 0 ? Math.min(100, Math.round((weighted / total) * 100)) : 0;
            return (
              <>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: `${pct}%` }]} />
                </View>
                <Text style={styles.progressText}>{pct}%</Text>
              </>
            );
          })()}
        </View>
      </TouchableOpacity>
    </View>
  );
};

 

export default PlanIndicator;
