import { create } from 'zustand';
import { User } from '@/interface/UserInterface';

interface ModalState {
    visible: boolean;
    isEditing: boolean;
    selectedUser: User | null;
    setVisible: (visible: boolean) => void;
    setIsEditing: (isEditing: boolean) => void;
    setSelectedUser: (selectedUser: User) => void;
}

export const useModalStore = create<ModalState>((set) => ({
    visible: false,
    selectedUser: null,
    isEditing: false,
    setVisible: (visible: boolean) => set({ visible }),
    setIsEditing: (isEditing: boolean) => set({ isEditing}),
    setSelectedUser: (selectedUser: User) => set({ selectedUser }),
}));
