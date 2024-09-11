import * as z from "zod"

export const formSchema = z.object({
    prompt: z.string().min(1, {
        message: "Music prompt is required.",
    }),
    amount: z.string().min(1),
    resolution: z.string().min(1),
})