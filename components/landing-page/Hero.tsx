import { Rocket } from "lucide-react"
import { BackgroundLines } from "../ui/background-lines"
import { FlipWords } from "../ui/flip-words"

const Hero = () => {
    const words = ["Chatting", "Coding", "Artistic", "Cinematic", "Musical"]

    return (
        <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 text-center">
            <div className="flex justify-center items-center my-8">
                <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[70vw] flex flex-col items-center justify-center">
                    <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80 cursor-pointer inline-flex justify-center items-center">
                        All-in-one AI Features at your Fingertips
                        <Rocket className="ml-1" />
                    </p>

                    <h1 className="text-center text-[40px] md:text-5xl lg:text-7xl font-bold bg-clip-text mt-4 mb-8 text-transparent bg-gradient-to-b from-neutral-100 to-neutral-300">
                        Unleash the <FlipWords words={words} className="text-purple-500 text-center" /> Power of AI
                    </h1>

                    <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl text-zinc-400">Meet your new digital best buddy that never sleeps, never eats, and does not require coffee breaks</p>
                </div>
            </div>
        </BackgroundLines>
    )
}

export default Hero