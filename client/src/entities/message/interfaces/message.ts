import { IUser } from "@/entities/user"



export interface IMessage {
    id: number
    content: string
    senderId: number
    receiverId: number
    timestamp: Date
    receiver: IUser
}