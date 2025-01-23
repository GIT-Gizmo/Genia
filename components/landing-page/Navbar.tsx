"use client"

import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs"
import { Montserrat } from "next/font/google"
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const font = Montserrat({
    weight: "600",
    subsets: ["latin"],
});

const Navbar = () => {
    const { isSignedIn } = useAuth();

    return (
        <nav className='p-4 bg-transparent flex items-center justify-between lg:mx-6 relative z-[9999]'>
            <Link href="/" className="flex items-center">
                <div className="relative h-8 w-8 mr-4">
                    <Image
                        src="/assets/logo.png"
                        alt="Logo"
                        fill
                    />
                </div>

                <h1 className={cn("text-2xl font-bold text-white", font.className)}>
                    Quinox
                </h1>
            </Link>

            <div className="flex items-center gap-x-2">
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button className="bg-purple-500">
                        Get Started
                    </Button>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar