"use client";

import CourseForm, { type CourseFormData } from "../../../components/CourseForm";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function NewCoursePage() {
  const router = useRouter();

  async function handleSubmit(data: CourseFormData) {
    const res = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      alert(err.error ?? "Failed to create course");
      return;
    }
    router.push("/");
    router.refresh();
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
        <h1 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Add New Course</h1>
        <CourseForm onCancel={() => router.back()} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

