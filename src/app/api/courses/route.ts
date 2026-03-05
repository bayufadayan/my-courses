import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CourseStatus } from "@prisma/client";

export async function GET() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      topic: { select: { id: true, name: true } },
      tags: { include: { tag: { select: { id: true, name: true } } } },
    },
  });
  return NextResponse.json(courses);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, topicId, platform, instructor, link, status, notes, tagIds = [] } = body;

  if (!title?.trim() || !topicId || !platform?.trim() || !link?.trim()) {
    return NextResponse.json({ error: "title, topicId, platform, link are required" }, { status: 400 });
  }

  const course = await prisma.course.create({
    data: {
      title: title.trim(),
      topicId,
      platform: platform.trim(),
      instructor: instructor?.trim() || null,
      link: link.trim(),
      status: (status as CourseStatus) ?? CourseStatus.planned,
      notes: notes?.trim() || null,
      tags: {
        create: (tagIds as string[]).map((tagId) => ({ tagId })),
      },
    },
    include: {
      topic: { select: { id: true, name: true } },
      tags: { include: { tag: { select: { id: true, name: true } } } },
    },
  });

  return NextResponse.json(course, { status: 201 });
}
