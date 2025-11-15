import { User } from "lucide-react";

export default function ResponsiblePerson({
  consultant,
}: {
  consultant: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <User className="w-4 h-4" />
      <span>Phụ trách:</span>
      <span className="font-medium text-gray-900">{consultant}</span>
    </div>
  );
}
