import React from "react";
import WorkoutHeader from "./components/WorkoutHeader";
import EmptyWorkoutState from "./table/EmptyWorkoutState";
import WorkoutTable from "./table/components/WorkoutTable";
import { useDailyData } from "@/shared/contexts/exerciseContext/hooks/useDailyData";
import { useModifiedPickedDate } from "./hooks/useModifiedPickedDate";
import WorkoutComparison from "./comparisons/WorkoutComparison";
import { useWorkoutComparisons } from "./comparisons/hooks/useWorkoutComparisons";

const DailyWorkout: React.FC = () => {
  const dateKey = useModifiedPickedDate();
  const { exercises } = useDailyData(dateKey);
  const comparisons = useWorkoutComparisons(dateKey);
  return (
    <div className="bg-gray-50 p-4 sm:p-6 md:p-8 lg:p-12 my-10 sm:my-16 md:my-20 flex flex-col gap-4 w-full max-w-7xl mx-auto h-full">
      <WorkoutHeader />

      {!exercises.length ? (
        <EmptyWorkoutState />
      ) : (
        <>
          <WorkoutTable />
          <WorkoutComparison comparisons={comparisons} />
        </>
      )}
    </div>
  );
};

export default DailyWorkout;
