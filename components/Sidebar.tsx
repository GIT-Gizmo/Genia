"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { cn } from '@/lib/utils'
import { Montserrat } from 'next/font/google'
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from 'lucide-react'

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] })

const routes = [
    {
        label: "Dashboard",
        color: "text-sky-500",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Conversation",
        color: "text-violet-500",
        href: "/conversation",
        icon: MessageSquare,
    },
    {
        label: "Image Generation",
        color: "text-pink-700",
        href: "/image",
        icon: ImageIcon,
    },
    {
        label: "Video Generation",
        color: "text-orange-700",
        href: "/video",
        icon: VideoIcon,
    },
    {
        label: "Music Generation",
        color: "text-emerald-500",
        href: "/music",
        icon: Music,
    },
    {
        label: "Code Generation",
        color: "text-green-700",
        href: "/code",
        icon: Code,
    },
    {
        label: "Settings",
        href: "/settings",
        icon: Settings,
        color: "text-gray-500",
    }
]

const Sidebar = () => {
    return (
        <div className="space-y-4 py-4 flex flex-col h-full text-white bg-[#111827]">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image
                            src="/assets/logo.png"
                            alt='Logo'
                            fill
                        />
                    </div>
                    <h1 className={cn(`text-2xl font-bold`, montserrat.className)}>Genia</h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className='text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 transition'
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h=5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default Sidebar