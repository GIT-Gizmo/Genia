"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import axios from "axios"
import * as z from "zod"
import { Download, ImageIcon } from 'lucide-react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

import { usePremiumModal } from '@/hooks/use-premium-modal'
import { formSchema } from "./constants"

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardFooter } from '@/components/ui/card'

import Heading from '@/components/Heading'
import Empty from "@/components/Empty"
import { LogoSpinner } from '@/components/Loader'
import { useToast } from '@/components/Toast';

const ImageGenerationPage = () => {
    const router = useRouter();
    const [image, setImage] = useState("")
    const premiumModal = usePremiumModal()
    const { showErrorToast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>(
        {
            resolver: zodResolver(formSchema),
            defaultValues: {
                prompt: "",
            }
        }
    )

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {

            const response = await axios.post("/api/image", values);

            console.log("API response:", response.data);

            if (response.data) {
                const base64Image = response.data;
                const imageUrl = `data:image/png;base64,${base64Image}`;
                setImage(imageUrl);
            } else {
                console.error("Unexpected API response format:", response.data);
            }

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
    };

    const handleDownload = async (imageUrl: string) => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = 'generated-image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };

    return (
        <div className='bg-gray-800 w-full mx-auto md:my-10 px-4 md:px-32 lg:px-64'>
            <Heading
                title='Image Generation'
                description='Think it, type it, boom—AI art magic!'
                icon={ImageIcon}
                iconColor='text-pink-600'
                bgColor='bg-pink-600/10'
            />
            <div className="px-4 gap-4 lg:px-8">
                <div className='mb-2'>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)
                            }
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm"
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-6">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="An image of my dog winning an Oscar"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className="bg-pink-600 hover:bg-pink-600/80 col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                Summon the pixels
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-20">
                            <LogoSpinner />
                        </div>
                    )}
                    {image.length === 0 && !isLoading && (
                        <Empty
                            label="No images generated yet. Genia is resting."
                        />
                    )}
                    {image && (
                        <div className="p-10">
                            <Card
                                className="rounded-lg overflow-hidden"
                            >
                                <div className="relative aspect-square">
                                    <Image
                                        src={image}
                                        fill
                                        alt="Image"
                                    />
                                </div>
                                <CardFooter className="p-2 bg-gray-700">
                                    <Button
                                        onClick={() => handleDownload(image)}
                                        variant="secondary"
                                        className="w-full bg-gray-800 text-white"
                                    >
                                        <Download className='h-4 w-4 mr-2' />
                                        Download
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ImageGenerationPage;