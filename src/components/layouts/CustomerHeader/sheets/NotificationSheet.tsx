import { Sheet } from "@/components/ui/_base/Sheet";

interface NotificationSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationSheet({ isOpen, onClose }: NotificationSheetProps) {
  return (
    <Sheet isOpen={isOpen} onClose={onClose} title="Thông báo hệ thống">
      <p className="text-sm text-gray-500">
        Cập nhật mới nhất, thông báo và nhắc nhở công việc.
      </p>
    </Sheet>
  );
}
