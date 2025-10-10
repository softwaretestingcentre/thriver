import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    const { exerciseType, name, duration, calories, distance, sets, reps, weight, notes } = body;

    if (!exerciseType || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const entry = await prisma.exerciseEntry.create({
      data: {
        userId: dbUser.id,
        exerciseType,
        name,
        duration: duration ? parseInt(duration) : null,
        calories: calories ? parseFloat(calories) : null,
        distance: distance ? parseFloat(distance) : null,
        sets: sets ? parseInt(sets) : null,
        reps: reps ? parseInt(reps) : null,
        weight: weight ? parseFloat(weight) : null,
        notes,
      },
    });

    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    console.error('Error creating exercise entry:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
