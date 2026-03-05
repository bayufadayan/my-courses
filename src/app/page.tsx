import { BookOpen, CheckCircle, Clock, ListTodo } from "lucide-react";
import { prisma } from "@/lib/prisma";
import CoursesSection from "../components/CoursesSection";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      topic: { select: { name: true } },
    },
  });

  const items = courses.map((c) => ({
    id: c.id,
    title: c.title,
    topic: c.topic.name,
    platform: c.platform,
    status: c.status as "planned" | "learning" | "completed",
    instructor: c.instructor,
    link: c.link,
  }));

  const stats = [
    { label: "Total", value: items.length, icon: BookOpen, color: "bg-zinc-100 text-zinc-600" },
    { label: "Learning", value: items.filter((c) => c.status === "learning").length, icon: Clock, color: "bg-blue-50 text-blue-600" },
    { label: "Completed", value: items.filter((c) => c.status === "completed").length, icon: CheckCircle, color: "bg-green-50 text-green-600" },
    { label: "Planned", value: items.filter((c) => c.status === "planned").length, icon: ListTodo, color: "bg-amber-50 text-amber-600" },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="flex items-center gap-4 rounded-xl border border-zinc-100 bg-white p-4 shadow-sm">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${color}`}>
              <Icon size={18} />
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900">{value}</p>
              <p className="text-xs text-zinc-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Course grid */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">All Courses</h2>
          <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600">{items.length} courses</span>
        </div>
        <CoursesSection initialCourses={items} />
      </section>
    </div>
  );
}

