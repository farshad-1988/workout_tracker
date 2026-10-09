import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import persian_fa from "react-date-object/locales/persian_fa";
import type { AppLocale } from "@/constants/types";
import type { Exercise } from "@/types/types";
import type { DateKeyReviewEntry } from "@/shared/contexts/exerciseContext/types/type";

/**
 * Workout days are stored as Gregorian `YYYY-MM-DD`.
 * Shamsi and Gregorian screens convert to and from that key.
 * A legacy key is rewritten only when its original calendar is known.
 */

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const DATE_KEY = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Gregorian years a selectable Shamsi date cannot use (Shamsi year 1700 is about 2321 CE). */
const GREGORIAN_ONLY_MIN_YEAR = 1700;
const GREGORIAN_ONLY_MAX_YEAR = 2500;
/** ASCII Shamsi-only dates above this year are not rewritten. Shamsi year 1600 is about 2221 CE. */
const JALALI_ASCII_MAX_YEAR = 1600;

type DailyGoal = { duration: number; colories: number };

export type StoredDateKeyClassification =
  | { kind: "gregorian"; canonicalKey: string }
  | { kind: "jalali"; canonicalKey: string }
  | { kind: "ambiguous"; sourceKey: string }
  | { kind: "invalid"; sourceKey: string };

export type MigratedDateMaps = {
  exercisesByDate: Record<string, Exercise[]>;
  dailyGoalByDate: Record<string, DailyGoal>;
  dateKeyReview: DateKeyReviewEntry[];
};

function toAsciiDigits(value: string): string {
  return value.replace(/[۰-۹]/g, (digit) => String(PERSIAN_DIGITS.indexOf(digit)));
}

function parseCalendarDate(
  asciiKey: string,
  calendar: typeof gregorian | typeof persian,
): DateObject | null {
  const parsed = new DateObject({
    date: asciiKey,
    format: "YYYY-MM-DD",
    calendar,
    locale: gregorian_en,
  });
  if (!parsed.isValid || parsed.format("YYYY-MM-DD") !== asciiKey) return null;
  return parsed;
}

function jalaliDateToCanonical(parsed: DateObject): string {
  return new DateObject(parsed).convert(gregorian, gregorian_en).format("YYYY-MM-DD");
}

export function classifyStoredDateKey(raw: string): StoredDateKeyClassification {
  if (typeof raw !== "string") {
    return { kind: "invalid", sourceKey: String(raw) };
  }

  const hasPersianDigits = /[۰-۹]/.test(raw);
  const ascii = toAsciiDigits(raw.trim());
  const match = DATE_KEY.exec(ascii);
  if (!match) return { kind: "invalid", sourceKey: raw };

  const year = Number(match[1]);
  const asJalali = parseCalendarDate(ascii, persian);
  const asGregorian = parseCalendarDate(ascii, gregorian);

  if (hasPersianDigits) {
    if (!asJalali) return { kind: "invalid", sourceKey: raw };
    return { kind: "jalali", canonicalKey: jalaliDateToCanonical(asJalali) };
  }

  if (asGregorian && !asJalali) {
    return { kind: "gregorian", canonicalKey: ascii };
  }

  if (asJalali && !asGregorian) {
    if (year > JALALI_ASCII_MAX_YEAR) return { kind: "invalid", sourceKey: raw };
    return { kind: "jalali", canonicalKey: jalaliDateToCanonical(asJalali) };
  }

  if (asGregorian && asJalali) {
    if (year >= GREGORIAN_ONLY_MIN_YEAR && year <= GREGORIAN_ONLY_MAX_YEAR) {
      return { kind: "gregorian", canonicalKey: ascii };
    }
    return { kind: "ambiguous", sourceKey: raw };
  }

  return { kind: "invalid", sourceKey: raw };
}

export function isCanonicalDateKey(key: string): boolean {
  const classified = classifyStoredDateKey(key);
  return classified.kind === "gregorian" && classified.canonicalKey === key;
}

/** Gregorian storage key when the source calendar is known. */
export function resolveStoredDateKey(raw: string): string | null {
  const classified = classifyStoredDateKey(raw);
  if (classified.kind === "gregorian" || classified.kind === "jalali") {
    return classified.canonicalKey;
  }
  return null;
}

