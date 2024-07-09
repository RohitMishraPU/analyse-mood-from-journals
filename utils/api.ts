const createURL = (path :string) => {
    return window.location.origin + path;
}

export const createNewJournalEntry = async () => {
    const res = await fetch(new Request(createURL('/api/journal'),{
        method : 'POST',
        body : JSON.stringify({content : "Write about your day!"})
    }))

    if (res.ok) {
        return res.json()
      } else {
        throw new Error('Something went wrong on API server!')
      }
}

export const updateJournalEntry = async (id: string, updates : any) => {
  const res = await fetch(new Request(createURL(`/api/journal/${id}`),{
      method : 'PATCH',
      body : JSON.stringify({ updates })
  }))

  if (res.ok) {
      return res.json()
    } else {
      throw new Error('Something went wrong on API server!')
    }
}

export const deleteJournalEntry = async (id: string) => {
  const res = await fetch(new Request(createURL(`/api/journal/${id}`),{
      method : 'DELETE',
  }))

  if (res.ok) {
      return res.json()
    } else {
      throw new Error('Something went wrong on API server!')
    }
}