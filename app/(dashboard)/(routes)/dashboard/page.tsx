"use client"

import { Card } from '@/components/ui/card'
import { features } from '@/data'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

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
            <div className="text-blue-500 mb-0 space-y-4">
                <h2 className="text-2xl md:text-4xl font-bold text-center">
                    Explore the power of AI
                </h2>
                <p className="text-gray-400 text-muted-foreground font-light mx-auto text-sm md:text-lg text-center">
                    Unlock the potential of artificial intelligence with advanced features.
                </p>
            </div>
            <div className="px-4 md:px-20 lg:px-32 space-y-4">
                {features.map(({ label, href, color, bgColor, Icon }) => (
                    <Card
                        onClick={() => router.push(href)}
                        key={href}
                        className='bg-transaparent hover:bg-gray-900/50 p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer'
                    >
                        <div className='flex items-center gap-x-4 rounded-sm'>
                            <div className={cn("p-2 w-fit rounded-md", bgColor)}>
                                <Icon className={cn("w-8 h-8", color)} />
                            </div>
                            <div className="font-semibold text-zinc-300">
                                {label}
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