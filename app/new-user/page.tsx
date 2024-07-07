import { prisma } from '@/utils/db';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const createNewUser = async () => {
  try {
    const user = await currentUser();

    if (!user) throw 'Something went wrong';

    const match = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });

    if(!match) {
        const newUser = await prisma.user.create({
            data : {
                email : user.emailAddresses[0].emailAddress,
                name : user.fullName,
                clerkId : user.id
            }
        })
    }

    redirect("/journal");
  } catch (error) {}
};
const NewUser = async () => {
   await createNewUser();
  return <>Hello</>;
};

export default NewUser;
