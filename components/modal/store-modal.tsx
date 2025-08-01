"use client"

import { Model } from "@/components/model"
import { useStoreModel } from "@/hooks/use-store-model"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
const formSchema = z.object({
    name: z.string().min(3, { message: "store name should be minimum 3 charachter" })
})

export const StoreModal = () => {
    const storeModal = useStoreModel()
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ''
        }
    })

    const onSubmit = async (value: z.infer<typeof formSchema>) => {
        console.log(value)
    }

    return (
        <Model title="Create a new Store" description="Create a new store to manage your products and orders." isOpen={storeModal.isOpen} onClose={storeModal.onClose}>

            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading}
                                            placeholder="your store name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            />
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button disabled={isLoading} type="button" variant={"outline"} size={"sm"}>Cansel</Button>
                                <Button disabled={isLoading} type="submit">Continue</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>

        </Model>
    )

}