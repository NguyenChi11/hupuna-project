"use client";
import React, { useEffect, useRef, useState } from "react";
import { QRCode, Modal, Tooltip } from "antd";
import Image from "next/image";

type QRProps = {
  value: string;
  isPrint?: boolean;
  size?: number;
};

export const QRBase = ({ value = "-", isPrint = false, size = 100 }: QRProps) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      if (canvas instanceof HTMLCanvasElement) {
        const dataUrl = canvas.toDataURL("image/png");
        setImgSrc(dataUrl);
      }
    }
  }, [isPrint, value]);

  const handleClick = () => {
    if (!isPrint) {
      setIsModalOpen(true);
    }
  };

  if (isPrint && imgSrc) {
    return <Image width={112} height={112} src={imgSrc} alt="QR code" className="w-28 h-28" />;
  }

  return (
    <>
      <div ref={qrRef} onClick={handleClick} className="cursor-pointer w-fit">
        <Tooltip title="Mã QR">
          <QRCode value={value} size={size} />
        </Tooltip>
      </div>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
      >
        <div className="flex justify-center items-center">
          {imgSrc && (
            <Image width={256} height={256} src={imgSrc} alt="QR enlarged" className="w-64 h-64" />
          )}
        </div>
      </Modal>
    </>
  );
};
