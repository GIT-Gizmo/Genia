// Using Free Hard Limited OPEN AI API from Rapid API
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import axios from "axios"

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";

const apiKey = process.env.RAPID_API_KEY;

export async function POST(req: Request) {
    const { userId } = auth()
    const body = await req.json()
    const { messages } = body

    const options = {
        method: 'POST',
        url: 'https://chatgpt-best-price.p.rapidapi.com/v1/chat/completions',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'chatgpt-best-price.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'user',
                    content: messages,
                }
            ]
        }
    };

    try {
        if (!userId) {
            return new NextResponse("Unathorized, please login.", { status: 401 });
        }

        if (!apiKey) {
            return new NextResponse("OpenAI API Key is not configured", { status: 500 });
        }

        if (!messages) {
            return new NextResponse("Messages are required.", { status: 400 });
        }

        const freeTrial = await checkApiLimit();

        if (!freeTrial) {
            return new NextResponse("Free trial limit has been exceeded. Please upgrade to premium.", { status: 403 });
        }

        const response = await axios.request(options);

        await increaseApiLimit();

        return NextResponse.json(response.data.choices[0].message);

    } catch (error) {
        console.error("Conversation", error);
    }
}