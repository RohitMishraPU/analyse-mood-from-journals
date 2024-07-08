import Editor from "@/components/Editor";
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
        {/* <div
          style={{ background: currentEntry.analysis.color }} //currentEntry.analysis.color
          className="h-[100px] bg-blue-600 text-white p-8"
        >
          <h2 className="text-2xl bg-white/25 text-black">Analysis</h2>
        </div> */}
        {/* <div>
        <ul role="list" className="divide-y divide-gray-200">
            <li className="py-4 px-8 flex items-center justify-between">
              <div className="text-xl font-semibold w-1/3">Subject</div>
              <div className="text-xl">{currentEntry.analysis.subject}</div>
            </li>

            <li className="py-4 px-8 flex items-center justify-between">
              <div className="text-xl font-semibold">Mood</div>
              <div className="text-xl">{currentEntry.analysis.mood}</div>
            </li>

            <li className="py-4 px-8 flex items-center justify-between">
              <div className="text-xl font-semibold">Negative</div>
              <div className="text-xl">
                {currentEntry.analysis.negative ? 'True' : 'False'}
              </div>
            </li>
            <li className="py-4 px-8 flex items-center justify-between">
              <button
                onClick={handleDelete}
                type="button"
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Delete
              </button>
            </li>
          </ul>

        </div> */}
      </div>
    </div>
}

export default Journal;