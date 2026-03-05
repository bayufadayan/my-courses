"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Plus } from "lucide-react";

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

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between border-b border-zinc-100 bg-white/90 px-5 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-md p-1.5 text-zinc-600 hover:bg-zinc-100 md:hidden"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-[15px] font-semibold text-zinc-900">{title}</h1>
      </div>

      <Link
        href="/courses/new"
        className="flex items-center gap-1.5 rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
      >
        <Plus size={15} />
        Add Course
      </Link>
    </header>
  );
}
