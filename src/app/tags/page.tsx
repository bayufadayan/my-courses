"use client";

import { useEffect, useState } from "react";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import { Plus, Check, X } from "lucide-react";

type Tag = { id: string; name: string; _count?: { courses: number } };

export default function TagsPage() {
  const [items, setItems] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);
  const [toDelete, setToDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch("/api/tags")
      .then((r) => r.json())
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  async function addTag() {
    if (!newName.trim()) return;
    setAdding(true);
    try {
      const res = await fetch("/api/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim() }),
      });
      if (!res.ok) { alert((await res.json()).error); return; }
      const tag = await res.json();
      setItems((prev) => [...prev, tag]);
      setNewName("");
      setShowAdd(false);
    } finally {
      setAdding(false);
    }
  }

  async function deleteTag(id: string) {
    setDeleting(true);
    try {
      await fetch(`/api/tags/${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((t) => t.id !== id));
      setToDelete(null);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-zinc-900">Tags</h1>
          <p className="mt-0.5 text-sm text-zinc-500">Categorise courses with tags</p>
        </div>
        {!showAdd && (
          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-1.5 rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-700"
          >
            <Plus size={14} />
            Add Tag
          </button>
        )}
      </div>

      {showAdd && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
          <input
            autoFocus
            placeholder="Tag name (lowercase)"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTag()}
            className="flex-1 rounded-md border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
          />
          <button disabled={adding} onClick={addTag} className="inline-flex items-center gap-1.5 rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-50">
            <Check size={14} /> {adding ? "Saving…" : "Save"}
          </button>
          <button onClick={() => { setShowAdd(false); setNewName(""); }} className="rounded-md border border-zinc-200 p-2 text-zinc-500 hover:bg-zinc-50">
            <X size={14} />
          </button>
        </div>
      )}

      <div className="rounded-xl border border-zinc-100 bg-white p-5 shadow-sm">
        {loading ? (
          <p className="text-sm text-zinc-400">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-zinc-400">No tags yet. Add one above.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {items.map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 pl-3 pr-1.5 py-1 text-sm font-medium text-zinc-700"
              >
                {tag.name}
                {tag._count !== undefined && (
                  <span className="rounded-full bg-zinc-200 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-500">
                    {tag._count.courses}
                  </span>
                )}
                <button
                  onClick={() => setToDelete(tag.id)}
                  className="ml-0.5 flex h-5 w-5 items-center justify-center rounded-full text-zinc-400 hover:bg-red-100 hover:text-red-600 transition-colors"
                >
                  <X size={11} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <ConfirmDeleteModal
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={() => toDelete && deleteTag(toDelete)}
        title="Delete tag"
        description="This will remove the tag. It will be unlinked from all courses."
      />
    </div>
  );
}

