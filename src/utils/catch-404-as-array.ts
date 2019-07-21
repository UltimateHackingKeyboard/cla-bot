
export const catch404AsArray = <T> (error: any): Promise<T[]> => {
  if(error.status === 404)
    return Promise.resolve([])

  return Promise.reject(error)
}
