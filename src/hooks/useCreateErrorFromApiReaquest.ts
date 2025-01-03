import { useEffect } from 'react'
import { toast } from 'react-toastify'

const useCreateErrorFromApiRequest = (error: any) => {
  useEffect(() => {

    console.log(error)
    if (!error) return
    toast.error(error?.data?.message ? error?.data?.message : 'An error occurred during operation', { autoClose: 1500 })
  }, [error])
}

export default useCreateErrorFromApiRequest