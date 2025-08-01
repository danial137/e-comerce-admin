'use client'
import React, { useEffect } from 'react'
import { UserButton } from '@clerk/nextjs'
import { Model } from '@/components/model'
import { useStoreModel } from '@/hooks/use-store-model'
const SetupPage = () => {
    const onOpen = useStoreModel((state) => state.onOpen)
    const isOpen = useStoreModel((state) => state.isOpen)

    useEffect(() => {
        if (!isOpen) {
            onOpen()

        }
    }, [isOpen,onOpen])

    return (
        <div>

            Store model

        </div>
    )
}

export default SetupPage