"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CourseList from "./CourseList";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

type Status = "planned" | "learning" | "completed";

export type CourseItem = {
  id: string;
  title: string;
  topic?: string;
  platform?: string;
  status?: Status;
  instructor?: string | null;
  link?: string;
};

export default function CoursesSection({ initialCourses }: { initialCourses: CourseItem[] }) {
  const router = useRouter();
  const [courses, setCourses] = useState<CourseItem[]>(initialCourses);
  const [toDelete, setToDelete] = useState<string | null>(null);

  async function deleteCourse(id: string) {
    await fetch(`/api/courses/${id}`, { method: "DELETE" });
    setCourses((prev) => prev.filter((c) => c.id !== id));
    setToDelete(null);
  }

  return (
    <>
      <CourseList
        items={courses}
        onEdit={(id) => router.push(`/courses/${id}/edit`)}
        onDelete={(id) => setToDelete(id)}
      />

      <ConfirmDeleteModal
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={() => toDelete && deleteCourse(toDelete)}
        title="Delete course"
        description="This will permanently remove the course. This action cannot be undone."
      />
    </>
  );
}
