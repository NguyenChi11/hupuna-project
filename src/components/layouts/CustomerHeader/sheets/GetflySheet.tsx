import { Button } from "@/components/ui/_base/Button";
import { Sheet } from "@/components/ui/_base/Sheet";

interface GetflySheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GetflySheet({ isOpen, onClose }: GetflySheetProps) {
  return (
    <Sheet isOpen={isOpen} onClose={onClose} title="Tích hợp Getfly CRM">
      <div className="p-6 pt-0">
        <p className="mb-4 text-sm text-gray-600">
          Kết nối dữ liệu khách hàng với hệ thống Getfly CRM.
        </p>
        <Button
          className="w-full"
          onClick={() => window.open("https://crm.getfly.vn", "_blank")}
        >
          Truy cập Getfly CRM
        </Button>
      </div>
    </Sheet>
  );
}
