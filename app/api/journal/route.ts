import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const user = await getUserByClerkId();
  const data = await request.json()
  
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user!.id,
      content: data.content,
    },
  });

  return NextResponse.json({ data: entry });
};


