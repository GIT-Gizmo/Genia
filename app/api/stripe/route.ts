import { auth, currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"
import { stripe } from "@/lib/stripe"
import { absoluteUrl } from "@/lib/utils"

const settingsUrl = absoluteUrl("/subscription")

export async function GET() {
    try {
        const { userId } = auth();
        const user = await currentUser();

        if (!userId || !user) {
            return new NextResponse("Unathorized access", { status: 400 });
        }

        const userSubscription = await prismadb.userSubscription.findUnique({
            where: { userId }
        });

        if (userSubscription && userSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingsUrl,
            })

            return new NextResponse(JSON.stringify({ url: stripeSession.url }));
        }

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: "Genia Premium",
                            description: "With Genia Premium subscription, get access to unlimited conversation queries and code generations, 75 AI - generated images, 3 short videos, and 50 music tracks monthly. Perfect for creators and developers!",
                        },
                        unit_amount: 500,
                        recurring: {
                            interval: "month"
                        }
                    },
                    quantity: 1,
                }
            ],
            metadata: {
                userId,
            },
        })

        return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    } catch (error) {
        console.log("[STRIPE_ERROR]", error)
        return new NextResponse("Internal server error", { status: 500 });
    }
}