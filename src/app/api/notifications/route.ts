import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  // Get notifications for the authenticated user
  // (Assume userId is available from session or query for demo)
  const userId = req.nextUrl.searchParams.get('userId');
  if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  const notifications = await prisma.notification.findMany({
    where: { userId: userId },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ notifications });
}

export async function POST(req: NextRequest) {
  // Create a new notification for a user
  const body = await req.json();
  const { userId, message, type } = body;
  if (!userId || !message || !type) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const notification = await prisma.notification.create({
    data: { userId, message, type },
  });
  return NextResponse.json({ notification });
}

export async function DELETE(req: NextRequest) {
  // Delete a notification by id
  const notificationId = req.nextUrl.searchParams.get('id');
  if (!notificationId) return NextResponse.json({ error: 'Missing notification id' }, { status: 400 });
  await prisma.notification.delete({ where: { id: notificationId } });
  return NextResponse.json({ success: true });
}
