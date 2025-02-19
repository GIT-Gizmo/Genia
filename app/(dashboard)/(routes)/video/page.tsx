"use client"

import React, { useState } from 'react'
import * as z from "zod"
import { Video } from 'lucide-react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useRouter } from "next/navigation"

import { usePremiumModal } from '@/hooks/use-premium-modal'
import { formSchema } from "./constants"

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import Heading from '@/components/Heading'
import Empty from "@/components/Empty"
import { LogoSpinner } from '@/components/Loader'
import { useToast } from '@/components/Toast';

const VideoGenerationPage = () => {
    const router = useRouter();
    const [video, setVideo] = useState<string>()
    const premiumModal = usePremiumModal()
    const { showErrorToast } = useToast();

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
            setVideo(undefined)

            const response = await axios.post("/api/video", values);

            setVideo(response.data[0])

            form.reset();
        } catch (error: any) {
            if (error?.response?.status === 403) {
                premiumModal.onOpen();
            } else {
                console.log(error);
                showErrorToast('An error occurred. Check your internet connection.');
            }
        } finally {
            router.refresh();
        }
    }

    return (
        <main className='bg-gray-800 w-full mx-auto md:my-10 px-4 md:px-32 lg:px-64'>
            <Heading
                title='Video Generation'
                description='Your director, producer, and special effects wizard all in one.'
                icon={Video}
                iconColor='text-orange-700'
                bgColor='bg-orange-700/10'
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
                                                placeholder="Generate a video of a turtle training for a marathon"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className="col-span-12 lg:col-span-2 w-full bg-violet-500 hover:bg-violet-500/10" disabled={isLoading}>
                                Summon the frames
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <LogoSpinner />
                        </div>
                    )}
                    {!video && !isLoading && (
                        <Empty
                            label="No video generated yet. Quinox is resting."
                        />
                    )}
                    {video && (
                        <video src={video} className="w-full aspect-video mt-8 rounded-lg border bg-video"></video>
                    )}
                </div>
            </div>
        </main>
    )
}

export default VideoGenerationPage