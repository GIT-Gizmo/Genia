import { create } from "zustand"

interface usePremiumModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const usePremiumModal = create<usePremiumModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))