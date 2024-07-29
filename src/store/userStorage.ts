import { create } from 'zustand';
import { User } from '@/interface/UserInterface';

interface UserState {
    users: User[];
    page: number;
    rows: number;
    searchFilter: string;
    totalRecords: number;
    selectedUser: User | null;
    stateFilter: string;
    // addUser: (user: User) => void;
    setUsers: (users: User[]) => void;
    setDeleteUsers: (users: User[]) => void;
    setPage: (page: number) => void;
    setRows: (rows: number) => void;
    setSearchFilter: (searchFilter: string) => void;
    setSelectedUser: (selectedUser: User) => void;
    setTotalRecords: (totalRecords: number) => void;
    removeUser: (userId: string) => void;
    setStateFilter: (stateFilter: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
    users: [],
    selectedUser: null,
    page: 1,
    rows: 5,
    searchFilter: '',
    totalRecords: 0,
    stateFilter: 'select' ,
    // addUser: (user) => set((state) => ({ users: [...state.users, user] })),
    setDeleteUsers: (users: User[]) => set({ users }),
    setStateFilter: (stateFilter: string) => set({stateFilter}),
    //-----SETEO DE ROWS PAGES AND USERS DESDE STATES------------
    setPage: (page: number) => set({ page }),
    setRows: (rows: number) => set({ rows }),
    setUsers: (users: User[]) => set({ users }),
    setSearchFilter: (searchFilter: string) => set({ searchFilter }),
    //---USUARIO SELECCIONADO EN LA TABLA--------
    setSelectedUser: (selectedUser: User) => set({ selectedUser }),
    //---CANTIDAD DE REGISTROS EN EL GET--------
    setTotalRecords: (totalRecords: number) => set({ totalRecords }),
    //---ACTUALIZAR EL STATE CUANDO ELIMINA UN REGISTRO--------
    removeUser: (userId) => set((state) => ({
        users: state.users.filter((user) => user.id !== userId)
    }))
}));



