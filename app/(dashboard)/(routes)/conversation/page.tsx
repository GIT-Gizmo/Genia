"use client"

import React, { useState } from 'react'
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useRouter } from "next/navigation"
import { MessageSquare } from 'lucide-react'

import { usePremiumModal } from '@/hooks/use-premium-modal'
import { cn } from "@/lib/utils"
import { formSchema } from "./constants"

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AIAvatar, UserAvatar } from '@/components/Avatar'

import Heading from '@/components/Heading'
import Empty from "@/components/Empty"
import { LogoSpinner } from '@/components/Loader'
import { useToast } from '@/components/Toast';

type Message = {
    role: "user" | "assistant";
    content: string;
}

const ConversationPage = () => {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([])
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
            const userMessage: Message = {
                role: "user",
                content: values.prompt,
            }

            const newMessages = [...messages, userMessage];

            const response = await axios.post("/api/conversation", {
                messages: values.prompt,
            });

            const aiMessage: Message = {
                role: "assistant",
                content: response.data.content,
            }

            setMessages([...newMessages, aiMessage]);

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
        <div className='bg-gray-800 w-full mx-auto md:my-10 px-4 md:px-32 lg:px-64'>
            <Heading
                title='Conversation'
                description='Chat with AI that&apos;s 10x smarter than your Cat (or Dog)'
                icon={MessageSquare}
                iconColor='text-violet-500'
                bgColor='bg-violet-500/10'
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
                                                placeholder="What is a banana's life goal?"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className="col-span-12 lg:col-span-2 w-full bg-violet-500 hover:bg-violet-500/10" disabled={isLoading}>
                                Chat
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-violet-500/10">
                            <LogoSpinner />
                        </div>
                    )}
                    {messages.length === 0 && !isLoading && (
                        <Empty
                            label="No converstion started yet. Quinox is resting."
                        />
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "p-8 w-full flex items-start gap-x-8 rounded-lg", message.role === "user" ? "bg-white/10 border-black/10" : "bg-black/10"
                                )}
                            >
                                {message.role === "user" ? <UserAvatar /> : <AIAvatar />}
                                <p className="text-sm text-zinc-300">
                                    {message.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConversationPage