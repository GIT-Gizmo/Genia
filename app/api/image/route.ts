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
            width: 512,
            height: 512,
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
    } catch (error) {
        console.log("Image Generation", error);
        return new NextResponse("An error occurred", { status: 500 });
    }
}