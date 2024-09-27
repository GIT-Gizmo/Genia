import React from 'react'
import { UserButton } from '@clerk/nextjs';
import { DashboardSidebar } from '@/components/Sidebar';
import { getApiLimitCount } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';


export default async function DashboardLayout({ children }: {
    children: React.ReactNode
}) {
    const apiLimitCount = await getApiLimitCount();
    const isPremium = await checkSubscription();

    return (
        <main>
            <div className='h-full relative'>
                <div className="absolute right-0 top-0 hidden md:flex w-full items-center justify-end p-4 md:pl-72">
                    <UserButton />
                </div>
                <DashboardSidebar apiLimitCount={apiLimitCount} isPremium={isPremium}>
                    {children}
                </DashboardSidebar>
            </div>
        </main>
    )
}