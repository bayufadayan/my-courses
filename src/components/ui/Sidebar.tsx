"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, LayoutGrid, Tag, X } from "lucide-react";

const items = [
  { href: "/", label: "Dashboard", icon: LayoutGrid },
  { href: "/topics", label: "Topics", icon: BookOpen },
  { href: "/tags", label: "Tags", icon: Tag },
];

type Props = { open: boolean; onClose: () => void };

export default function Sidebar({ open, onClose }: Props) {
  const pathname = usePathname();

  return (
    <aside
      className={[
        "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-zinc-100 bg-white transition-transform duration-200 dark:border-zinc-800 dark:bg-zinc-900",
        open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
      ].join(" ")}
    >
      <div className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-zinc-100 px-5 dark:border-zinc-800">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-900 text-white">
            <BookOpen size={16} />
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            My Courses
          </span>
        </div>
        <button
          onClick={onClose}
          className="rounded-md p-1 text-zinc-500 hover:bg-zinc-100 md:hidden dark:text-zinc-400 dark:hover:bg-zinc-800"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        <p className="mb-1 px-3 pt-1 text-[11px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
          Navigation
        </p>
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={[
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-zinc-900 text-white dark:bg-zinc-700"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
              ].join(" ")}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-zinc-100 px-5 py-4 dark:border-zinc-800">
        <p className="text-xs text-zinc-400 dark:text-zinc-600">My Courses &copy; 2026</p>
      </div>
    </aside>
  );
}
