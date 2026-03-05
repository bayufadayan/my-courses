"use client";

import CourseCard from "./CourseCard";

type Status = "planned" | "learning" | "completed";

type Course = {
  id: string;
  title: string;
  topic?: string;
  platform?: string;
  status?: Status;
  instructor?: string | null;
  link?: string;
};

type Props = {
  items?: Course[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export default function CourseList({ items = [], onEdit, onDelete }: Props) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-white py-16 text-center">
        <p className="text-sm font-medium text-zinc-500">No courses yet</p>
        <p className="mt-1 text-xs text-zinc-400">Add your first course to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {items.map((c) => (
        <CourseCard
          key={c.id}
          title={c.title}
          topic={c.topic}
          platform={c.platform}
          status={c.status}
          instructor={c.instructor}
          link={c.link}
          onEdit={() => onEdit?.(c.id)}
          onDelete={() => onDelete?.(c.id)}
        />
      ))}
    </div>
  );
}
