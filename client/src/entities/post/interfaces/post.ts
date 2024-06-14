


export interface IPost {
    id: number
    title: string
    text: string
    image: string
    user: {
        id: number
        login: string
    }
}