"use client";

import axios from 'axios';
import { useState } from 'react'
import { Zap } from 'lucide-react';

import { Button } from './ui/button';
import { useToast } from '@/components/Toast';

interface SubscriptionButtonProps {
    isPremium: boolean;
}

const SubscriptionButton = ({ isPremium = false }: SubscriptionButtonProps) => {
    const [loading, setLoading] = useState(false)
    const { showErrorToast } = useToast();

    const handleClick = async () => {
        try {
            setLoading(true)
            const response = await axios.get("/api/stripe")

            window.location.href = response.data.url;
        } catch (error) {
            showErrorToast("An error occured while communicating with Stripe. Try again.")
            console.log("BILLING ERROR", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button
            variant={isPremium ? "default" : "premium"}
            onClick={handleClick}
            disabled={loading}
            className="bg-blue-600/90 hover:bg-blue-700/40 rounded-sm"
        >
            {isPremium ? "Manage Subscription" : "Upgrade to premium"}
            {!isPremium && <Zap className="w-4 h-4 fill-white ml-2" />}
        </Button>
    )
}

export default SubscriptionButton