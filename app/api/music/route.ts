// Using Free Hard Limited OPEN AI API from Rapid API
// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import axios from "axios"

// const apiKey = process.env.MUBERT_API_KEY;

// export async function POST(req: Request) {
//     const { userId } = auth()
//     const body = await req.json()
//     const { prompt } = body

//     const response = await axios.post(
//         // `https://mubert-api.mubert.com/v1/process`,
//         `https://api-b2b.mubert.com/v2/TTMRecordTrack`,
//         {
//             "method": "TTMRecordTrack",
//             "params":
//             {
//                 "text": prompt,
//                 "pat": apiKey,
//                 "mode": "track",
//                 "duration": "60",
//                 "bitrate": "192"
//             }
//         }
//     )

//     try {
//         if (!userId) {
//             return new NextResponse("Unathorized, please login.", { status: 401 });
//         }

//         if (!apiKey) {
//             return new NextResponse("OpenAI API Key is not configured", { status: 500 });
//         }

//         if (!prompt) {
//             return new NextResponse("Messages are required.", { status: 400 });
//         }

//         return NextResponse.json(response.data);

//     } catch (error) {
//         console.error("Conversation", error);
//     }
// }

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
            "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
            {
                input: {
                    alpha: 0.5,
                    prompt_a: prompt,
                    denoising: 0.75,
                    seed_image_id: "vibes",
                    num_inference_steps: 50
                }
            }
        );

        if (!isPremium) {
            await increaseApiLimit();
        }

        return NextResponse.json(response);

    } catch (error) {
        console.error("Conversation", error);
    }
}