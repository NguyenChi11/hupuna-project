import Image from "next/image";
import { Customer } from "@/types/customers";

export default function HeaderSection({ customer }: { customer: Customer }) {
  return (
    <div className="flex items-start gap-6">
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
          {customer.avatarUrl ? (
            <Image
              src={customer.avatarUrl}
              alt={customer.name}
              width={60}
              height={60}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xl font-bold text-gray-600">
              {customer.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      </div>
      <div className="flex-1">
        <h1 className="text-xl font-bold text-gray-900 mb-2">
          {customer.name}
        </h1>
        <div className="flex flex-wrap gap-2">
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-[0.5rem] font-medium">
            {customer.customerSegment}
          </span>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[0.5rem] font-medium">
            {customer.productGroup}
          </span>
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-[0.5rem] font-medium">
            {customer.region}
          </span>
        </div>
      </div>
    </div>
  );
}
