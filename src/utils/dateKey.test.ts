import { describe, expect, it } from "vitest";
import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import type { Exercise } from "@/types/types";
import reducer from "@/shared/contexts/exerciseContext/reducer/ExerciseReducer";
import { daysWithWorkout } from "@/shared/contexts/exerciseContext/selectors/exerciseStates";
import type { State } from "@/shared/contexts/exerciseContext/types/type";
import {
  deserialize,
  serialize,
} from "@/shared/contexts/exerciseContext/utils/serializeHelper";
import {
  getMonthSeries,
  getWeekDateKeys,
  getYearMonthSeries,
  sumCaloriesForDate,
} from "@/features/workoutChart/utils/periodAggregation";
import { getDayLabel } from "@/utils/getDayLabel";
import {
  addCalendarDays,
  calculateDaysFrom,
  classifyStoredDateKey,
  differenceInCalendarDays,
  formatCalendarDateKey,
  isCanonicalDateKey,
  resolveStoredDateKey,
  toCanonicalDateKey,
  todayCanonical,
} from "@/utils/dateKey";

const bio = { today: "Today", yesterday: "Yesterday" };
const bioFa = { today: "امروز", yesterday: "دیروز" };

function calendarDate(
  year: number,
  month: number,
  day: number,
  locale: "fa" | "en",
  hour = 12,
) {
  return new DateObject({
    calendar: locale === "fa" ? persian : gregorian,
    locale: gregorian_en,
    year,
    month,
    day,
    hour,
  });
}

function workout(
  overrides: Partial<Exercise> & Pick<Exercise, "id" | "date">,
): Exercise {
  return {
    exerciseName: "Squat",
    exerciseType: "Strength",
    duration: 30,
    caloriesBurned: 200,
    ...overrides,
  };
}

function emptyState(): State {
  return {
    exercisesByDate: new Map(),
    dailyGoalByDate: new Map(),
    exerciseTypes: [],
    dateKeyReview: [],
  };
}

describe("canonical date identity", () => {
  it("maps Shamsi and Gregorian selections of the same day to one key", () => {
    const fromShamsi = toCanonicalDateKey(calendarDate(1405, 7, 17, "fa"));
    const fromGregorian = toCanonicalDateKey(calendarDate(2026, 10, 9, "en"));

    expect(fromShamsi).toBe("2026-10-09");
    expect(fromGregorian).toBe(fromShamsi);
    expect(formatCalendarDateKey(fromShamsi, "fa")).toBe("1405-07-17");
    expect(formatCalendarDateKey(fromShamsi, "en")).toBe("2026-10-09");
  });

  it("keeps the same workouts when the calendar changes and does not duplicate them", () => {
    const shamsiKey = toCanonicalDateKey(calendarDate(1405, 7, 17, "fa"));
    let state = reducer(emptyState(), {
      type: "ADD_EXERCISE",
      dateKey: shamsiKey,
      exercise: workout({
        id: "squat",
        date: "۱۴۰۵-۰۷-۱۷",
        exerciseName: "Squat",
        duration: 40,
        caloriesBurned: 250,
      }),
    });

    expect(shamsiKey).toBe("2026-10-09");
    expect(state.exercisesByDate.get("2026-10-09")).toEqual([
      expect.objectContaining({
        id: "squat",
        date: "2026-10-09",
        exerciseName: "Squat",
        duration: 40,
        caloriesBurned: 250,
      }),
    ]);
    expect(state.exercisesByDate.size).toBe(1);

    const gregorianKey = toCanonicalDateKey(calendarDate(2026, 10, 10, "en"));
    state = reducer(state, {
      type: "ADD_EXERCISE",
      dateKey: gregorianKey,
      exercise: workout({ id: "run", date: gregorianKey, exerciseName: "Run" }),
    });

    expect(gregorianKey).toBe("2026-10-10");
    expect(formatCalendarDateKey(gregorianKey, "fa")).toBe("1405-07-18");
    expect(state.exercisesByDate.get("2026-10-10")?.[0].id).toBe("run");

    const snapshot = serialize(state);
    for (const locale of ["en", "fa", "en", "fa", "en"] as const) {
      expect(formatCalendarDateKey("2026-10-09", locale)).toBe(
        locale === "fa" ? "1405-07-17" : "2026-10-09",
      );
      expect(formatCalendarDateKey("2026-10-10", locale)).toBe(
        locale === "fa" ? "1405-07-18" : "2026-10-10",
      );
      expect(serialize(state)).toEqual(snapshot);
      expect(state.exercisesByDate.get("2026-10-09")).toHaveLength(1);
      expect(state.exercisesByDate.get("2026-10-10")).toHaveLength(1);
    }
  });

  it("edits and deletes the same record from either calendar", () => {
    const key = toCanonicalDateKey(calendarDate(1405, 7, 17, "fa"));
    let state = reducer(emptyState(), {
      type: "ADD_EXERCISE",
      dateKey: key,
      exercise: workout({ id: "squat", date: key, duration: 10 }),
    });

    state = reducer(state, {
      type: "UPDATE_EXERCISE",
      dateKey: key,
      id: "squat",
      patch: { duration: 55, date: "۱۴۰۵-۰۷-۱۷" },
    });

    const edited = state.exercisesByDate.get(key)?.[0];
    expect(edited).toMatchObject({ id: "squat", duration: 55, date: key });
    expect(state.exercisesByDate.get("۱۴۰۵-۰۷-۱۷")).toBeUndefined();
    expect(toCanonicalDateKey(calendarDate(2026, 10, 9, "en"))).toBe(key);

    state = reducer(state, {
      type: "REMOVE_EXERCISE",
      dateKey: toCanonicalDateKey(calendarDate(2026, 10, 9, "en")),
      id: "squat",
    });
    expect(state.exercisesByDate.get(key)).toEqual([]);
  });
});

