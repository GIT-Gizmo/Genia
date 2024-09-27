"use client"

import React, { useState } from 'react'
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useRouter } from "next/navigation"
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Code, Copy, Check } from 'lucide-react'

import { usePremiumModal } from '@/hooks/use-premium-modal'
import { formSchema } from "./constants"
import { cn } from "@/lib/utils"

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AIAvatar, UserAvatar } from '@/components/Avatar'

import Heading from '@/components/Heading'
import Empty from "@/components/Empty"
import { LogoSpinner } from '@/components/Loader'
import { useToast } from '@/components/Toast';

type Message = {
    content: string;
    role: "user" | "assistant"
}

const CodeGenerationPage = () => {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([])
    const [copied, setCopied] = useState<string | null>(null)
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
                content: values.prompt,
                role: "user"
            }

            const newMessages = [...messages, userMessage];

            const response = await axios.post("/api/code", {
                messages: values.prompt
            });

            const aiMessage: Message = {
                content: response.data.choices[0].message.content,
                role: "assistant"
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

    const handleCopy = (content: string) => {
        setCopied(content);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className='bg-gray-800 w-full mx-auto md:my-10 px-4 md:px-32 lg:px-64'>
            <Heading
                title='Code Generation'
                description='Got a coding itch? Scratch it with your coding sidekick'
                icon={Code}
                iconColor='text-[#00DDFF]'
                bgColor='bg-[#00DDFF]/10'
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
                                                placeholder="Code to convince my cat to stop sitting on my keyboard."
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className="col-span-12 lg:col-span-2 w-full bg-[#00DDFF]/30 hover:bg-[#00DDFF]/10" disabled={isLoading}>
                                Summon the code
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
                    {messages.length === 0 && !isLoading && (
                        <Empty
                            label="No prompt yet. Genia is resting."
                        />
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "w-full flex items-start gap-x-1 rounded-lg", message.role === "user" ? "gap-x-8 py-8 bg-black/10 border-black/10" : ""
                                )}
                            >
                                {message.role === "user" ? <UserAvatar /> : <AIAvatar />}
                                <div className="w-full text-sm flex-1 overflow-hidden">
                                    {message.role === "user" ? (
                                        <p className='text-zinc-300'>{message.content}</p>
                                    ) : (
                                        <ReactMarkdown
                                            components={{
                                                // @ts-ignore
                                                code({ node, inline, className, children, ...props }) {
                                                    const match = /language-(\w+)/.exec(className || '')
                                                    const codeContent = String(children).replace(/\n$/, '');
                                                    return !inline && match ? (
                                                        <div className="relative">
                                                            <SyntaxHighlighter
                                                                // @ts-ignore
                                                                style={atomDark}
                                                                language={match[1]}
                                                                PreTag="div"
                                                                {...props}
                                                            >
                                                                {codeContent}
                                                            </SyntaxHighlighter>
                                                            <CopyToClipboard text={codeContent} onCopy={() => handleCopy(codeContent)}>
                                                                <button
                                                                    className="absolute top-2 right-2 p-1 text-xs bg-gray-800 text-white rounded"
                                                                    aria-label="Copy code to clipboard"
                                                                >
                                                                    {copied === codeContent ? <Check size={16} /> : <Copy size={16} />}
                                                                </button>
                                                            </CopyToClipboard>
                                                        </div>
                                                    ) : (
                                                        <code {...props} className={className}>
                                                            {children}
                                                        </code>
                                                    )
                                                }
                                            }}
                                            className="text-sm overflow-hidden"
                                        >
                                            {message.content}
                                        </ReactMarkdown>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CodeGenerationPage;