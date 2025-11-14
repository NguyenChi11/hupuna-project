"use client";

import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUsers,
  faBullhorn,
  faCode,
  faTasks,
  faShoppingCart,
  faChartBar,
  faChevronLeft,
  faChevronRight,
  faAddressBook,
} from "@fortawesome/free-solid-svg-icons";
import { useSidebar } from "@/app/(main-layout)/_components/SidebarContext";
import BookIcon from "@/components/images/BookIcon";
const routes = [
  { label: "Trang Chủ", href: "/home", icon: faHouse },
  { label: "Khách Hàng", href: "/customers", icon: faUsers },
  { label: "Nhân viên", href: "/employee-account", icon: faAddressBook },
  { label: "Marketing", href: "/marketing", icon: faBullhorn },
  { label: "API", href: "/api", icon: faCode },
  { label: "Công việc", href: "/tasks", icon: faTasks },
  { label: "Bán hàng", href: "/sales", icon: faShoppingCart },
  { label: "Báo cáo", href: "/reports", icon: faChartBar },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { collapsed, toggle } = useSidebar();

  const handleNavClick = (href: string) => {
    router.push(href);
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 z-30 flex h-screen flex-col border-r bg-white shadow-sm
        transition-all duration-300 ease-in-out overflow-hidden
        ${collapsed ? "w-16" : "sm:w-64 w-full"}
      `}
    >

      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-indigo-600 to-indigo-800 text-white">
              <FontAwesomeIcon icon={faHouse} className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-indigo-700">
                Hupuna Group
              </h1>
              <p className="text-xs text-gray-500">TỔNG KHO HỘP CARTON</p>
            </div>
          </div>
        )}

        <button
          onClick={toggle}
          className="
            rounded-lg p-1.5 transition-all hover:bg-gray-100
            text-gray-600 hover:text-indigo-700
            focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 cursor-pointer
          "
          aria-label={collapsed ? "Mở sidebar" : "Thu gọn sidebar"}
        >
          <FontAwesomeIcon
            icon={collapsed ? faChevronRight : faChevronLeft}
            className="h-4 w-4"
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3 overflow-y-auto no-scrollbar">
        {routes.map(({ label, href, icon }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <div
              key={href}
              className="group relative"
              title={collapsed ? label : undefined}
            >
              <button
                onClick={() => handleNavClick(href)}
                className={`
                  group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium
                  transition-all duration-200 relative cursor-pointer
                  ${
                    isActive
                      ? "bg-linear-to-r from-indigo-600 to-indigo-700 text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-100 hover:text-indigo-700"
                  }
                  ${collapsed ? "justify-center" : ""}
                `}
              >
                <div
                  className={`
                    flex h-9 w-9 items-center justify-center rounded-lg
                    ${
                      isActive
                        ? "bg-white/20"
                        : "bg-gray-100 group-hover:bg-gray-200"
                    }
                  `}
                >
                  <FontAwesomeIcon
                    icon={icon}
                    className={`
                      h-5 w-5
                      ${
                        isActive
                          ? "text-white"
                          : "text-gray-600 group-hover:text-indigo-700"
                      }
                    `}
                  />
                </div>

                {!collapsed && <span>{label}</span>}
              </button>

              {/* Tooltip khi collapsed */}
              {collapsed && (
                <span
                  className="
                    absolute left-16 top-1/2 -translate-y-1/2
                    bg-gray-900 text-white text-xs px-2 py-1 rounded
                    opacity-0 group-hover:opacity-100 pointer-events-none
                    transition-opacity duration-200 whitespace-nowrap z-50
                  "
                >
                  {label}
                </span>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
