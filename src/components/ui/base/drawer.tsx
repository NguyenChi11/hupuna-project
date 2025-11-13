"use client";

import React, { useEffect, useState } from "react";
import { ButtonBase } from "./button";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import IconArrowLeft from "@public/icons/arrow-left.svg";
import { Tooltip } from "antd";

type DrawerBaseProps = {
  button?: React.ReactNode; // Nút mặc định để mở
  title?: string | React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
  position?: "left" | "right";
  defaultOpen?: boolean;
  paramKey?: string; // tên param URL (vd: "editId")
  paramValue?: string; // giá trị param (vd: "123")
  btnExpand?: boolean;

  // Cho phép control từ cha
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const DrawerBase: React.FC<DrawerBaseProps> = ({
  button,
  title,
  children,
  footer,
  width = "w-96",
  position = "right",
  defaultOpen = false,
  paramKey,
  paramValue,
  btnExpand = false,
  open, // controlled
  onOpenChange, // controlled
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [widthDrawer, setWidthDrawer] = useState(false);

  // Nếu có prop `open` thì dùng, ngược lại fallback sang state nội bộ
  const isOpen = open !== undefined ? open : internalOpen;

  const setIsOpen = (value: boolean) => {
    if (onOpenChange) {
      onOpenChange(value);
    } else {
      setInternalOpen(value);
    }
  };

  // Khi mở Drawer -> set URL param
  const openDrawer = () => {
    if (paramKey && paramValue) {
      const params = new URLSearchParams(searchParams.toString());
      params.set(paramKey, paramValue);
      router.push(`?${params.toString()}`, { scroll: false });
    }
    setIsOpen(true);
  };

  // Khi đóng Drawer -> xóa URL param
  const closeDrawer = () => {
    if (paramKey) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(paramKey);
      router.push(`?${params.toString()}`, { scroll: false });
    }
    setIsOpen(false);
  };

  // Khi load page -> tự mở nếu có param
  useEffect(() => {
    if (paramKey && searchParams.get(paramKey) === paramValue) {
      setIsOpen(true);
    }
  }, [searchParams, paramKey, paramValue]);

  // Khóa scroll khi mở
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {button ? (
        <div onClick={openDrawer} className="inline-block cursor-pointer">
          {button}
        </div>
      ) : (
        <ButtonBase
          onClick={openDrawer}
          className="!p-1 !rounded text-white !bg-green-500 transition"
        >
          Mở Drawer
        </ButtonBase>
      )}

      {/* Nền mờ */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={closeDrawer}
      />
      <div
        className={`fixed top-0 ${position}-0 h-full bg-white z-50 flex flex-col 
            transform transition-transform duration-300 ${width} 
            !overflow-hidden ${!widthDrawer ? width : "!w-[100%]"}
          ${isOpen
            ? "translate-x-0"
            : position === "right"
              ? "translate-x-full"
              : "-translate-x-full"
          }
        `}
      >
        {btnExpand && (
          <ButtonBase
            onClick={() => setWidthDrawer(!widthDrawer)}
            className={`!px-0 !py-1 rounded-sm bg-blue-600 hover:bg-blue-700 
          absolute top-1/2 ${position === "right" ? "left-0 rotate-0" : "right-0 rotate-180"
              } transform -translate-y-1/2
          `}
          >
            <Image
              src={IconArrowLeft}
              alt="logo"
              width={16}
              height={16}
              className={`${widthDrawer ? "rotate-180" : "rotate-0"}`}
            />
          </ButtonBase>
        )}

        <div className="flex items-center justify-between p-3 bg-[#f5f5f5] border-b border-gray-300">
          <div className="text-lg font-semibold line-clamp-1">
            <Tooltip title={title} color="white">
              {title}
            </Tooltip>
          </div>
          <ButtonBase
            onClick={closeDrawer}
            className="!p-1 !rounded hover:!bg-gray-100 transition"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </ButtonBase>
        </div>
        <div className="flex-1 overflow-auto p-4">{children}</div>
        {footer && <div className="p-4 border-t bg-gray-50">{footer}</div>}
      </div>
    </>
  );
};
