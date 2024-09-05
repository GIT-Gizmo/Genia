// Using OPEN AI API From Rapid API
import axios from "axios"
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const apiKey = process.env.RAPID_API_KEY

export async function POST(req: Request) {
    const { userId } = auth()
    const body = await req.json()
    const { messages } = body

    const options = {
        method: 'POST',
        url: 'https://chatgpt-42.p.rapidapi.com/texttoimage',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            text: messages,
            width: 512,
            height: 512
        }
    };

    try {
        if (!userId) {
            return new NextResponse("Unauthorized, please login.", { status: 401 });
        }

        if (!apiKey) {
            return new NextResponse("OpenAI API Key is not configured", { status: 500 });
        }

        if (!messages) {
            return new NextResponse("Messages are required.", { status: 400 });
        }

        const response = await axios.request(options);
        return NextResponse.json(response.data);
    } catch (error) {
        console.log("Image Generation", error);
        return new NextResponse("An error occurred", { status: 500 });
    }
}