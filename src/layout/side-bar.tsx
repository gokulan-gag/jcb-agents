import { useGlobal } from "@/hooks";
import type { SideMenu } from "@/types/layout";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useEffect } from "react";

import logo from "@/assets/PL-Logo.svg";

const SideBar = ({ menus }: { menus: SideMenu[] }) => {
  const { setActiveMenuName, activeMenuName } = useGlobal();
  const pathname = usePathname();

  useEffect(() => {
    // Set active menu based on current URL path
    const matchingMenu = menus.find((menu) => menu.to === pathname);

    if (matchingMenu && matchingMenu.label !== activeMenuName) {
      setActiveMenuName(matchingMenu.label);
    }
  }, [pathname, menus, activeMenuName, setActiveMenuName]);

  return (
    <div className="hidden w-[7vh] h-screen md:block">
      <div className="flex-1 w-full pl-2 space-y-1 text-blueGray-700">
        <div className="flex items-center">
          <div className="rounded-full flex text-sm">
            <span className="sr-only">Open user menu</span>
          </div>
        </div>
        <img src={logo.src} alt="" className="ml-1.5 mt-3 w-10 pr-2" />
        <div className="py-4">
          {menus.map((menu, index) => (
            <div className="py-3 relative" key={index}>
              {menu.label == activeMenuName && (
                <>
                  <span className="sb_item_top_curve"></span>
                  <span className="sb_item_bottom_curve"></span>
                </>
              )}
              <Link
                key={menu.to}
                href={menu.to}
                onClick={() => setActiveMenuName(menu.label)}
                className={`${
                  menu.label == activeMenuName
                    ? "bg-warm-off-white text-white "
                    : "text-white hover:text-blueGray-700"
                } group w-full  rounded-l-[1rem] flex flex-col items-center text-xs font-medium`}
                aria-current={menu.label == activeMenuName ? "page" : undefined}
              >
                <div className="py-3 pr-2 relative sb_item_hover_menu">
                  <span className="sb_item_hover_effect" />
                  {menu.label == activeMenuName ? null : (
                    <span className="sb_item_hover_tooltip">{menu.label}</span>
                  )}

                  <menu.icon
                    className={`${
                      menu.label == activeMenuName
                        ? "text-primary"
                        : "text-white"
                    } h-6 w-6 z-10`}
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
