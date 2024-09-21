"use client"

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ArrowRight, Code, ImageIcon, MessageSquare, Music, VideoIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const tools = [
    {
        label: "Conversation",
        icon: MessageSquare,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        href: "/conversation",
    },
    {
        label: "Image Generation",
        color: "text-pink-700",
        bgColor: "bg-pink-700/10",
        href: "/image",
        icon: ImageIcon,
    },
    {
        label: "Video Generation",
        color: "text-orange-700",
        bgColor: "bg-orange-700/10",
        href: "/video",
        icon: VideoIcon,
    },
    {
        label: "Music Generation",
        color: "text-pink-500",
        bgColor: "bg-pink-500/10",
        href: "/music",
        icon: Music,
    },
    {
        label: "Code Generation",
        color: "text-[#00DDFF]",
        bgColor: "bg-[#00DDFF]/10",
        href: "/code",
        icon: Code,
    },
]

const DashboardPage = () => {
    const router = useRouter()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null;
    }

    return (
        <div className='space-y-4'>
            <div className="text-[#40A6F5] mb-0 space-y-4">
                <h2 className="text-2xl md:text-4xl font-bold text-center">
                    Explore the power of AI
                </h2>
                <p className="text-gray-400 text-muted-foreground font-light text-sm md:text-lg text-center">
                    Interact with advanced AI features – Unlock the potential of artificial intelligence.
                </p>
            </div>
            <div className="px-4 md:px-20 lg:px-32 space-y-4">
                {tools.map((tool) => (
                    <Card
                        onClick={() => router.push(tool.href)}
                        key={tool.href}
                        className='bg-gray-700 p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer'
                    >
                        <div className='flex items-center gap-x-4'>
                            <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                <tool.icon className={cn("w-8 h-8", tool.color)} />
                            </div>
                            <div className="font-semibold text-zinc-300">
                                {tool.label}
                            </div>
                        </div>
                        <ArrowRight className='w-5 h-5 text-gray-400' />
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default DashboardPage