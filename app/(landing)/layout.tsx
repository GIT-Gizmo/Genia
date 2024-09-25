import Script from 'next/script'
import React from 'react'

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col overflow-hidden bg-[#111827]">
            <main className="flex-1">{children}</main>

            <Script id="chatway" strategy="lazyOnload" src="https://cdn.chatway.app/widget.js?id=sT8Dxxpw9QsB" />
        </div>
    )
}

export default LandingLayout