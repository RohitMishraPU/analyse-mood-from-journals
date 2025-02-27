import { auth } from "@clerk/nextjs/server"
import { prisma } from "./db";

export const getUserByClerkId = async () => {
    try {
        const {userId} = auth();
        const user = await prisma.user.findUniqueOrThrow({
            where: {
              clerkId: userId!,
            }
          });

          return user;
    } catch (error) {
        
    }
}