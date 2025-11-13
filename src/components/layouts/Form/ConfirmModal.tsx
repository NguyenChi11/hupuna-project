"use client";

import { Modal } from "@/components/ui/_base/Modal";
import { Button } from "@/components/ui/_base/Button";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  entityName: string;
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = "Xác nhận",
  message,
  entityName,
}: ConfirmModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Xác nhận
          </Button>
        </>
      }
    >
      <p className="text-sm text-gray-600">
        {message} <strong>{entityName}</strong>?
      </p>
    </Modal>
  );
}
