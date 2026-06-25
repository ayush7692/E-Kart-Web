import React, { useState } from 'react'
import useAuthStatus from '../hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateComponent = () => {

    const {authorisedUser} = useAuthStatus()
 

  return authorisedUser ? <Outlet/> : <Navigate to={'/Login'} />
}

export default PrivateComponent

