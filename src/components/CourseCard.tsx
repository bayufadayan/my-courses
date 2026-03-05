"use client";

import { ExternalLink, Pencil, Trash, BookOpen } from "lucide-react";

type Status = "planned" | "learning" | "completed";

const statusConfig: Record<Status, { label: string; className: string }> = {
  planned: { label: "Planned", className: "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-900" },
  learning: { label: "Learning", className: "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-900" },
  completed: { label: "Completed", className: "bg-green-50 text-green-700 border-green-100 dark:bg-green-950 dark:text-green-400 dark:border-green-900" },
};

type Props = {
  title: string;
  topic?: string;
  platform?: string;
  status?: Status;
  instructor?: string | null;
  link?: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function CourseCard({
  title,
  topic,
  platform,
  status = "planned",
  instructor,
  link,
  onEdit,
  onDelete,
}: Props) {
  const cfg = statusConfig[status];

  return (
    <article className="group flex flex-col gap-4 rounded-xl border border-zinc-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
            <BookOpen size={16} />
          </div>
          <h3 className="truncate text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-100">{title}</h3>
        </div>
        <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-medium ${cfg.className}`}>
          {cfg.label}
        </span>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
        {topic && <span className="font-medium text-zinc-700 dark:text-zinc-300">{topic}</span>}
        {platform && <span>{platform}</span>}
        {instructor && <span>{instructor}</span>}
      </div>

      <div className="flex items-center justify-end gap-1 border-t border-zinc-50 pt-3 dark:border-zinc-800">
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          >
            <ExternalLink size={13} />
            Open
          </a>
        )}
        <button
          onClick={onEdit}
          className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
        >
          <Pencil size={13} />
          Edit
        </button>
        <button
          onClick={onDelete}
          className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-zinc-500 hover:bg-red-50 hover:text-red-600 dark:text-zinc-400 dark:hover:bg-red-950 dark:hover:text-red-400"
        >
          <Trash size={13} />
          Delete
        </button>
      </div>
    </article>
  );
}
