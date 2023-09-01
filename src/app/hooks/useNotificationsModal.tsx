import { create } from 'zustand';

interface NotificationsModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;

}

export const useNotificationsModal = create<NotificationsModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useNotificationsModal;