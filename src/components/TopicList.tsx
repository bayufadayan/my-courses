"use client";

import { Pencil, Trash2, BookOpen } from "lucide-react";

type Topic = { id: string; name: string };

type Props = {
  items?: Topic[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export default function TopicList({ items = [], onEdit, onDelete }: Props) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-white py-12 text-center">
        <p className="text-sm font-medium text-zinc-500">No topics yet</p>
        <p className="mt-1 text-xs text-zinc-400">Add a topic to organise your courses.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-100 bg-white shadow-sm">
      {items.map((t, i) => (
        <div
          key={t.id}
          className={[
            "flex items-center justify-between px-5 py-3.5",
            i !== 0 ? "border-t border-zinc-50" : "",
          ].join(" ")}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-100 text-zinc-500">
              <BookOpen size={14} />
            </div>
            <span className="text-sm font-medium text-zinc-800">{t.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit?.(t.id)}
              className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
            >
              <Pencil size={13} />
              Edit
            </button>
            <button
              onClick={() => onDelete?.(t.id)}
              className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-zinc-500 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 size={13} />
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
