"use client";

import { X } from "lucide-react";

type Tag = { id: string; name: string };

type Props = {
  items?: Tag[];
  onDelete?: (id: string) => void;
};

export default function TagList({ items = [], onDelete }: Props) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-white py-12 text-center">
        <p className="text-sm font-medium text-zinc-500">No tags yet</p>
        <p className="mt-1 text-xs text-zinc-400">Add tags to categorise your courses.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <div
          key={t.id}
          className="group flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:border-zinc-300"
        >
          {t.name}
          <button
            onClick={() => onDelete?.(t.id)}
            aria-label={`Remove ${t.name}`}
            className="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
          >
            <X size={11} />
          </button>
        </div>
      ))}
    </div>
  );
}
