// Using Free Hard Limited OPEN AI API from Rapid API
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import axios from "axios"

const apiKey = process.env.MUBERT_API_KEY;

export async function POST(req: Request) {
    const { userId } = auth()
    const body = await req.json()
    const { prompt } = body

    const response = await axios.post(
        // `https://mubert-api.mubert.com/v1/process`,
        `https://api-b2b.mubert.com/v2/TTMRecordTrack`,
        {
            "method": "TTMRecordTrack",
            "params":
            {
                "text": prompt,
                "pat": apiKey,
                "mode": "track",
                "duration": "60",
                "bitrate": "192"
            }
        }
    )

    try {
        if (!userId) {
            return new NextResponse("Unathorized, please login.", { status: 401 });
        }

        if (!apiKey) {
            return new NextResponse("OpenAI API Key is not configured", { status: 500 });
        }

        if (!prompt) {
            return new NextResponse("Messages are required.", { status: 400 });
        }

        return NextResponse.json(response.data);

    } catch (error) {
        console.error("Conversation", error);
    }
}