describe("calendar boundaries", () => {
  it("converts Persian New Year, leap days, and year edges", () => {
    expect(toCanonicalDateKey(calendarDate(1404, 1, 1, "fa"))).toBe("2025-03-21");
    expect(toCanonicalDateKey(calendarDate(1405, 1, 1, "fa"))).toBe("2026-03-21");
    expect(toCanonicalDateKey(calendarDate(1403, 12, 30, "fa"))).toBe("2025-03-20");
    expect(toCanonicalDateKey(calendarDate(1404, 12, 29, "fa"))).toBe("2026-03-20");
    expect(formatCalendarDateKey("2024-02-29", "en")).toBe("2024-02-29");
    expect(resolveStoredDateKey("2024-02-29")).toBe("2024-02-29");
    expect(addCalendarDays("2024-02-28", 1)).toBe("2024-02-29");
    expect(addCalendarDays("2025-02-28", 1)).toBe("2025-03-01");
    expect(addCalendarDays("2025-12-31", 1)).toBe("2026-01-01");
    expect(addCalendarDays("2026-03-20", 1)).toBe("2026-03-21");
    expect(differenceInCalendarDays("2024-02-28", "2024-03-01")).toBe(2);
    expect(differenceInCalendarDays("2025-02-28", "2025-03-01")).toBe(1);
  });

  it("uses the local civil day around midnight instead of the UTC date", () => {
    expect(toCanonicalDateKey(calendarDate(1405, 7, 17, "fa", 0))).toBe("2026-10-09");
    expect(toCanonicalDateKey(calendarDate(1405, 7, 17, "fa", 23))).toBe("2026-10-09");
    expect(toCanonicalDateKey(new Date(2026, 9, 9, 23, 59))).toBe("2026-10-09");
    expect(toCanonicalDateKey(new Date(2026, 9, 10, 0, 1))).toBe("2026-10-10");

    expect(calculateDaysFrom("2026-10-09", new Date(2026, 9, 9, 23, 59))).toBe(1);
    expect(calculateDaysFrom("2026-10-09", new Date(2026, 9, 10, 0, 1))).toBe(2);

    const justAfterLocalMidnight = new Date(2026, 9, 10, 0, 30);
    const utcDay = justAfterLocalMidnight.toISOString().slice(0, 10);
    expect(toCanonicalDateKey(justAfterLocalMidnight)).toBe("2026-10-10");
    if (justAfterLocalMidnight.getTimezoneOffset() < 0) {
      expect(utcDay).toBe("2026-10-09");
    }

    const lateEvening = new Date(2026, 9, 9, 23, 30);
    if (lateEvening.getTimezoneOffset() > 0) {
      expect(lateEvening.toISOString().slice(0, 10)).toBe("2026-10-10");
      expect(toCanonicalDateKey(lateEvening)).toBe("2026-10-09");
    }
  });

  it("labels the same stored day in both calendars", () => {
    expect(getDayLabel(todayCanonical(), "en", bio)).toBe("Today");
    expect(getDayLabel(todayCanonical(), "fa", bioFa)).toBe("امروز");
    expect(getDayLabel(addCalendarDays(todayCanonical(), -1) ?? "", "fa", bioFa)).toBe(
      "دیروز",
    );
    expect(getDayLabel("2026-10-01", "en", bio)).toBe("Thursday, October 1, 2026");
    expect(getDayLabel("2026-10-01", "fa", bioFa)).toContain("مهر");
    expect(formatCalendarDateKey("2026-10-01", "fa")).toBe("1405-07-09");
    expect(getDayLabel("1400-01-01", "en", bio)).toBe("1400-01-01");
  });
});

