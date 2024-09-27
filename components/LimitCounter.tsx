"use client"

import { useEffect, useState } from "react";

import { Card, CardContent } from "./ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { usePremiumModal } from "@/hooks/use-premium-modal";
import { Zap } from "lucide-react";

interface CounterProps {
    apiLimitCount: number;
    isPremium: boolean
}

const LimitCounter = ({ apiLimitCount = 0, isPremium = false }: CounterProps) => {
    const [mounted, setMounted] = useState(false);
    const premiumModal = usePremiumModal();

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    if (isPremium) {
        return null;
    }

    return (
        <div className="px-3">
            <Card className="bg-white/10 border-0">
                <CardContent className="py-3">
                    <div className="text-center text-sm text-white mb-4 space-y-2">
                        <p>{apiLimitCount} / {MAX_FREE_COUNTS} Free Usage Limit</p>

                        <Progress
                            className="h-3 text-purple-600"
                            value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
                        />
                    </div>

                    <Button
                        className="w-full"
                        variant={"premium"}
                        onClick={premiumModal.onOpen}
                    >
                        Upgrade
                        <Zap className="w-4 ml-2 fill-white" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default LimitCounter