function formatParts(year: number, month: number, day: number): string {
  const y = String(year).padStart(4, "0");
  const m = String(month).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Gregorian storage key for a civil day.
 * Date objects use local calendar fields, not `toISOString`, so a local midnight
 * cannot move to the previous or next UTC day.
 * DateObject values are rebuilt from their calendar year/month/day, ignoring the clock time.
 */
export function toCanonicalDateKey(input: Date | DateObject): string {
  if (input instanceof Date) {
    return formatParts(input.getFullYear(), input.getMonth() + 1, input.getDate());
  }

  const year = input.year;
  const month = input.month?.number;
  const day = input.day;
  if (typeof year !== "number" || typeof month !== "number" || typeof day !== "number") {
    return "";
  }

  const rebuilt = new DateObject({
    calendar: input.calendar,
    locale: gregorian_en,
    year,
    month,
    day,
  });
  if (!rebuilt.isValid) return "";
  const formatted = rebuilt.convert(gregorian, gregorian_en).format("YYYY-MM-DD");
  return DATE_KEY.test(formatted) ? formatted : "";
}

export function todayCanonical(now: Date = new Date()): string {
  return toCanonicalDateKey(now);
}

export function addCalendarDays(canonicalKey: string, amount: number): string | null {
  if (!isCanonicalDateKey(canonicalKey)) return null;
  const parsed = parseCalendarDate(canonicalKey, gregorian);
  if (!parsed) return null;
  parsed.add(amount, "day");
  const next = parsed.format("YYYY-MM-DD");
  return isCanonicalDateKey(next) ? next : null;
}

function utcDayNumber(canonicalKey: string): number | null {
  const parsed = parseCalendarDate(canonicalKey, gregorian);
  if (!parsed) return null;
  return Math.floor(Date.UTC(parsed.year, parsed.month.index, parsed.day) / 86_400_000);
}

/** Whole civil days from `fromKey` to `toKey`, using UTC date parts so DST cannot shift the count. */
export function differenceInCalendarDays(fromKey: string, toKey: string): number | null {
  const from = utcDayNumber(fromKey);
  const to = utcDayNumber(toKey);
  if (from === null || to === null) return null;
  return to - from;
}

export function calculateDaysFrom(
  selectedDate: string | undefined,
  today: Date = new Date(),
): number {
  if (!selectedDate) return 1;
  const span = differenceInCalendarDays(selectedDate, todayCanonical(today));
  if (span === null) return 1;
  return span + 1;
}

export function canonicalToDateObject(
  canonicalKey: string,
  locale: AppLocale,
): DateObject | null {
  if (!isCanonicalDateKey(canonicalKey)) return null;
  const parsed = parseCalendarDate(canonicalKey, gregorian);
  if (!parsed) return null;
  if (locale === "fa") parsed.convert(persian, persian_fa);
  return parsed;
}

export function calendarValueFromRoute(
  raw: string,
  locale: AppLocale,
): DateObject | undefined {
  const canonical = resolveStoredDateKey(raw);
  if (!canonical) return undefined;
  return canonicalToDateObject(canonical, locale) ?? undefined;
}

export function formatCanonicalDate(
  dateKey: string,
  locale: AppLocale,
  pattern: string,
): string | null {
  const canonical = resolveStoredDateKey(dateKey);
  if (!canonical) return null;
  const date = canonicalToDateObject(canonical, locale);
  if (!date) return null;
  return date.format(pattern);
}

/** ASCII `YYYY-MM-DD` in the calendar used for display. Not a storage key. */
export function formatCalendarDateKey(dateKey: string, locale: AppLocale): string | null {
  const canonical = resolveStoredDateKey(dateKey);
  if (!canonical) return null;
  const date = canonicalToDateObject(canonical, locale);
  if (!date) return null;
  const copy = new DateObject(date);
  copy.setLocale(gregorian_en);
  return copy.format("YYYY-MM-DD");
}

function reviewIdentity(entry: DateKeyReviewEntry): string {
  return [
    entry.reason,
    entry.sourceKey,
    entry.canonicalKey ?? "",
    entry.exercise?.id ?? "",
    entry.goal ? `${entry.goal.duration}:${entry.goal.colories}` : "",
  ].join("|");
}

function comparableRecord(value: unknown): string {
  return JSON.stringify(normalizeRecord(value));
}

function normalizeRecord(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(normalizeRecord);
  if (!value || typeof value !== "object") return value;
  return Object.keys(value as Record<string, unknown>)
    .sort()
    .reduce<Record<string, unknown>>((acc, key) => {
      if (key === "date") return acc;
      acc[key] = normalizeRecord((value as Record<string, unknown>)[key]);
      return acc;
    }, {});
}

function isGoal(value: unknown): value is DailyGoal {
  if (!value || typeof value !== "object") return false;
  const goal = value as DailyGoal;
  return typeof goal.duration === "number" && typeof goal.colories === "number";
}

function sameGoal(a: DailyGoal, b: DailyGoal): boolean {
  return a.duration === b.duration && a.colories === b.colories;
}

export function migratePersistedDates(raw: {
  exercisesByDate?: Record<string, Exercise[]>;
  dailyGoalByDate?: Record<string, DailyGoal>;
  dateKeyReview?: DateKeyReviewEntry[];
}): MigratedDateMaps {
  const exercisesIn = raw.exercisesByDate ?? {};
  const goalsIn = raw.dailyGoalByDate ?? {};
  const review: DateKeyReviewEntry[] = [...(raw.dateKeyReview ?? [])];
  const seen = new Set(review.map(reviewIdentity));

  const addReview = (entry: DateKeyReviewEntry) => {
    const identity = reviewIdentity(entry);
    if (seen.has(identity)) return;
    seen.add(identity);
    review.push(entry);
  };

  const exercisesOut = new Map<string, Exercise[]>();
  const goalsOut = new Map<string, DailyGoal>();
  const keys = new Set([...Object.keys(exercisesIn), ...Object.keys(goalsIn)]);

  const gregorianKeys: string[] = [];
  const jalaliKeys: string[] = [];
  const unresolvedKeys: string[] = [];

  for (const key of keys) {
    const classified = classifyStoredDateKey(key);
    if (classified.kind === "gregorian") gregorianKeys.push(key);
    else if (classified.kind === "jalali") jalaliKeys.push(key);
    else unresolvedKeys.push(key);
  }

  const placeExercises = (sourceKey: string, targetKey: string) => {
    if (!Object.prototype.hasOwnProperty.call(exercisesIn, sourceKey)) return;
    const list = exercisesIn[sourceKey];
    if (!Array.isArray(list)) {
      addReview({ sourceKey, reason: "invalid-date" });
      return;
    }

    const merged = [...(exercisesOut.get(targetKey) ?? [])];
    for (const exercise of list) {
      if (!exercise || typeof exercise !== "object") {
        addReview({ sourceKey, reason: "invalid-date", canonicalKey: targetKey });
        continue;
      }
      const aligned = { ...exercise, date: targetKey };
      const existingIndex = exercise.id
        ? merged.findIndex((item) => item.id === exercise.id)
        : -1;
      if (existingIndex === -1) {
        merged.push(aligned);
        continue;
      }
      if (comparableRecord(merged[existingIndex]) !== comparableRecord(exercise)) {
        addReview({
          sourceKey,
          reason: "exercise-conflict",
          canonicalKey: targetKey,
          exercise,
        });
      }
    }
    exercisesOut.set(targetKey, merged);
  };

  const placeGoal = (sourceKey: string, targetKey: string) => {
    if (!Object.prototype.hasOwnProperty.call(goalsIn, sourceKey)) return;
    const goal = goalsIn[sourceKey];
    if (!isGoal(goal)) {
      addReview({ sourceKey, reason: "invalid-date", canonicalKey: targetKey });
      return;
    }
    const existing = goalsOut.get(targetKey);
    if (!existing) {
      goalsOut.set(targetKey, { duration: goal.duration, colories: goal.colories });
      return;
    }
    if (!sameGoal(existing, goal)) {
      addReview({
        sourceKey,
        reason: "goal-conflict",
        canonicalKey: targetKey,
        goal: { duration: goal.duration, colories: goal.colories },
      });
    }
  };

  for (const key of gregorianKeys) {
    const canonical = resolveStoredDateKey(key) ?? key;
    placeExercises(key, canonical);
    placeGoal(key, canonical);
  }

  for (const key of jalaliKeys) {
    const canonical = resolveStoredDateKey(key);
    if (!canonical) {
      unresolvedKeys.push(key);
      continue;
    }
    placeExercises(key, canonical);
    placeGoal(key, canonical);
  }

  for (const key of unresolvedKeys) {
    const classified = classifyStoredDateKey(key);
    placeExercises(key, key);
    placeGoal(key, key);
    addReview({
      sourceKey: key,
      reason: classified.kind === "ambiguous" ? "ambiguous-calendar" : "invalid-date",
    });
  }

  return {
    exercisesByDate: Object.fromEntries(exercisesOut),
    dailyGoalByDate: Object.fromEntries(goalsOut),
    dateKeyReview: review,
  };
}
