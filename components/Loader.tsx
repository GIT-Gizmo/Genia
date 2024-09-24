import Image from "next/image"

export const LogoSpinner = () => {
    return (
        <div className="h-full flex flex-col gap-y-4 items-center justify-center">
            <div className="w-10 h-10 relative animate-spin">
                <Image
                    src="/assets/logo.png"
                    fill
                    alt="Logo"
                />
            </div>
            <p className="text-sm text-zinc-300">
                Genia is thinking...
            </p>
        </div>
    )
}

export const NavigationSpinner = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-white">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-t-4 border-t-blue-400 rounded-full animate-spin"></div>
        </div>
    );
};