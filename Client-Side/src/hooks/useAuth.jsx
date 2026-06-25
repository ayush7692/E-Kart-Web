import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const useAuthStatus = () => {
    const user= useSelector(store=> store.auth.user)

    const authorisedUser = Boolean(user?.role==="user")
    const authorisedVendor = Boolean(user?.role=="vendor")
 
    return{authorisedVendor,authorisedUser}
}

export default useAuthStatus
    



// const useAuthStatus = () => {
//     const {user}= useSelector(store=> store.auth)

//     const authorised = Boolean(user)

//     return{authorised}
// }

// export default useAuthStatus