import { IContact } from "@/entities/contact"




export interface IUser {
    id: number
    login: string
    email: string
    avatar: string
    contacts: IContact[]
}