"use client"

import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Montserrat } from 'next/font/google'
import { usePathname } from 'next/navigation'
import LimitCounter from './LimitCounter'
import { tools } from '@/data'
import { MessageSquare } from 'lucide-react'

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] })

interface SidebarProps {
    apiLimitCount: number;
    isPremium: boolean
}

const Sidebar = ({ apiLimitCount = 0, isPremium = false }: SidebarProps) => {
    const pathname = usePathname()

    return (
        <div className="py-1 sm:py-4 flex flex-col sm:justify-between h-full text-zinc-400 bg-[#111827]">
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
                    <Link
                        href="/dashboard"
                        className={cn('text-sm group flex p-3 w-full rounded-md justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 transition',
                            pathname === "/dashboard" ? "bg-white/10" : "",
                        )}
                    >
                        <div className="flex items-center flex-1">
                            <MessageSquare className={cn("h=5 w-5 mr-3")} />
                            Dashboard
                        </div>
                    </Link>
                    {tools.map(({ label, href, color, Icon }) => (
                        <Link
                            key={label}
                            href={href}
                            className={cn('text-sm group flex p-3 w-full rounded-md justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 transition',
                                pathname === href ? "bg-white/10" : "",
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <Icon className={cn("h=5 w-5 mr-3", color)} />
                                {label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <LimitCounter apiLimitCount={apiLimitCount} isPremium={isPremium} />
        </div >
    )
}

export default Sidebar