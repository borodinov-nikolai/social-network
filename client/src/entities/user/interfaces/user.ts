import { IContact } from "@/entities/contact"




export interface IUser {
    id: string
    login: string
    email: string
    avatar: string
    contacts: IContact[]
}