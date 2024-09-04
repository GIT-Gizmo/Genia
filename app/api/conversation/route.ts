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


// Using ChatGPT Pro API
// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import OpenAI from "openai"

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(req: Request) {
//     try {
//         const { userId } = auth()
//         const body = await req.json()
//         const { messages } = body

//         if (!userId) {
//             return new NextResponse("Unathorized, please login.", { status: 401 });
//         }

//         if (!openai.apiKey) {
//             return new NextResponse("OpenAI API Key is not configured", { status: 500 });
//         }

//         if (!messages) {
//             return new NextResponse("Messages are required.", { status: 400 });
//         }

//         const completion = await openai.chat.completions.create({
//             model: "gpt-4o-mini",
//             messages
//         });

//         return NextResponse.json(completion.choices[0].message);

//     } catch (error) {
//         console.log("[CONVERSATION_ERROR]", error);
//         return new NextResponse("Internal server error", { status: 500 });
//     }
// }




// Using Google Gemini AI API
// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server"
// const { GoogleGenerativeAI } = require("@google/generative-ai");


// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// export async function POST(req: Request) {
//     const { userId } = auth()
//     const body = await req.json()
//     const { messages } = body

//     try {
//         if (!userId) {
//             return new NextResponse("Unauthorized, please login.", { status: 401 });
//         }

//         if (!genAI) {
//             return new NextResponse("GeminiAI API Key is not configured", { status: 500 });
//         }

//         if (!messages) {
//             return new NextResponse("Messages are required.", { status: 400 });
//         }

//         if (req.method !== 'POST') {
//             return new NextResponse("Method Not Allowed", { status: 405 });
//         }

//         const prompt = messages

//         const result = await model.generateContent(prompt);
//         const response = await result.response;
//         const text = response.text();

//         return NextResponse.json(text);

//     } catch (error) {
//         console.log("[CONVERSATION_ERROR]", error);
//         return new NextResponse("Internal server error", { status: 500 });
//     }
// }



// Using Anthropic(Claude AI) API
// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import Anthropic from "@anthropic-ai/sdk";

// const anthropic = new Anthropic({
//     apiKey: process.env.ANTHROPIC_API_KEY,
// });

// export async function POST(req: Request) {
//     try {
//         const { userId } = auth()
//         const body = await req.json()
//         const { messages } = body

//         if (!userId) {
//             return new NextResponse("Unathorized, please login.", { status: 401 });
//         }

//         if (!anthropic.apiKey) {
//             return new NextResponse("Anthropic API Key is not configured", { status: 500 });
//         }

//         if (!messages) {
//             return new NextResponse("Messages are required.", { status: 400 });
//         }

//         const msg = await anthropic.messages.create({
//             model: "claude-3-5-sonnet-20240620",
//             max_tokens: 1000,
//             temperature: 0,
//             messages: []
//         });

//         return NextResponse.json(msg);

//     } catch (error) {
//         console.log("[CONVERSATION_ERROR]", error);
//         return new NextResponse("Internal server error", { status: 500 });
//     }
// }