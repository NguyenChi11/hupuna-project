"use client";

import { useState } from "react";

type TabBaseProps = {
  keyTab?: string;
  label: string;
  component: React.ReactNode;
};

interface TabsProps {
  tabs: TabBaseProps[];
  className?: string;
  activeTab?: number;
  activeTabKey?: string;
  onChange?: (tabIndex: number) => void;
  onChangeKey?: (keyTab: string) => void;
}

export default function TabBase({
  tabs,
  className,
  activeTab,
  activeTabKey,
  onChange,
  onChangeKey,
}: TabsProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const [internalKey, setInternalKey] = useState<string | undefined>(undefined);

  // Ưu tiên active theo key, nếu không có thì dùng index
  const activeIndex =
    activeTabKey !== undefined
      ? tabs.findIndex((t) => t.keyTab === activeTabKey)
      : activeTab !== undefined
        ? activeTab - 1
        : internalKey
          ? tabs.findIndex((t) => t.keyTab === internalKey)
          : internalIndex;

  const handleTab = (index: number) => {
    const selectedKey = tabs[index]?.keyTab;

    if (selectedKey) {
      onChangeKey?.(selectedKey);
      if (activeTabKey === undefined) setInternalKey(selectedKey);
    } else {
      onChange?.(index + 1);
      if (activeTab === undefined) setInternalIndex(index);
    }
  };

  return (
    <div className={`w-full ${className ?? ""}`}>
      <div className="flex px-1 border-0 border-b border-gray-200 relative">
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={tab.keyTab ?? index}
              className={`py-2 px-4 text-sm font-medium ${isActive
                  ? "text-black bg-white border-0 border-b-2 border-green-600 focus:outline-none"
                  : "text-black focus:outline-none"
                }`}
              onClick={() => handleTab(index)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="transition-all duration-300 ease-in-out">
        {tabs.map((tab, index) => (
          <div
            key={tab.keyTab ?? index}
            style={{ display: index === activeIndex ? "block" : "none" }}
          >
            {tab.component}
          </div>
        ))}
      </div>
    </div>
  );
}
