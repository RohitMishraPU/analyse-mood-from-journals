import DeleteButton from "@/components/DeleteJournal";
import Editor from "@/components/Editor";
import { deleteJournalEntry } from "@/utils/api";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getJournal = async (id : string) => {
    try {
        const user = await getUserByClerkId();
        const entry = await prisma.journalEntry.findUnique({
            where : {
                userId_id:{
                    id,
                    userId : user?.id!
                }
            },
            include:{
              analysis : true
            }
        });
        return entry;

    } catch (error) {
        
    }
}


const Journal = async({params}: any) => {
  const journalEntry = await getJournal(params.id);

    return <div className="grid grid-cols-3 h-full">
        <div className="col-span-2"><Editor entry={journalEntry}/></div>
        <div className="h-full border-l bg-slate-100 drop-shadow-sm">
        <div
          style={{ background: journalEntry!.analysis?.color }} //journalEntry!.analysis!.color
          className="h-[100px] p-8"
        >
          <h2 className="text-2xl text-black">Analysis</h2>
        </div>
        <div>
        <ul role="list" className="divide-y divide-gray-200">
            <li className="py-4 px-8 flex items-center justify-between">
              <div className="text-xl font-semibold w-1/3">Subject</div>
              <div className="text-xl">{journalEntry!.analysis?.subject}</div>
            </li>

            <li className="py-4 px-8 flex items-center justify-between">
              <div className="text-xl font-semibold">Mood</div>
              <div className="text-xl">{journalEntry!.analysis?.mood}</div>
            </li>

            <li className="py-4 px-8 flex items-center justify-between">
              <div className="text-xl font-semibold">Negative</div>
              <div className="text-xl">
                {journalEntry!.analysis?.negative ? 'True' : 'False'}
              </div>
            </li>
            <DeleteButton id={params.id}/>
          </ul>

        </div>
      </div>
    </div>
}

export default Journal;