"use client";

import { ActionButtons } from "@/components/layouts/CustomerHeader/ActionButtons";
import { HeaderTitle } from "@/components/layouts/CustomerHeader/HeaderTitle";
import { SearchInput } from "@/components/layouts/CustomerHeader/SearchInput";
import { GetflySheet } from "@/components/layouts/CustomerHeader/sheets/GetflySheet";
import { MessageSheet } from "@/components/layouts/CustomerHeader/sheets/MessageSheet";
import { NotificationSheet } from "@/components/layouts/CustomerHeader/sheets/NotificationSheet";
import { useState } from "react";

interface CustomerHeaderProps {
  totalCount?: number;
  onSearch?: (keyword: string) => void;
}

export function CustomerHeader({
  totalCount = 0,
  onSearch,
}: CustomerHeaderProps) {
  const [activeSheet, setActiveSheet] = useState<
    "message" | "notification" | "getfly" | null
  >(null);

  const closeSheet = () => setActiveSheet(null);

  return (
    <>
      <div className="flex flex-col gap-6 pb-6 border-b border-gray-200 sm:flex-row sm:items-center sm:justify-between">
        <HeaderTitle totalCount={totalCount} />
        <ActionButtons
          onMessageClick={() => setActiveSheet("message")}
          onNotificationClick={() => setActiveSheet("notification")}
          onGetflyClick={() => setActiveSheet("getfly")}
        />
      </div>

      <SearchInput onSearch={onSearch || (() => {})} />

      <MessageSheet isOpen={activeSheet === "message"} onClose={closeSheet} />
      <NotificationSheet
        isOpen={activeSheet === "notification"}
        onClose={closeSheet}
      />
      <GetflySheet isOpen={activeSheet === "getfly"} onClose={closeSheet} />
    </>
  );
}
