// Replicate Riffusion API
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
    const { userId } = auth()
    const body = await req.json()
    const { prompt } = body

    try {
        if (!userId) {
            return new NextResponse("Unathorized, please login.", { status: 401 });
        }

        if (!replicate) {
            return new NextResponse("OpenAI API Key is not configured", { status: 500 });
        }

        if (!prompt) {
            return new NextResponse("Messages are required.", { status: 400 });
        }

        const freeTrial = await checkApiLimit();
        const isPremium = await checkSubscription();

        if (!freeTrial && !isPremium) {
            return new NextResponse("Free trial limit has been exceeded. Please upgrade to premium.", { status: 403 });
        }

        const response = await replicate.run(
            "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
            {
                input: {
                    fps: 24,
                    model: "xl",
                    width: 1024,
                    height: 576,
                    prompt: prompt,
                    batch_size: 1,
                    num_frames: 24,
                    init_weight: 0.5,
                    guidance_scale: 17.5,
                    negative_prompt: "",
                    remove_watermark: false,
                    num_inference_steps: 50
                }
            }
        );

        if (!isPremium) {
            await increaseApiLimit();
        }

        return NextResponse.json(response);

    } catch (error) {
        console.error("Video AI", error);
    }
}