"use client"

import axios from "axios";
import { useState } from "react";

import { usePremiumModal } from "@/hooks/use-premium-modal";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Badge } from "./ui/badge";
import { tools } from "@/data";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Check, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from '@/components/Toast';

export const PremiumModal = () => {
    const premiumModal = usePremiumModal();
    const [loading, setLoading] = useState(false)
    const { showErrorToast } = useToast();

    const onSubscribe = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/stripe");

            window.location.href = response.data.url
        } catch (error) {
            console.log(error);
            showErrorToast('An error occurred while communicating with Stripe. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={premiumModal.isOpen} onOpenChange={premiumModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                        <div className="flex items-center gap-x-2 font-bold py-1">
                            Upgrade to Genia
                            <Badge className="uppercase text-sm py-1" variant="premium">
                                premium
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-center py-2 space-y-2 text-zinc-900 font-medium">
                        {tools.map(({ label, bgColor, color, Icon }) => (
                            <Card
                                key={label}
                                className="p-3 border-black/5 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-x-4">
                                    <div className={cn("p-2 w-fit rounded-md", bgColor)}>
                                        <Icon className={cn("w-6 h-6", color)} />
                                    </div>
                                    <div className="font-semibold text-sm">
                                        {label}
                                    </div>
                                </div>
                                <Check className="text-primary w-5 h-5" />
                            </Card>
                        ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        onClick={onSubscribe}
                        disabled={loading}
                        size="lg"
                        variant="premium"
                        className="w-full"
                    >
                        Upgrade
                        <Zap className="w-4 h-4 ml-2 fill-white" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}