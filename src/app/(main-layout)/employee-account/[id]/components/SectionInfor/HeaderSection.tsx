import Image from "next/image";
import {Employment} from "@/types/employment";

export default function HeaderSection({ employee }: { employee: Employment }) {
  return (
    <div className="flex items-start gap-6">
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
          {employee.avatar ? (
            <Image
              src={employee.avatar}
              alt={employee.fullName}
              width={60}
              height={60}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xl font-bold text-gray-600">
              {employee.fullName}
            </span>
          )}
        </div>
      </div>
      <div className="flex-1">
        <h1 className="text-xl font-bold text-gray-900 mb-2">
          {employee.fullName}
        </h1>
        <div className="flex flex-wrap gap-2">
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-[0.5rem] font-medium">
            {employee.position}
          </span>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[0.5rem] font-medium">
            {employee.department}
          </span>

        </div>
      </div>
    </div>
  );
}
