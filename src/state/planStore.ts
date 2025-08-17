// Lightweight in-memory store for the daily plan
// Keeps the latest generated plan and total minutes for reuse (e.g., timer widgets)

export type PlanBlock = {
  id: string;
  title: string;
  minutes: number;
};

export type DailyPlan = {
  totalMinutes: number;
  blocks: PlanBlock[];
  generatedAt: number; // epoch ms
};

let currentPlan: DailyPlan | null = null;

// Simple listeners for plan changes
const listeners = new Set<(plan: DailyPlan | null) => void>();

export function setDailyPlan(plan: DailyPlan | null) {
  currentPlan = plan;
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
