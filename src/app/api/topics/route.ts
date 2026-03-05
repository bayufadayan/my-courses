import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const topics = await prisma.topic.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, name: true, _count: { select: { courses: true } } },
  });
  return NextResponse.json(topics);
}

export async function POST(request: Request) {
  const { name } = await request.json();
  if (!name?.trim()) return NextResponse.json({ error: "Name is required" }, { status: 400 });

  try {
    const topic = await prisma.topic.create({ data: { name: name.trim() } });
    return NextResponse.json(topic, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Topic name already exists" }, { status: 409 });
  }
}
