"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Plus, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const titles: Record<string, string> = {
  "/": "Dashboard",
  "/topics": "Topics",
  "/tags": "Tags",
  "/courses/new": "Add Course",
};

type Props = { onMenuClick: () => void };

export default function Navbar({ onMenuClick }: Props) {
  const pathname = usePathname();
  const title = titles[pathname] ?? "My Courses";
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between border-b border-zinc-100 bg-white/90 px-5 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/90">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-md p-1.5 text-zinc-600 hover:bg-zinc-100 md:hidden dark:text-zinc-400 dark:hover:bg-zinc-800"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggle}
          className="rounded-md p-1.5 text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
          aria-label="Toggle dark mode"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <Link
          href="/courses/new"
          className="flex items-center gap-1.5 rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600"
        >
          <Plus size={15} />
          Add Course
        </Link>
      </div>
    </header>
  );
}
