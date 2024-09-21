import { create } from "zustand"

interface usePremiumModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const usePremiumModalStore = create<usePremiumModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))