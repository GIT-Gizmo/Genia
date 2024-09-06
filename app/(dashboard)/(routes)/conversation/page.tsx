"use client"

import React, { useState } from 'react'
import * as z from "zod"
import { MessageSquare } from 'lucide-react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useRouter } from "next/navigation"

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formSchema } from "./constants"
import { cn } from "@/lib/utils"
import { AIAvatar, UserAvatar } from '@/components/Avatar'

import Heading from '@/components/Heading'
import Empty from "@/components/Empty"
import Loader from '@/components/Loader'

type Message = {
    content: string;
    role: "user" | "assistant"
}

const ConversationPage = () => {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([])

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
                content: values.prompt,
                role: "user"
            }

            const newMessages = [...messages, userMessage];

            const response = await axios.post("/api/conversation", {
                messages: newMessages.map(msg => msg.content),
            });

            const aiMessage: Message = {
                content: response.data.response,
                role: "assistant"
            }

            setMessages([...newMessages, aiMessage]);

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
                                Ask AI
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
                    {messages.length === 0 && !isLoading && (
                        <Empty
                            label="No converstion started yet. Genia is resting."
                        />
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "p-8 w-full flex items-start gap-x-8 rounded-lg", message.role === "user" ? "bg-white border-black/10" : "bg-muted"
                                )}
                            >
                                {message.role === "user" ? <UserAvatar /> : <AIAvatar />}
                                <p className="text-sm">
                                    {message.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ConversationPage