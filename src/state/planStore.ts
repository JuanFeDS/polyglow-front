// Lightweight in-memory store for the daily plan
// Keeps the latest generated plan and total minutes for reuse (e.g., timer widgets)

export type PlanBlock = {
  id: string;
  title: string;
  minutes: number;
  status?: 'to_do' | 'in_progress' | 'done';
};

export type DailyPlan = {
  totalMinutes: number;
  blocks: PlanBlock[];
  generatedAt: number; // epoch ms
  confirmed?: boolean;
};

let currentPlan: DailyPlan | null = null;

// Simple listeners for plan changes
const listeners = new Set<(plan: DailyPlan | null) => void>();

export function setDailyPlan(plan: DailyPlan | null) {
  if (!plan) {
    currentPlan = null;
  } else {
    // set default statuses: first in_progress, others to_do, preserve if provided
    const blocks = plan.blocks.map((b, idx) => ({
      ...b,
      status: b.status ?? (idx === 0 ? 'in_progress' : 'to_do'),
    }));
    currentPlan = { confirmed: false, ...plan, blocks };
  }
  listeners.forEach((cb) => cb(currentPlan));
}

export function getDailyPlan(): DailyPlan | null {
  return currentPlan;
}

export function subscribe(listener: (plan: DailyPlan | null) => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function confirmDailyPlan() {
  if (!currentPlan) return;
  currentPlan = { ...currentPlan, confirmed: true };
  listeners.forEach((cb) => cb(currentPlan));
}

export function updateBlockStatus(blockId: string, status: 'to_do' | 'in_progress' | 'done') {
  if (!currentPlan) return;
  const blocks = currentPlan.blocks.map((b) => (b.id === blockId ? { ...b, status } : b));
  currentPlan = { ...currentPlan, blocks };
  listeners.forEach((cb) => cb(currentPlan));
}
