"use client";

import { useEffect, useState } from "react";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import { Plus, X, Check, Pencil } from "lucide-react";
import { BookOpen } from "lucide-react";

type Topic = { id: string; name: string; _count?: { courses: number } };

export default function TopicsPage() {
  const [items, setItems] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  // Add form
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);

  // Edit inline
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [saving, setSaving] = useState(false);

  // Delete modal
  const [toDelete, setToDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch("/api/topics")
      .then((r) => r.json())
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  async function addTopic() {
    if (!newName.trim()) return;
    setAdding(true);
    try {
      const res = await fetch("/api/topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim() }),
      });
      if (!res.ok) { alert((await res.json()).error); return; }
      const topic = await res.json();
      setItems((prev) => [...prev, topic]);
      setNewName("");
      setShowAdd(false);
    } finally {
      setAdding(false);
    }
  }

  async function saveTopic(id: string) {
    if (!editName.trim()) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/topics/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName.trim() }),
      });
      if (!res.ok) { alert((await res.json()).error); return; }
      const updated = await res.json();
      setItems((prev) => prev.map((t) => (t.id === id ? { ...t, name: updated.name } : t)));
      setEditId(null);
    } finally {
      setSaving(false);
    }
  }

  async function deleteTopic(id: string) {
    setDeleting(true);
    try {
      await fetch(`/api/topics/${id}`, { method: "DELETE" });
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
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Topics</h1>
          <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">Organise courses by topic</p>
        </div>
        {!showAdd && (
          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-1.5 rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600"
          >
            <Plus size={14} />
            Add Topic
          </button>
        )}
      </div>

      {showAdd && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <input
            autoFocus
            placeholder="Topic name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTopic()}
            className="flex-1 rounded-md border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-500"
          />
          <button disabled={adding} onClick={addTopic} className="inline-flex items-center gap-1.5 rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-zinc-700 dark:hover:bg-zinc-600">
            <Check size={14} /> {adding ? "Saving…" : "Save"}
          </button>
          <button onClick={() => { setShowAdd(false); setNewName(""); }} className="rounded-md border border-zinc-200 p-2 text-zinc-500 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800">
            <X size={14} />
          </button>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-zinc-100 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        {loading ? (
          <p className="p-6 text-sm text-zinc-400 dark:text-zinc-500">Loading…</p>
        ) : items.length === 0 ? (
          <p className="p-6 text-sm text-zinc-400 dark:text-zinc-500">No topics yet. Add one above.</p>
        ) : (
          <ul className="divide-y divide-zinc-100">
            {items.map((topic) => (
              <li key={topic.id} className="flex items-center gap-3 px-4 py-3 dark:border-zinc-800">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                  <BookOpen size={15} />
                </div>

                {editId === topic.id ? (
                  <input
                    autoFocus
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveTopic(topic.id)}
                    className="flex-1 rounded-md border border-zinc-200 px-2 py-1 text-sm outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  />
                ) : (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{topic.name}</p>
                    {topic._count !== undefined && (
                      <p className="text-xs text-zinc-400 dark:text-zinc-500">{topic._count.courses} course{topic._count.courses !== 1 ? "s" : ""}</p>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-1">
                  {editId === topic.id ? (
                    <>
                      <button disabled={saving} onClick={() => saveTopic(topic.id)} className="rounded p-1.5 text-zinc-500 hover:bg-green-50 hover:text-green-600 disabled:opacity-50 dark:text-zinc-400 dark:hover:bg-green-950 dark:hover:text-green-400">
                        <Check size={14} />
                      </button>
                      <button onClick={() => setEditId(null)} className="rounded p-1.5 text-zinc-500 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800">
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => { setEditId(topic.id); setEditName(topic.name); }}
                        className="rounded p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => setToDelete(topic.id)}
                        className="rounded p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950 dark:hover:text-red-400"
                      >
                        <X size={14} />
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ConfirmDeleteModal
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={() => toDelete && deleteTopic(toDelete)}
        title="Delete topic"
        description="This will remove the topic. Courses linked to it will not be deleted."
      />
    </div>
  );
}

