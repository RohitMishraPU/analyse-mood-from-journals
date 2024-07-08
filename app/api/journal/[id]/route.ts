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
  
    return NextResponse.json({ data: entry });
  };