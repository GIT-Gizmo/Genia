import * as z from "zod"

export const formSchema = z.object({
    prompt: z.string().min(1, {
        message: "Image prompt is required.",
    }),
    // amount: z.string().min(1),
    resolution: z.string().min(1),
})

// export const amountOptions = [
//     {
//         value: "1",
//         label: "1 Photo",
//     },
//     {
//         label: "2 Photos",
//         value: "2",
//     },
//     {
//         value: "3",
//         label: "3 Photos",
//     },
//     {
//         value: "4",
//         label: "4 Photos",
//     },
//     {
//         value: "5",
//         label: "5 Photos",
//     },
// ]

export const resolutionOptions = [
    {
        value: "256",
        label: "256x256",
    },
    {
        value: "512",
        label: "512x512",
    },
    {
        value: "1024",
        label: "1024x1024",
    },
]

// export const aspectRatioOptions = [
//     {
//         value: "1:1",
//         label: "1:1",
//     },
//     {
//         label: "2:3",
//         value: "2:3",
//     },
//     {
//         value: "3:2",
//         label: "3:2",
//     },
//     {
//         value: "3:4",
//         label: "3:4",
//     },
//     {
//         value: "4:3",
//         label: "4:3",
//     },
//     {
//         value: "4:5",
//         label: "4:5",
//     },
//     {
//         value: "5:4",
//         label: "5:4",
//     },
//     {
//         value: "16:9",
//         label: "16:9",
//     },
//     {
//         value: "9:16",
//         label: "9:16",
//     },
//     {
//         value: "9:21",
//         label: "9:21",
//     },
//     {
//         value: "21:9",
//         label: "21:9",
//     },
// ]