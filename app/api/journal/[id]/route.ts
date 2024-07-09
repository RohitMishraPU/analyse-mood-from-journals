import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const PATCH = async (request: Request, { params }:any) => {
    const user = await getUserByClerkId();
    const {updates} = await request.json()
    const entryId = params.id
    
    const entry = await prisma.journalEntry.update({
      where : {
        userId_id : {
            id : entryId,
            userId : user?.id!
        }
      },
      data: updates,
    });
  
    const analysis = await analyze(entry.content)
    const savedAnalysis = await prisma.entryAnalysis.upsert({
      where: {
        entryId: entry.id,
      },
      update: { ...analysis },
      create: {
        entryId: entry.id,
        userId: user!.id,
        ...analysis!,
      },
    })
    return NextResponse.json({ data: entry });
  };


  export const DELETE = async (request: Request, { params }:any) => {
    const user = await getUserByClerkId();
    const entryId = params.id
    
    const entry = await prisma.journalEntry.delete({
      where : {
        userId_id : {
            id : entryId,
            userId : user?.id!
        }
      }
    });
  
    return NextResponse.json({ data: entry });
  };