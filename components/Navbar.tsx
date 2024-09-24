import React from 'react'
import { UserButton } from '@clerk/nextjs'
import { getApiLimitCount } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'

import MobileSidebar from './MobileSidebar'

const Navbar = async () => {
    const apiLimitCount = await getApiLimitCount()
    const isPremium = await checkSubscription();

    return (
        <div className='flex items-center p-4'>
            <MobileSidebar apiLimitCount={apiLimitCount} isPremium={isPremium} />
            <div className="flex w-full justify-end">
                <UserButton />
            </div>
        </div>
    )
}

export default Navbar