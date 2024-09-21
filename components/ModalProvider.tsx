"use client"

import { useEffect, useState } from "react"
import { PremiumModal } from "./PremiumModal"

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <PremiumModal />
        </>
    )
}