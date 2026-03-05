"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import CourseForm, { type CourseFormData } from "../../../../components/CourseForm";
import { ArrowLeft } from "lucide-react";

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [initial, setInitial] = useState<Partial<CourseFormData> | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/courses/${id}`)
      .then(async (r) => {
        if (!r.ok) { setNotFound(true); return; }
        const course = await r.json();
        setInitial({
          title: course.title,
          topicId: course.topicId,
          platform: course.platform,
          instructor: course.instructor ?? "",
          link: course.link,
          status: course.status,
          notes: course.notes ?? "",
          tagIds: course.tags.map((ct: { tag: { id: string } }) => ct.tag.id),
        });
      })
      .catch(() => setNotFound(true));
  }, [id]);

  async function handleSubmit(data: CourseFormData) {
    const res = await fetch(`/api/courses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      alert(err.error ?? "Failed to update course");
      return;
    }
    router.push("/");
    router.refresh();
  }

  if (notFound) {
    return (
      <div className="mx-auto max-w-3xl">
        <p className="text-sm text-zinc-500">Course not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <button
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        <ArrowLeft size={15} />
        Back
      </button>

      <div className="rounded-xl border border-zinc-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Edit Course</h1>
        {initial === null ? (
          <p className="text-sm text-zinc-400 dark:text-zinc-500">Loading…</p>
        ) : (
          <CourseForm initial={initial} onCancel={() => router.back()} onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
}
