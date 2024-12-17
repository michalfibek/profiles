"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const menuItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "All Profiles",
    path: "/profiles",
  },
];

export default function HeaderBar() {
  const currentPath = usePathname();

  return (
    <header className="w-full font-[family-name:var(--font-geist-sans)] bg-gray-100 text-gray-700 border-b-2 shadow-sm">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center flex-col gap-4 sm:flex-row">
        <div className="text-2xl font-bold">
          <Link
            href="/"
            className="inline-flex align-middle items-center gap-2 hover:text-purple-600"
          >
            <UserCircleIcon className="size-8 text-purple-500" /> Profiles App
          </Link>
        </div>

        <nav>
          <ul className="flex space-x-6">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`inline-block border-b-2 border-transparent hover:text-purple-600 py-1 ${
                    currentPath == item.path ? "border-b-purple-600 text-purple-600 active" : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
