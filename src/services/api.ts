'use server'
import axios, {AxiosResponse} from "axios";
import { User } from "../interface/UserInterface";

const API_URL =  "https://staging.duxsoftware.com.ar/api/personal"

export const createUser = async (user: User) => {
    try {
        const res=  await axios.post(API_URL, { ...user });
        return res.data
    } catch (error) {
        console.error(error);
        throw new Error('error al crear un registro')
    }
};

export const getUsers = async() => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}`)
        const data = res.data
        return data
        
    } catch (error) {
        console.error(error);
        throw new Error('error al traer registros')
    }
}

export const updateUser = async(user: User) => {
    try {
        const res = await axios.patch(`${API_URL}/${user.id}`, user);
        return res.data;
    } catch (error) {
        console.error('Error al actualizar un registro')
    }
};

export const deleteUser = async (userID: string) => {
    try {
        const res = await axios.delete<User[]>(`${API_URL}/${userID}`);
        return res.data
    } catch (error) {
        console.error('Error al eliminar un registro')
        
    }
};