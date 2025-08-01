"use client"

import { Model } from "@/components/model"
import { useStoreModel } from "@/hooks/use-store-model"

export const StoreModal = () => { 

const storeModal = useStoreModel()

    return (
        <Model title="Create a new Store" description="Create a new store to manage your products and orders." isOpen={storeModal.isOpen} onClose={storeModal.onClose}>

            Form to create the store 

        </Model>
    )
    
}