"use client";

import { useEffect, useState } from "react";
import { X, Check, Link as LinkIcon, Tag } from "lucide-react";

const inputCls =
  "w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 outline-none ring-offset-1 transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-500 dark:focus:ring-zinc-700";

const labelCls = "mb-1.5 block text-xs font-semibold text-zinc-600 dark:text-zinc-400";

export type CourseFormData = {
  title: string;
  topicId: string;
  platform: string;
  instructor: string;
  link: string;
  status: "planned" | "learning" | "completed";
  notes: string;
  tagIds: string[];
};

type TopicOption = { id: string; name: string };
type TagOption = { id: string; name: string };

type Props = {
  initial?: Partial<CourseFormData>;
  onCancel?: () => void;
  onSubmit?: (data: CourseFormData) => void | Promise<void>;
};

export default function CourseForm({ initial = {}, onCancel, onSubmit }: Props) {
  const [form, setForm] = useState<CourseFormData>({
    title: initial.title ?? "",
    topicId: initial.topicId ?? "",
    platform: initial.platform ?? "",
    instructor: initial.instructor ?? "",
    link: initial.link ?? "",
    status: initial.status ?? "planned",
    notes: initial.notes ?? "",
    tagIds: initial.tagIds ?? [],
  });
  const [topics, setTopics] = useState<TopicOption[]>([]);
  const [tags, setTags] = useState<TagOption[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/topics").then((r) => r.json()).then(setTopics).catch(() => {});
    fetch("/api/tags").then((r) => r.json()).then(setTags).catch(() => {});
  }, []);

  const set = (key: keyof CourseFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  function toggleTag(id: string) {
    setForm((prev) => ({
      ...prev,
      tagIds: prev.tagIds.includes(id) ? prev.tagIds.filter((t) => t !== id) : [...prev.tagIds, id],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit?.(form);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Row 1 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Title</label>
          <input required placeholder="e.g. React Advanced Patterns" value={form.title} onChange={set("title")} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Platform</label>
          <input required placeholder="e.g. YouTube, Udemy" value={form.platform} onChange={set("platform")} className={inputCls} />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className={labelCls}>Topic</label>
          <select required value={form.topicId} onChange={set("topicId")} className={inputCls}>
            <option value="">Select topic</option>
            {topics.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Instructor <span className="font-normal text-zinc-400">(optional)</span></label>
          <input placeholder="e.g. Kent C. Dodds" value={form.instructor} onChange={set("instructor")} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Status</label>
          <select value={form.status} onChange={set("status")} className={inputCls}>
            <option value="planned">Planned</option>
            <option value="learning">Learning</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Link */}
      <div>
        <label className={labelCls}>
          <span className="inline-flex items-center gap-1.5">
            <LinkIcon size={12} />
            Course Link
          </span>
        </label>
        <input type="url" placeholder="https://..." value={form.link} onChange={set("link")} className={inputCls} />
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div>
          <label className={labelCls}>
            <span className="inline-flex items-center gap-1.5">
              <Tag size={12} />
              Tags <span className="font-normal text-zinc-400">(optional)</span>
            </span>
          </label>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => {
              const active = form.tagIds.includes(t.id);
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => toggleTag(t.id)}
                  className={`rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors ${
                    active
                    ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-500 dark:bg-zinc-700"
                    : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-500"
                  }`}
                >
                  {t.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Notes */}
      <div>
        <label className={labelCls}>Notes <span className="font-normal text-zinc-400">(optional)</span></label>
        <textarea placeholder="Personal notes, progress, key takeaways..." value={form.notes} onChange={set("notes")} rows={4} className={inputCls} />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-700 dark:hover:bg-zinc-600"
        >
          <Check size={14} />
          {loading ? "Saving…" : "Save Course"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          <X size={14} />
          Cancel
        </button>
      </div>
    </form>
  );
}
