"use client"
import { deleteJournalEntry } from "@/utils/api"
import {  useRouter } from 'next/navigation'

export default function DeleteButton({id} : any) {
    const router = useRouter();
    const handleDelete = async () => {
        await deleteJournalEntry(id);
        router.push('/journal');
      }
    return <li className="py-4 px-8 flex items-center justify-between">
    <button
      onClick={handleDelete}
      type="button"
      className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
    >
      Delete
    </button>
  </li>
}