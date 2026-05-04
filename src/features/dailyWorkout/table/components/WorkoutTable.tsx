// components/DailyWorkout/WorkoutTable.tsx
import React from "react";
import checkDay from "@/utils/checkDay";
import WorkoutTableRow from "./WorkoutTableRow";
import { useDailyData } from "@/shared/contexts/exerciseContext/hooks/useDailyData";

interface WorkoutTableProps {
  dateKey: string;
}

const WorkoutTable: React.FC<WorkoutTableProps> = ({ dateKey }) => {
  const { exercises } = useDailyData(dateKey);

  return (
    <div className="mx-auto flex flex-col gap-6 w-full">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            لیست تمرین‌های {checkDay(dateKey)}
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  نام تمرین
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  نوع
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  مدت زمان
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  کالری سوخته
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {exercises.map((exercise) => (
                <WorkoutTableRow exercise={exercise} dateKey={dateKey} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WorkoutTable;
