import React, { useState } from 'react'
import useAuthStatus from '../hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateComponentVendor = () => {

    const {authorisedVendor}  = useAuthStatus()

    return authorisedVendor? <Outlet/> : <Navigate to={'/'} />
}

export default PrivateComponentVendor