// Using Free Hard Limited OPEN AI API from Rapid API
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import axios from "axios"

const apiKey = process.env.RAPID_API_KEY;

export async function POST(req: Request) {
    const { userId } = auth()
    const body = await req.json()
    const { messages } = body

    const options = {
        method: 'POST',
        url: 'https://open-ai25.p.rapidapi.com/ask',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'open-ai25.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            query: messages
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

        const response = await axios.request(options);
        return NextResponse.json(response.data);

    } catch (error) {
        console.error(error);
    }
}