describe("month and year views", () => {
  it("looks up one Gregorian key from both monthly calendars", () => {
    const state: State = {
      ...emptyState(),
      exercisesByDate: new Map([
        ["2026-10-09", [workout({ id: "squat", date: "2026-10-09", caloriesBurned: 123 })]],
      ]),
    };

    const gregorianMonth = getMonthSeries(calendarDate(2026, 10, 9, "en"), "en");
    const shamsiMonth = getMonthSeries(calendarDate(1405, 7, 17, "fa"), "fa");

    expect(gregorianMonth.dateKeys[0]).toBe("2026-10-01");
    expect(gregorianMonth.dateKeys.at(-1)).toBe("2026-10-31");
    expect(gregorianMonth.dateKeys).toHaveLength(31);
    expect(shamsiMonth.dateKeys[0]).toBe("2026-09-23");
    expect(shamsiMonth.dateKeys.at(-1)).toBe("2026-10-22");
    expect(shamsiMonth.dateKeys).toHaveLength(30);
    expect(gregorianMonth.dateKeys).toContain("2026-10-09");
    expect(shamsiMonth.dateKeys).toContain("2026-10-09");
    expect(sumCaloriesForDate(state, "2026-10-09")).toBe(123);

    for (const key of shamsiMonth.dateKeys) {
      expect(isCanonicalDateKey(key)).toBe(true);
      expect(formatCalendarDateKey(key, "fa")).toMatch(/^1405-07-/);
    }

    const today = calendarDate(2026, 10, 9, "en");
    expect(getYearMonthSeries(2026, state, today, "en").values[9]).toBe(123);
    expect(getYearMonthSeries(1405, state, calendarDate(1405, 7, 17, "fa"), "fa").values[6]).toBe(
      123,
    );
  });

  it("covers leap months and the Persian and Gregorian new year", () => {
    const farvardin = getMonthSeries(calendarDate(1405, 1, 10, "fa"), "fa");
    expect(farvardin.dateKeys[0]).toBe("2026-03-21");
    expect(farvardin.dateKeys.at(-1)).toBe("2026-04-20");
    expect(farvardin.dateKeys).toHaveLength(31);

    const leapEsfand = getMonthSeries(calendarDate(1403, 12, 1, "fa"), "fa");
    expect(leapEsfand.dateKeys).toHaveLength(30);
    expect(leapEsfand.dateKeys.at(-1)).toBe("2025-03-20");

    const commonEsfand = getMonthSeries(calendarDate(1404, 12, 1, "fa"), "fa");
    expect(commonEsfand.dateKeys).toHaveLength(29);
    expect(commonEsfand.dateKeys.at(-1)).toBe("2026-03-20");

    const leapFebruary = getMonthSeries(calendarDate(2024, 2, 10, "en"), "en");
    expect(leapFebruary.dateKeys).toHaveLength(29);
    expect(leapFebruary.dateKeys).toContain("2024-02-29");

    const commonFebruary = getMonthSeries(calendarDate(2025, 2, 10, "en"), "en");
    expect(commonFebruary.dateKeys).toHaveLength(28);
    expect(commonFebruary.dateKeys).not.toContain("2025-02-29");

    const december = getMonthSeries(calendarDate(2025, 12, 31, "en"), "en");
    expect(december.dateKeys[0]).toBe("2025-12-01");
    expect(december.dateKeys.at(-1)).toBe("2025-12-31");
    const january = getMonthSeries(calendarDate(2026, 1, 1, "en"), "en");
    expect(january.dateKeys[0]).toBe("2026-01-01");
    expect(january.dateKeys.at(-1)).toBe("2026-01-31");

    const week = getWeekDateKeys(calendarDate(2026, 10, 5, "en"), "fa");
    expect(week).toHaveLength(7);
    expect(week.every((key) => isCanonicalDateKey(key))).toBe(true);
  });
});

