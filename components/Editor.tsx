'use client'

import { updateJournalEntry } from "@/utils/api";
import { useState } from "react";
import { useAutosave } from "react-autosave";

const Editor = ({entry} : any) => {
    const [value, setValue] = useState(entry.content);
    const [isLoading, setIsLoading] = useState(false);

    useAutosave({
        data: value,
        onSave: async (_value) => {
          if (_value === entry.content) return
          setIsLoading(true)
    
          const { data } = await updateJournalEntry(entry.id, { content: _value })
    
        //   setEntry(data)
          setIsLoading(false)
        },
      });
    return <div className="w-full h-full">
        {isLoading && <span>Loading ....</span>}
        <textarea value={value} onChange={e => setValue(e.target.value)} className="w-full h-full overflow-scroll p-6 text-xl"/>
    </div>
}

export default Editor;