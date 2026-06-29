// src/utils/storageHelpers.ts
import type { Exercise } from "@/types/types";

export const safeParseExercises = (raw: string | null): Partial<Exercise>[] => {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Partial<Exercise>[]) : [];
  } catch {
    return [];
  }
};
