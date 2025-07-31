import React from 'react'
import { UserButton } from '@clerk/nextjs'
const SetupPage = () => {
    return (
        <div>
            this is a dashboard <UserButton afterSignOutUrl='/' />
        </div>
    )
}

export default SetupPage