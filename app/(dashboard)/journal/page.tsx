import JournalCard from '@/components/JournalCard';
import NewJournal from '@/components/NewJournal';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import Link from 'next/link';

const getJournalEntries = async () => {
  const user = await getUserByClerkId();
  if (!user) return [];
  try {
    const entries = prisma.journalEntry.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        analysis: true,
      },
    });
    return entries;
  } catch (error) {}
};
const Journal = async () => {
  const entries = await getJournalEntries();
  return (
    <div className="p-5">
      <h2 className="text-3xl mb-3">Meet yourself</h2>
      <div className=" grid grid-cols-3 gap-4 p-2">
        <NewJournal />
        {entries?.map((entry) => (
          <Link key={entry.id} href={`/journal/${entry.id}`}>
            <JournalCard data={entry} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Journal;
