"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Code2, ImageIcon, LayoutDashboard, MessageSquare, Music4, VideoIcon, Settings } from "lucide-react";
import CircleProgressBar from "./ui/circle-progress-bar";
import LimitCounter from "./LimitCounter";
import Image from "next/image";

interface CounterProps {
    apiLimitCount: number;
    isPremium: boolean
}

export function SidebarNav({ apiLimitCount, isPremium }: CounterProps) {
    const links = [
        {
            label: "Dashboard",
            href: "#",
            icon: (
                <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Conversation",
            href: "#",
            icon: (
                <MessageSquare className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Image",
            href: "#",
            icon: (
                <ImageIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Video",
            href: "#",
            icon: (
                <VideoIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Music",
            href: "#",
            icon: (
                <Music4 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Code",
            href: "#",
            icon: (
                <Code2 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
    ];
    const [open, setOpen] = useState(false);
    return (
        <>
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
                    <div>
                        <SidebarLink
                            link={{
                                element: <LimitCounter apiLimitCount={apiLimitCount} isPremium={isPremium} />,
                                href: "#",
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
                                label: "Settings",
                                href: "/settings",
                                icon: <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
        </>
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
                fill
            />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-black dark:text-white whitespace-pre"
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
            fill
        />
    );
};