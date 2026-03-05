import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CourseStatus } from "@prisma/client";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      topic: { select: { id: true, name: true } },
      tags: { include: { tag: { select: { id: true, name: true } } } },
    },
  });
  if (!course) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(course);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const { title, topicId, platform, instructor, link, status, notes, tagIds = [] } = body;

  if (!title?.trim() || !topicId || !platform?.trim() || !link?.trim()) {
    return NextResponse.json({ error: "title, topicId, platform, link are required" }, { status: 400 });
  }

  // Replace tags: delete all existing, then re-create
  const course = await prisma.course.update({
    where: { id },
    data: {
      title: title.trim(),
      topicId,
      platform: platform.trim(),
      instructor: instructor?.trim() || null,
      link: link.trim(),
      status: status as CourseStatus,
      notes: notes?.trim() || null,
      tags: {
        deleteMany: {},
        create: (tagIds as string[]).map((tagId) => ({ tagId })),
      },
    },
    include: {
      topic: { select: { id: true, name: true } },
      tags: { include: { tag: { select: { id: true, name: true } } } },
    },
  });

  return NextResponse.json(course);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await prisma.course.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
