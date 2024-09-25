import React from 'react'

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col overflow-hidden bg-[#000319]">
            <main className="flex-1">{children}</main>
        </div>
    )
}

export default LandingLayout