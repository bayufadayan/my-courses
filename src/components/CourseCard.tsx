"use client";

import { ExternalLink, Pencil, Trash, BookOpen } from "lucide-react";

type Status = "planned" | "learning" | "completed";

const statusConfig: Record<Status, { label: string; className: string }> = {
  planned: { label: "Planned", className: "bg-amber-50 text-amber-700 border-amber-100" },
  learning: { label: "Learning", className: "bg-blue-50 text-blue-700 border-blue-100" },
  completed: { label: "Completed", className: "bg-green-50 text-green-700 border-green-100" },
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
    <article className="group flex flex-col gap-4 rounded-xl border border-zinc-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-zinc-500">
            <BookOpen size={16} />
          </div>
          <h3 className="truncate text-sm font-semibold leading-6 text-zinc-900">{title}</h3>
        </div>
        <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-medium ${cfg.className}`}>
          {cfg.label}
        </span>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500">
        {topic && <span className="font-medium text-zinc-700">{topic}</span>}
        {platform && <span>{platform}</span>}
        {instructor && <span>{instructor}</span>}
      </div>

      <div className="flex items-center justify-end gap-1 border-t border-zinc-50 pt-3">
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
          >
            <ExternalLink size={13} />
            Open
          </a>
        )}
        <button
          onClick={onEdit}
          className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
        >
          <Pencil size={13} />
          Edit
        </button>
        <button
          onClick={onDelete}
          className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-zinc-500 hover:bg-red-50 hover:text-red-600"
        >
          <Trash size={13} />
          Delete
        </button>
      </div>
    </article>
  );
}
