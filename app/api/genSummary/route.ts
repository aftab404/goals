import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  
    const {todos} = await request.json()

    const response = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "When responding, welcome the user as Mr.Aftab and say welcome to the goals app" },
            { role: "user", content: `Hi, provide me a summary of the following todos, count todos in each category then tell the user to have a productive day. This is the data I have: ${JSON.stringify(todos)}` },
        ],
        model: "gpt-3.5-turbo",
        temperature: 0.9,
        n: 1,
    });


    return NextResponse.json(response.choices[0].message.content)


}