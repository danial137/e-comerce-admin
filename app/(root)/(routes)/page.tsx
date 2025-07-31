'use client'
import React from 'react'
import { UserButton } from '@clerk/nextjs'
import { Model } from '@/components/ui/model'
const SetupPage = () => {
    return (
        <div>
            Store model 
            <Model title="Store Model" description="This is a store model" isOpen={true} onClose={() => {}}>
                This is a store model
            </Model>
        </div>
    )
}

export default SetupPage