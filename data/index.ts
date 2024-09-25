import { Code2, ImageIcon, MessageSquare, Music4, VideoIcon } from 'lucide-react'

export const tools = [
    {
        label: "Conversation",
        Icon: MessageSquare,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        href: "/conversation",
    },
    {
        label: "Image Generation",
        color: "text-pink-700",
        bgColor: "bg-pink-700/10",
        href: "/image",
        Icon: ImageIcon,
    },
    {
        label: "Video Generation",
        color: "text-orange-700",
        bgColor: "bg-orange-700/10",
        href: "/video",
        Icon: VideoIcon,
    },
    {
        label: "Music Generation",
        color: "text-pink-500",
        bgColor: "bg-pink-500/10",
        href: "/music",
        Icon: Music4,
    },
    {
        label: "Code Generation",
        color: "text-[#00DDFF]",
        bgColor: "bg-[#00DDFF]/10",
        href: "/code",
        Icon: Code2,
    },
]