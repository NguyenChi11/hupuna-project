import { Sheet } from "@/components/ui/_base/Sheet";

interface MessageSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MessageSheet({ isOpen, onClose }: MessageSheetProps) {
  return (
    <Sheet isOpen={isOpen} onClose={onClose} title="Tin nhắn khách hàng">
      <p className="text-sm text-gray-500">Chưa có tin nhắn nào.</p>
    </Sheet>
  );
}
