"use client";

import { Fragment, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Logo from "@/assets/PL-Logo.svg";
import { useGlobal } from "@/hooks";
import type { SideMenu } from "@/types/layout";

export function MobileMenu({ menus }: { menus: SideMenu[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const { setActiveMenuName } = useGlobal();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((v) => !v);

  const handleNavigate = (menu: SideMenu) => {
    setActiveMenuName(menu.label);
    router.push(menu.to);
    toggleMenu();
  };

  return (
    <Fragment>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b fixed top-0 inset-x-0 bg-white z-20">
        <button onClick={toggleMenu} className="p-2">
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
        <img src={Logo} alt="Logo" className="w-32" />
        <div className="w-6" />
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-white z-30 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="w-6" />
          <img src={Logo} alt="Logo" className="w-32" />
          <button onClick={toggleMenu} className="p-2">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menus.map((menu) => {
            const isActive =
              pathname === menu.to || pathname.startsWith(`${menu.to}/`);

            return (
              <button
                key={menu.to}
                onClick={() => handleNavigate(menu)}
                className={`w-full text-left flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-[#F3EFE1] text-primary"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <span className="text-lg">{menu.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </Fragment>
  );
}
