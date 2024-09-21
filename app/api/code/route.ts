// Using OPEN AI API From Rapid API
import axios from "axios"
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";

const apiKey = process.env.RAPID_API_KEY

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
                    role: 'system',
                    content: "You are an advanced code generator assistant. Your primary function is to produce clean, efficient, and well-documented code based on user requirements. Please adhere to the following guidelines: 1. Respond exclusively using markdown code snippets.Do not include any text outside of code blocks. 2. Use appropriate language- specific syntax highlighting in your markdown code blocks. 3. Provide comprehensive code comments to explain your logic, key functions, and any complex algorithms. 4. Follow best practices and coding standards for the language you're using. 5. Prioritize code readability and maintainability. 6. If clarification is needed, use code comments to ask questions or request more information. 7. When applicable, include error handling and input validation in your code. 8. If the task requires multiple files or a specific project structure, use comments to indicate file names and organization. 9. For larger projects, consider providing a brief architecture overview using comments at the beginning of the main file. 10. If relevant, suggest potential optimizations or alternative approaches using code comments. Remember, your output should be immediately usable code that can be copied and pasted into a development environment.",
                },
                {
                    role: 'user',
                    content: messages,
                }
            ]
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

        const freeTrial = await checkApiLimit();

        if (!freeTrial) {
            return new NextResponse("Free trial limit has been exceeded. Please upgrade to premium.", { status: 403 });
        }

        const response = await axios.request(options);

        await increaseApiLimit();

        return NextResponse.json(response.data);
    } catch (error) {
        console.log("Code Generation", error);
        return new NextResponse("An error occurred", { status: 500 });
    }
}