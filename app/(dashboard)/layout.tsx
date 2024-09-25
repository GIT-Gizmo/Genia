import { getApiLimitCount } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription';

import Navbar from '@/components/Navbar'
import { SidebarNav } from '@/components/Sidebar'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {

    const apiLimitCount = await getApiLimitCount();
    const isPremium = await checkSubscription()

    return (
        <div className='h-full relative bg-gray-800'>
            <div className="hidden h-full md:flex w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
                <div>
                    <SidebarNav apiLimitCount={apiLimitCount} isPremium={isPremium} />
                </div>
            </div>

            <main className="md:pl-72">
                <Navbar />
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout