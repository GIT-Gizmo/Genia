import { Settings } from 'lucide-react'
import React from 'react'

import Heading from '@/components/Heading'
import { checkSubscription } from '@/lib/subscription'
import SubscriptionButton from '@/components/SubscriptionButton'

const SettingsPage = async () => {
    const isPremium = await checkSubscription();

    return (
        <div className='bg-gray-800 w-full mx-auto md:my-10 px-4 md:px-32 lg:px-64'>
            <Heading
                title='Settings'
                description='Manage your subscription settings'
                icon={Settings}
                iconColor='text-blue-500'
                bgColor='bg-blue-500/10'
            />

            <div className="px-4 space-y-4 lg:px-8">
                <div className="text-zinc-300 text-sm">
                    {isPremium ? "You are currently subscribed to Quinox Premium plan." : "You are currently on a free plan. Upgrade to Quinox Premium plan."}
                </div>

                <SubscriptionButton isPremium={isPremium} />
            </div>
        </div>
    )
}

export default SettingsPage