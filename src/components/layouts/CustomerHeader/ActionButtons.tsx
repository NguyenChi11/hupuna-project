import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faBell,
  faRocket,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "@/components/ui/_base/IconButton";
import { Button } from "@/components/ui/_base/Button";

interface ActionButtonsProps {
  onMessageClick: () => void;
  onNotificationClick: () => void;
  onGetflyClick: () => void;
}

export function ActionButtons({
  onMessageClick,
  onNotificationClick,
  onGetflyClick,
}: ActionButtonsProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 justify-end">
        <IconButton
          icon={faCommentDots}
          title="Tin nhắn"
          onClick={onMessageClick}
        />
        <IconButton
          icon={faBell}
          title="Thông báo"
          badge
          onClick={onNotificationClick}
        />
        <IconButton
          icon={faRocket}
          title="Getfly CRM"
          onClick={onGetflyClick}
        />
      </div>

      <Button
        variant="primary"
        onClick={() => (window.location.href = "/customers/add?callback=true")}
      >
        <FontAwesomeIcon icon={faPlus} className="h-5 w-5" />
        <span className="shrink-0">Thêm khách hàng</span>
      </Button>
    </div>
  );
}
