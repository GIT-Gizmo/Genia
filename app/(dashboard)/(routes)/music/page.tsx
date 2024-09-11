"use client"

import React, { useState } from 'react'
import * as z from "zod"
import { Music } from 'lucide-react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useRouter } from "next/navigation"

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formSchema } from "./constants"

import Heading from '@/components/Heading'
import Empty from "@/components/Empty"
import Loader from '@/components/Loader'

const MusicGenerationPage = () => {
    const router = useRouter();
    const [music, setMusic] = useState<string>()

    const form = useForm<z.infer<typeof formSchema>>(
        {
            resolver: zodResolver(formSchema),
            defaultValues: {
                prompt: ""
            }
        }
    )

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setMusic(undefined)

            const response = await axios.post("/api/music", values);

            setMusic(response.data.audio)

            form.reset();
        } catch (error) {
            console.log(error);
        } finally {
            router.refresh();
        }
    }

    return (
        <main className='bg-gray-800'>
            <Heading
                title='Music Generation'
                description='Hum a tune? Nah, just type it—let our AI drop the beat!'
                icon={Music}
                iconColor='text-pink-500'
                bgColor='bg-pink-500/10'
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)
                            }
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="A soundtrack for a squirrel on a mission"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className="col-span-12 lg:col-span-2 w-full bg-violet-500 hover:bg-violet-500/10" disabled={isLoading}>
                                Summon the melody
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}
                    {!music && !isLoading && (
                        <Empty
                            label="No music generated yet. Genia is resting."
                        />
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        Music
                    </div>
                </div>
            </div>
        </main>
    )
}

export default MusicGenerationPage