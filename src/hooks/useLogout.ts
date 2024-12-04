import React from 'react'
import { useDispatch } from 'react-redux'

import authApi from '@/apis/authApi'

const useLogout = () => {
  const dispatch = useDispatch()

  const logoutUser = () => {
    // Remove access_token 
    localStorage.removeItem('access_token')

    // Remove refresh_token 
    localStorage.removeItem('refresh_token')

    // Invalidate user
    dispatch(authApi.util.invalidateTags(["USER"])); // Invalidate the tag
    dispatch(authApi.util.resetApiState());
  }

  return logoutUser
}

export default useLogout