describe("legacy date migration", () => {
  it("converts known Shamsi keys, keeps Gregorian keys, and flags the rest", () => {
    const shamsiWorkout = {
      ...workout({
        id: "a",
        date: "۱۴۰۵-۰۷-۱۷",
        exerciseName: "Bench",
        exerciseType: "Strength",
        duration: 40,
        caloriesBurned: 250,
      }),
      notes: "keep",
      completed: true,
      reps: 8,
      weight: 60,
    };
    const sameDayGregorian = workout({
      id: "b",
      date: "2026-10-09",
      exerciseName: "Row",
    });
    const ambiguous = workout({
      id: "c",
      date: "1400-01-01",
      exerciseName: "Legacy",
    });
    const invalid = workout({ id: "d", date: "not-a-date", exerciseName: "Broken" });
    const leapShamsi = workout({
      id: "e",
      date: "۱۴۰۳-۱۲-۳۰",
      exerciseName: "Leap",
    });

    const once = deserialize({
      exerciseType: ["Rowing"],
      exercisesByDate: {
        "۱۴۰۵-۰۷-۱۷": [shamsiWorkout],
        "2026-10-09": [sameDayGregorian],
        "1400-01-01": [ambiguous],
        "not-a-date": [invalid],
        "۱۴۰۳-۱۲-۳۰": [leapShamsi],
        "1404-02-31": [
          workout({ id: "f", date: "1404-02-31", exerciseName: "Ordibehesht" }),
        ],
        "1404-07-31": [workout({ id: "g", date: "1404-07-31", exerciseName: "July" })],
        "۱۴۰۴-۰۷-۳۱": [workout({ id: "h", date: "۱۴۰۴-۰۷-۳۱", exerciseName: "Bad shamsi" })],
      },
      dailyGoalByDate: {
        "۱۴۰۵-۰۷-۱۷": { duration: 30, colories: 100 },
        "2026-10-09": { duration: 45, colories: 300 },
        "۱۴۰۳-۱۲-۳۰": { duration: 20, colories: 80 },
        "1400-01-01": { duration: 15, colories: 50 },
      },
    });

    expect(once.exerciseTypes).toEqual(["Rowing"]);
    expect(once.exercisesByDate.get("2026-10-09")?.map((item) => item.id)).toEqual([
      "b",
      "a",
    ]);
    expect(once.exercisesByDate.get("2026-10-09")?.[1]).toMatchObject({
      id: "a",
      exerciseName: "Bench",
      exerciseType: "Strength",
      duration: 40,
      caloriesBurned: 250,
      date: "2026-10-09",
      notes: "keep",
      completed: true,
      reps: 8,
      weight: 60,
    });
    expect(once.exercisesByDate.get("2025-03-20")?.[0]).toMatchObject({
      id: "e",
      exerciseName: "Leap",
      date: "2025-03-20",
    });
    expect(once.exercisesByDate.get("2025-05-21")?.[0].id).toBe("f");
    expect(once.exercisesByDate.get("1404-07-31")?.[0]).toMatchObject({
      id: "g",
      date: "1404-07-31",
      exerciseName: "July",
    });
    expect(once.exercisesByDate.get("1400-01-01")?.[0]).toMatchObject({
      id: "c",
      date: "1400-01-01",
      exerciseName: "Legacy",
    });
    expect(once.exercisesByDate.get("not-a-date")?.[0].id).toBe("d");
    expect(once.exercisesByDate.get("۱۴۰۴-۰۷-۳۱")?.[0]).toMatchObject({
      id: "h",
      exerciseName: "Bad shamsi",
    });
    expect(once.exercisesByDate.has("۱۴۰۵-۰۷-۱۷")).toBe(false);
    expect(once.exercisesByDate.has("۱۴۰۳-۱۲-۳۰")).toBe(false);

    expect(once.dailyGoalByDate.get("2026-10-09")).toEqual({
      duration: 45,
      colories: 300,
    });
    expect(once.dailyGoalByDate.get("2025-03-20")).toEqual({
      duration: 20,
      colories: 80,
    });
    expect(once.dailyGoalByDate.get("1400-01-01")).toEqual({
      duration: 15,
      colories: 50,
    });
    expect(once.dateKeyReview).toEqual(
      expect.arrayContaining([
        {
          sourceKey: "۱۴۰۵-۰۷-۱۷",
          reason: "goal-conflict",
          canonicalKey: "2026-10-09",
          goal: { duration: 30, colories: 100 },
        },
        { sourceKey: "1400-01-01", reason: "ambiguous-calendar" },
        { sourceKey: "not-a-date", reason: "invalid-date" },
        { sourceKey: "۱۴۰۴-۰۷-۳۱", reason: "invalid-date" },
      ]),
    );
    expect(daysWithWorkout(once)).not.toContain("1400-01-01");
    expect(daysWithWorkout(once)).toContain("2026-10-09");

    const ids = [...once.exercisesByDate.values()].flat().map((item) => item.id);
    expect(ids).toHaveLength(8);
    expect(new Set(ids).size).toBe(8);

    const twice = deserialize(serialize(once));
    expect(serialize(twice)).toEqual(serialize(once));
    expect([...twice.exercisesByDate.values()].flat()).toHaveLength(8);
  });

  it("does not duplicate identical records or guess an ambiguous ASCII date", () => {
    expect(classifyStoredDateKey("1405-07-17").kind).toBe("ambiguous");
    expect(resolveStoredDateKey("1405-07-17")).toBeNull();
    expect(classifyStoredDateKey("۱۴۰۵-۰۷-۱۷").kind).toBe("jalali");
    expect(classifyStoredDateKey("2026-10-09").kind).toBe("gregorian");

    const record = workout({ id: "same", date: "۱۴۰۵-۰۷-۱۷", duration: 12 });
    const migrated = deserialize({
      exercisesByDate: {
        "2026-10-09": [{ ...record, date: "2026-10-09" }],
        "۱۴۰۵-۰۷-۱۷": [record],
      },
      dailyGoalByDate: {
        "2026-10-09": { duration: 10, colories: 10 },
        "۱۴۰۵-۰۷-۱۷": { duration: 10, colories: 10 },
      },
    });

    expect(migrated.exercisesByDate.get("2026-10-09")).toHaveLength(1);
    expect(migrated.dateKeyReview).toEqual([]);
    expect(serialize(deserialize(serialize(migrated)))).toEqual(serialize(migrated));
  });

  it("keeps a conflicting copy in the review list instead of dropping it", () => {
    const migrated = deserialize({
      exercisesByDate: {
        "2026-10-09": [workout({ id: "same", date: "2026-10-09", duration: 10 })],
        "۱۴۰۵-۰۷-۱۷": [workout({ id: "same", date: "۱۴۰۵-۰۷-۱۷", duration: 99 })],
      },
    });

    expect(migrated.exercisesByDate.get("2026-10-09")).toEqual([
      expect.objectContaining({ id: "same", duration: 10, date: "2026-10-09" }),
    ]);
    expect(migrated.dateKeyReview).toEqual([
      expect.objectContaining({
        sourceKey: "۱۴۰۵-۰۷-۱۷",
        reason: "exercise-conflict",
        canonicalKey: "2026-10-09",
        exercise: expect.objectContaining({ id: "same", duration: 99 }),
      }),
    ]);
    expect(serialize(deserialize(serialize(migrated)))).toEqual(serialize(migrated));
  });
});
