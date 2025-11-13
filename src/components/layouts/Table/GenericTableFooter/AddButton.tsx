import { Button } from "@/components/ui/_base/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface AddButtonProps {
  href: string;
  label: string;
}

export function AddButton({ href, label }: AddButtonProps) {
  return (
    <Button variant="primary" onClick={() => (window.location.href = href)}>
      <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
      {label}
    </Button>
  );
}
