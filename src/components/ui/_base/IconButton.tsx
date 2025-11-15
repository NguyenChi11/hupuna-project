import { Button } from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface IconButtonProps {
  icon: IconDefinition;
  onClick: () => void;
  disabled?: boolean;
  "aria-label"?: string;
}

export function IconButton({
  icon,
  onClick,
  disabled,
  ...props
}: IconButtonProps) {
  return (
    <Button
      variant="secondary"
      onClick={onClick}
      disabled={disabled}
      aria-label={props["aria-label"]}
    >
      <FontAwesomeIcon icon={icon} className="h-4 w-4" />
    </Button>
  );
}
