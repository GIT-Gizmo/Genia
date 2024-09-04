import Image from "next/image"

const Loader = () => {
    return (
        <div className="h-full flex flex-col gap-y-4 items-center justify-center">
            <div className="w-10 h-10 relative animate-spin">
                <Image
                    src="/assets/logo.png"
                    fill
                    alt="Logo"
                />
            </div>
            <p className="text-sm text-muted-">
                Genia is thinking...
            </p>
        </div>
    )
}

export default Loader