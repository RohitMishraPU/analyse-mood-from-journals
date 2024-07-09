import { analyze } from '@/utils/ai';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const user = await getUserByClerkId();
  const data = await request.json();
  const analysisData = await analyze(data.content);

  const entry = await prisma.journalEntry.create({
    data: {
      userId: user!.id,
      content: data.content,
      analysis: {
        create: {
          ...analysisData!,
          userId: user?.id!,
        },
      },
    },
  });

  revalidatePath('/journal');
  
  return NextResponse.json({ data: entry });
};
