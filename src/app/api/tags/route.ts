import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const tags = await prisma.tag.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, _count: { select: { courses: true } } },
  });
  return NextResponse.json(tags);
}

export async function POST(request: Request) {
  const { name } = await request.json();
  if (!name?.trim()) return NextResponse.json({ error: "Name is required" }, { status: 400 });

  try {
    const tag = await prisma.tag.create({ data: { name: name.trim().toLowerCase() } });
    return NextResponse.json(tag, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Tag name already exists" }, { status: 409 });
  }
}
