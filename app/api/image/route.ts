// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import Replicate from "replicate";

// const replicate = new Replicate({
//     auth: process.env.REPLICATE_API_TOKEN,
// });

// export async function POST(req: Request) {
//     const { userId } = auth()
//     const body = await req.json()
//     const { prompt, amount = "1", resolution = "512" } = body

//     try {
//         if (!userId) {
//             return new NextResponse("Unauthorized, please login.", { status: 401 });
//         }

//         if (!replicate) {
//             return new NextResponse("Unauthorized, API key required.", { status: 401 });
//         }

//         if (!prompt) {
//             return new NextResponse("Prompt is required.", { status: 400 });
//         }

//         if (!amount) {
//             return new NextResponse("Amount is required.", { status: 400 });
//         }

//         if (!resolution) {
//             return new NextResponse("Resolution is required.", { status: 400 });
//         }

//         const output = await replicate.run(
//             "bingbangboom-lab/flux-dreamscape:b761fa16918356ee07f31fad9b0d41d8919b9ff08f999e2d298a5a35b672f47e",
//             {
//                 input: {
//                     model: "dev",
//                     prompt: prompt,
//                     lora_scale: 1,
//                     num_outputs: parseInt(amount, 10),
//                     aspect_ratio: "1:1",
//                     height: parseInt(resolution, 10),
//                     width: parseInt(resolution, 10),
//                     output_format: "png",
//                     guidance_scale: 3.5,
//                     output_quality: 80,
//                     prompt_strength: 0.8,
//                     extra_lora_scale: 0.8,
//                     num_inference_steps: 28
//                 }
//             }
//         );

//         return NextResponse.json(output);
//     } catch (error) {
//         console.log("Image Generation", error);
//         return new NextResponse("An error occurred", { status: 500 });
//     }
// }


// Using LimeWire Image Generation API
// import axios from "axios"
// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";


// export async function POST(req: Request) {
//     const { userId } = auth();
//     const body = await req.json();
//     const { prompt, amount = "1", aspectRatio = "1:1" } = body;
//     const apiKey = process.env.LIMEWIRE_API_TOKEN;

//     try {
//         if (!userId) {
//             return new NextResponse("Unauthorized, please login.", { status: 401 });
//         }

//         if (!apiKey) {
//             return new NextResponse("Unauthorized, API key required. Na here I dey", { status: 401 });
//         }

//         if (!prompt) {
//             return new NextResponse("Prompt is required.", { status: 400 });
//         }

//         if (!amount) {
//             return new NextResponse("Amount is required.", { status: 400 });
//         }

//         if (!aspectRatio) {
//             return new NextResponse("Resolution is required.", { status: 400 });
//         }
//         const response = await axios.post(
//             `https://api.limewire.com/api/image/generation`,
//             {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-Api-Version': 'v1',
//                     Accept: 'application/json',
//                     Authorization: `Bearer ${apiKey}`
//                 },
//                 body: JSON.stringify({
//                     prompt: prompt,
//                     samples: parseInt(amount, 10),
//                     quality: 'MEDIUM',
//                     guidance_scale: 50,
//                     aspect_ratio: aspectRatio,
//                 })
//             }
//         );

//         const data = await response;
//         return NextResponse.json(data);
//     } catch (error: Error | any) {
//         console.log("Image Generation", error.response ? error.response.data : error.message);
//         return new NextResponse("An error occurred", { status: 500 });
//     }
// }


// Using OPEN AI API From Rapid API
import axios from "axios"
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const apiKey = process.env.RAPID_API_KEY

export async function POST(req: Request) {
    const { userId } = auth()
    const body = await req.json()
    const { prompt } = body

    const options = {
        method: 'POST',
        url: 'https://imageai-generator.p.rapidapi.com/image',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'imageai-generator.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            negative_prompt: '',
            prompt: prompt,
            hr_scale: 2
        }
    };

    try {
        if (!userId) {
            return new NextResponse("Unauthorized, please login.", { status: 401 });
        }

        if (!apiKey) {
            return new NextResponse("OpenAI API Key is not configured", { status: 500 });
        }

        if (!prompt) {
            return new NextResponse("Prompt is required.", { status: 400 });
        }

        const response = await axios.request(options);
        return NextResponse.json(response.data);
        console.log(response.data)
    } catch (error) {
        console.log("Image Generation", error);
        return new NextResponse("An error occurred", { status: 500 });
    }
}