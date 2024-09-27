"use client"

import { useState } from "react"
import { UserButton } from "@clerk/nextjs";
import { Code2, ImageIcon, LayoutDashboard, MessageSquare, Music4, VideoIcon, Settings, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import LimitCounter from "@/components/LimitCounter";
import CircleProgressBar from "@/components/ui/circle-progress-bar";

interface CounterProps {
    apiLimitCount: number;
    isPremium: boolean;
    children?: React.ReactNode;
}

export function DashboardSidebar({ apiLimitCount, isPremium, children }: CounterProps) {

    const links = [
        {
            label: "Dashboard",
            href: "dashboard",
            icon: (
                <LayoutDashboard className="text-neutral-500 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Conversation",
            href: "conversation",
            icon: (
                <MessageSquare className="text-violet-500 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Image Generation",
            href: "image",
            icon: (
                <ImageIcon className="text-pink-700 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Video Generation",
            href: "/image",
            icon: (
                <VideoIcon className="text-orange-700 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Music Generation",
            href: "/music",
            icon: (
                <Music4 className="text-pink-500 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Code Generation",
            href: "/code",
            icon: (
                <Code2 className="text-[#00DDFF] dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
    ];
    const [open, setOpen] = useState(false);

    return (
        <div
            className={cn(
                "rounded-md flex flex-col md:flex-row bg-gray-800 w-full flex-1 border overflow-hidden",
                "h-screen"
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col overflow-y-auto overflow-x-hidden">
                        <SidebarLink
                            link={{
                                label: "Profile",
                                href: "",
                                icon: <UserButton />
                            }}
                            className='md:hidden'
                        />
                        <SidebarLink
                            link={{
                                element: <LimitCounter apiLimitCount={apiLimitCount} isPremium={isPremium} />,
                                href: "/subscription",
                                icon: (
                                    <CircleProgressBar
                                        value={apiLimitCount}
                                        size={40}
                                        strokeWidth={5}
                                        textColor="#9333ea"
                                    />
                                ),
                            }}
                        />
                        <SidebarLink
                            link={{
                                label: "Manage subscription",
                                href: "/subscription",
                                icon: <Settings className="text-neutral-700 dark:text-neutral-200 flex-shrink-0" />
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>

            {children}
        </div>
    );
}
export const Logo = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <Image
                src="/assets/logo.png"
                alt='Logo'
                width={30}
                height={30}
            />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-white whitespace-pre"
            >
                Genia
            </motion.span>
        </Link>
    );
};
export const LogoIcon = () => {
    return (
        <Image
            src="/assets/logo.png"
            alt='Logo'
            width={30}
            height={30}
        />
    );
};